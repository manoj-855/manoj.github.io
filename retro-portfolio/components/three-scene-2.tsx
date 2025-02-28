"use client";

import { useEffect, useRef } from "react";
import * as THREE from "@/node_modules/@types/three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

const ThreeScene2 = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFShadowMap;

    // Append renderer to the DOM
    mountRef.current.appendChild(renderer.domElement);

    // Camera setup
    const camera = new THREE.OrthographicCamera(
      window.innerWidth / -2,
      window.innerWidth / 2,
      window.innerHeight / 2,
      window.innerHeight / -2,
      -50000,
      10000
    );
    camera.position.set(0, 0, 1000);
    camera.lookAt(0, 0, 0);

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color("#ffedd4");

    // GLTF Loader (Loads a .glb file)
    const loader = new GLTFLoader();
    loader.load(
      "/models/bmo_adventure_time_copy.glb", // Ensure the file is in the public/models directory
      (gltf) => {
        scene.add(gltf.scene);
      },
      undefined,
      (error) => console.error("Error loading GLB model:", error)
    );

    // Orbit Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.125;

    // Handle window resize
    const onWindowResize = () => {
      camera.left = window.innerWidth / -2;
      camera.right = window.innerWidth / 2;
      camera.top = window.innerHeight / 2;
      camera.bottom = window.innerHeight / -2;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("resize", onWindowResize);

    // Animation loop
    const animate = () => {
      controls.update();
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };
    animate();

    // Cleanup
    return () => {
      window.removeEventListener("resize", onWindowResize);
      mountRef.current?.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} className="w-full h-screen inset-0" />;
};

export default ThreeScene2;
