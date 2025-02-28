"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

export default function ThreeScene() {
  const mountRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>();
  const mixerRef = useRef<THREE.AnimationMixer>();
  const actionsRef = useRef<{ [key: string]: THREE.AnimationAction }>({});
  const activeActionRef = useRef<THREE.AnimationAction>();
  const clockRef = useRef(new THREE.Clock());
  const currentAnimationIndex = useRef<number>(0);
  const intervalRef = useRef<NodeJS.Timeout | number>(0);

  useEffect(() => {
    if (!mountRef.current) return;

    // Remove any existing children (avoid duplicate canvas elements)
    while (mountRef.current.firstChild) {
      mountRef.current.removeChild(mountRef.current.firstChild);
    }

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, 1, 0.25, 100);
    camera.position.set(-2, 1, 5);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true, // Enable transparency
      powerPreference: "low-power",
    });
    renderer.setPixelRatio(2);
    renderer.setSize(400, 400);
    renderer.setClearColor(0x000000, 0); // Transparent background
    mountRef.current.appendChild(renderer.domElement);

    // Lighting
    const light = new THREE.AmbientLight(0xffffff, 2);
    scene.add(light);

    // Load model
    const loader = new GLTFLoader();
    loader.load(
      "/models/RobotExpressive.glb",
      (gltf) => {
        const model = gltf.scene;
        model.scale.set(0.3, 0.3, 0.3);
        scene.add(model);

        const mixer = new THREE.AnimationMixer(model);
        mixerRef.current = mixer;

        gltf.animations.forEach((clip) => {
          actionsRef.current[clip.name] = mixer.clipAction(clip);
        });

        // Default animation
        playAction("Dance");

        // Cycle through animations every 3 seconds
        intervalRef.current = setInterval(() => {
          if (document.hidden) return;
          const emotes = ["Jump", "Yes", "No", "Wave", "Punch", "ThumbsUp"];
          const emote = emotes[currentAnimationIndex.current];
          if (actionsRef.current[emote]) {
            playAction(emote);
          }
          currentAnimationIndex.current = (currentAnimationIndex.current + 1) % emotes.length;
        }, 3000);

        animate();
      },
      undefined,
      (error) => console.error("Error loading model:", error)
    );

    function playAction(name: string) {
      if (!mixerRef.current || !actionsRef.current[name]) return;
      const newAction = actionsRef.current[name];
      if (activeActionRef.current && activeActionRef.current !== newAction) {
        newAction.reset();
        newAction.crossFadeFrom(activeActionRef.current, 0.3, true);
        newAction.play();
      } else {
        newAction.reset().play();
      }
      activeActionRef.current = newAction;
    }

    function animate() {
      animationRef.current = requestAnimationFrame(animate);
      mixerRef.current?.update(clockRef.current.getDelta());
      renderer.render(scene, camera);
    }

    function handleVisibilityChange() {
      if (!document.hidden) {
        playAction("Dance"); // Reset animation when page is visible again
      }
    }

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      if (intervalRef.current) clearInterval(intervalRef.current as number);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      renderer.dispose();
      mixerRef.current?.stopAllAction();
      if (mountRef.current && renderer.domElement.parentElement === mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={mountRef} className="absolute inset-0 w-full h-full" />;
}
