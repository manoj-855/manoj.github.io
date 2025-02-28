"use client"

import { useEffect, useState, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Github, Star, GitFork, Clock, Code, RefreshCcw, ArrowUpDown, Search, ExternalLink } from "lucide-react"

interface Repository {
  id: number
  name: string
  description: string
  html_url: string
  stargazers_count: number
  forks_count: number
  updated_at: string
  language: string
  topics: string[]
  homepage: string | null
}

type SortKey = "updated" | "stars" | "forks" | "name"
type SortOrder = "asc" | "desc"

export default function GithubProjects() {
  const [repos, setRepos] = useState<Repository[]>([])
  const [displayedRepos, setDisplayedRepos] = useState<Repository[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null)
  const [sortKey, setSortKey] = useState<SortKey>("updated")
  const [sortOrder, setSortOrder] = useState<SortOrder>("desc")
  const [visibleCount, setVisibleCount] = useState(4)
  const [isRefreshing, setIsRefreshing] = useState(false)

  const fetchRepos = useCallback(async () => {
    setIsRefreshing(true)
    try {
      const response = await fetch("https://api.github.com/users/ydv-manoj/repos?per_page=100")
      if (!response.ok) {
        throw new Error("Failed to fetch repositories")
      }
      const data = await response.json()
      setRepos(data)
      setLoading(false)
      setIsRefreshing(false)
    } catch (err) {
      setError("Failed to load GitHub repositories")
      setLoading(false)
      setIsRefreshing(false)
    }
  }, [])

  useEffect(() => {
    fetchRepos()
  }, [fetchRepos])

  useEffect(() => {
    let filtered = [...repos]
    
    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(repo => 
        repo.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        (repo.description && repo.description.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (repo.topics && repo.topics.some(topic => topic.toLowerCase().includes(searchTerm.toLowerCase())))
      )
    }
    
    // Filter by language
    if (selectedLanguage) {
      filtered = filtered.filter(repo => repo.language === selectedLanguage)
    }
    
    // Sort repos
    filtered.sort((a, b) => {
      if (sortKey === "updated") {
        return sortOrder === "desc" 
          ? new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
          : new Date(a.updated_at).getTime() - new Date(b.updated_at).getTime()
      } else if (sortKey === "stars") {
        return sortOrder === "desc" 
          ? b.stargazers_count - a.stargazers_count
          : a.stargazers_count - b.stargazers_count
      } else if (sortKey === "forks") {
        return sortOrder === "desc" 
          ? b.forks_count - a.forks_count
          : a.forks_count - b.forks_count
      } else { // name
        return sortOrder === "desc" 
          ? b.name.localeCompare(a.name)
          : a.name.localeCompare(b.name)
      }
    })
    
    setDisplayedRepos(filtered)
  }, [repos, searchTerm, selectedLanguage, sortKey, sortOrder])

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })
  }

  const languages = [...new Set(repos.filter(repo => repo.language).map(repo => repo.language))]

  const toggleSortOrder = () => {
    setSortOrder(prev => prev === "asc" ? "desc" : "asc")
  }

  const handleSortChange = (key: SortKey) => {
    if (sortKey === key) {
      toggleSortOrder()
    } else {
      setSortKey(key)
      setSortOrder("desc")
    }
  }

  const loadMore = () => {
    setVisibleCount(prev => prev + 4)
  }

  return (
    <section id="github" className="py-20 bg-gradient-to-b from-black to-card">
      <div className="container px-4">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-pressStart mb-4 text-primary crt-glow">GITHUB PROJECTS</h2>
          <p className="text-xl font-vt323">Check out my latest code!</p>
          <div className="w-24 h-1 bg-primary mx-auto mt-4"></div>
        </motion.div>

        {loading ? (
          <div className="text-center py-12">
            <div className="text-2xl font-pressStart mb-4 crt-flicker">LOADING...</div>
            <div className="w-64 h-4 bg-muted overflow-hidden mx-auto">
              <motion.div
                className="h-full bg-primary"
                animate={{ x: ["-100%", "100%"] }}
                transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5, ease: "linear" }}
              />
            </div>
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <div className="text-xl font-pressStart mb-4 text-destructive">ERROR</div>
            <p className="font-vt323 text-lg">{error}</p>
            <div className="mt-6">
              <a
                href="https://github.com/ydv-manoj"
                target="_blank"
                rel="noopener noreferrer"
                className="py-2 px-4 bg-primary text-black font-pressStart text-sm retro-shadow hover:translate-y-1 hover:shadow-none transition-all inline-flex items-center gap-2"
              >
                <Github size={16} />
                VISIT GITHUB
              </a>
            </div>
          </div>
        ) : (
          <>
            {/* Controls Section */}
            <div className="mb-8 p-4 bg-card retro-border">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Search */}
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search size={16} className="text-muted-foreground" />
                  </div>
                  <input
                    type="text"
                    placeholder="Search repositories..."
                    className="bg-black border-2 border-primary p-2 pl-10 font-vt323 text-white w-full retro-border"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>

                {/* Language Filter */}
                <div className="relative">
                  <select
                    className="w-full bg-black border-2 border-secondary p-2 font-vt323 text-white appearance-none retro-border"
                    value={selectedLanguage || ""}
                    onChange={(e) => setSelectedLanguage(e.target.value || null)}
                  >
                    <option value="">All Languages</option>
                    {languages.map(lang => (
                      <option key={lang} value={lang}>{lang}</option>
                    ))}
                  </select>
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                    <Code size={16} className="text-secondary" />
                  </div>
                </div>

                {/* Sort Controls */}
                <div className="flex gap-2">
                  <button
                    onClick={() => handleSortChange("updated")}
                    className={`flex-1 py-2 px-3 font-vt323 text-sm retro-border flex items-center justify-center gap-1 ${
                      sortKey === "updated" ? "bg-primary text-black" : "bg-card text-white"
                    }`}
                  >
                    <Clock size={14} />
                    Date
                    {sortKey === "updated" && (
                      <ArrowUpDown size={14} className="transform rotate-0" />
                    )}
                  </button>
                  <button
                    onClick={() => handleSortChange("stars")}
                    className={`flex-1 py-2 px-3 font-vt323 text-sm retro-border flex items-center justify-center gap-1 ${
                      sortKey === "stars" ? "bg-primary text-black" : "bg-card text-white"
                    }`}
                  >
                    <Star size={14} />
                    Stars
                    {sortKey === "stars" && (
                      <ArrowUpDown size={14} />
                    )}
                  </button>
                  <button
                    onClick={fetchRepos}
                    className={`py-2 px-3 font-vt323 text-sm retro-border flex items-center justify-center gap-1 bg-secondary text-white ${
                      isRefreshing ? "animate-pulse" : ""
                    }`}
                    disabled={isRefreshing}
                  >
                    <RefreshCcw size={14} className={isRefreshing ? "animate-spin" : ""} />
                  </button>
                </div>
              </div>
            </div>

            {displayedRepos.length === 0 ? (
              <div className="text-center py-12 bg-card retro-border">
                <div className="text-xl font-pressStart mb-4">NO REPOSITORIES FOUND</div>
                <p className="font-vt323 text-lg">Try different search terms or filters</p>
                <button
                  onClick={() => {
                    setSearchTerm("")
                    setSelectedLanguage(null)
                  }}
                  className="mt-4 py-2 px-4 bg-primary text-black font-pressStart text-sm retro-shadow hover:translate-y-1 hover:shadow-none transition-all"
                >
                  RESET FILTERS
                </button>
              </div>
            ) : (
              <AnimatePresence>
                <div className="grid md:grid-cols-2 gap-8">
                  {displayedRepos.slice(0, visibleCount).map((repo, index) => (
                    <motion.div
                      key={repo.id}
                      initial={{ opacity: 0, y: 50 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="bg-card p-6 retro-border relative group hover:border-accent transition-colors hover:translate-y-1"
                    >
                      <div className="absolute top-0 right-0 w-0 h-0 border-t-[40px] border-r-[40px] border-t-transparent border-r-primary transform translate-x-px -translate-y-px"></div>
                      
                      <h3 className="text-xl font-pressStart mb-2 truncate pr-8">{repo.name}</h3>
                      <p className="font-vt323 text-muted-foreground mb-4 h-12 overflow-hidden">
                        {repo.description || "No description provided"}
                      </p>

                      {/* Topics/Tags */}
                      {repo.topics && repo.topics.length > 0 && (
                        <div className="flex flex-wrap gap-1 mb-4">
                          {repo.topics.slice(0, 3).map(topic => (
                            <span
                              key={topic}
                              className="inline-block bg-secondary/20 px-2 py-0.5 text-xs font-vt323"
                              onClick={() => setSearchTerm(topic)}
                            >
                              #{topic}
                            </span>
                          ))}
                          {repo.topics.length > 3 && (
                            <span className="inline-block bg-black/50 px-2 py-0.5 text-xs font-vt323">
                              +{repo.topics.length - 3}
                            </span>
                          )}
                        </div>
                      )}

                      <div className="flex flex-wrap gap-4 mb-4">
                        {repo.language && (
                          <div className="flex items-center gap-1 text-sm">
                            <div className="w-3 h-3 rounded-full bg-primary"></div>
                            <span>{repo.language}</span>
                          </div>
                        )}
                        <div className="flex items-center gap-1 text-sm">
                          <Star size={14} className="text-yellow-400" />
                          <span>{repo.stargazers_count}</span>
                        </div>
                        <div className="flex items-center gap-1 text-sm">
                          <GitFork size={14} />
                          <span>{repo.forks_count}</span>
                        </div>
                        <div className="flex items-center gap-1 text-sm">
                          <Clock size={14} />
                          <span>Updated {formatDate(repo.updated_at)}</span>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <a
                          href={repo.html_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="py-2 px-4 bg-primary text-black font-pressStart text-sm retro-shadow hover:translate-y-1 hover:shadow-none transition-all inline-flex items-center gap-2"
                        >
                          <Github size={16} />
                          REPO
                        </a>
                        
                        {repo.homepage && (
                          <a
                            href={repo.homepage}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="py-2 px-4 bg-secondary text-white font-pressStart text-sm retro-shadow hover:translate-y-1 hover:shadow-none transition-all inline-flex items-center gap-2"
                          >
                            <ExternalLink size={16} />
                            DEMO
                          </a>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </AnimatePresence>
            )}

            {displayedRepos.length > visibleCount && (
              <div className="text-center mt-8">
                <button
                  onClick={loadMore}
                  className="py-2 px-8 bg-primary text-black font-pressStart text-sm retro-border hover:bg-primary/90 transition-colors"
                >
                  LOAD MORE PROJECTS
                </button>
              </div>
            )}

            <div className="text-center mt-12">
              <a
                href="https://github.com/ydv-manoj"
                target="_blank"
                rel="noopener noreferrer"
                className="py-3 px-6 bg-secondary text-white font-pressStart text-sm retro-shadow hover:translate-y-1 hover:shadow-none transition-all inline-flex items-center gap-2"
              >
                <Github size={18} />
                VIEW ALL REPOSITORIES
              </a>
            </div>
          </>
        )}
      </div>
    </section>
  )
}