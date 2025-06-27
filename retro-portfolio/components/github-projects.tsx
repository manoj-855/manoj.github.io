"use client"

import { useEffect, useState, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Github, Star, GitFork, Clock, Code, RefreshCcw, ArrowUpDown, Search, ExternalLink, Calendar, Activity, TrendingUp } from "lucide-react"

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

interface ContributionDay {
  date: string
  count: number
  level: number
}

interface GitHubStats {
  totalCommits: number
  totalRepos: number
  totalStars: number
  totalForks: number
  currentStreak: number
  longestStreak: number
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
  const [contributions, setContributions] = useState<ContributionDay[]>([])
  const [stats, setStats] = useState<GitHubStats | null>(null)
  const [contributionsLoading, setContributionsLoading] = useState(true)

  // Generate mock contribution data (in a real app, you'd fetch this from GitHub API)
  const generateContributionData = useCallback(() => {
    const data: ContributionDay[] = []
    const today = new Date()
    const startDate = new Date(today.getTime() - (365 * 24 * 60 * 60 * 1000)) // 1 year ago
    
    for (let d = new Date(startDate); d <= today; d.setDate(d.getDate() + 1)) {
      const count = Math.floor(Math.random() * 8) // 0-7 commits
      const level = count === 0 ? 0 : count <= 2 ? 1 : count <= 4 ? 2 : count <= 6 ? 3 : 4
      data.push({
        date: new Date(d).toISOString().split('T')[0],
        count,
        level
      })
    }
    return data
  }, [])

  const fetchRepos = useCallback(async () => {
    setIsRefreshing(true)
    try {
      const response = await fetch("https://api.github.com/users/ydv-manoj/repos?per_page=100")
      if (!response.ok) {
        throw new Error("Failed to fetch repositories")
      }
      const data = await response.json()
      setRepos(data)
      
      // Calculate stats from repos
      const totalStars = data.reduce((sum: number, repo: Repository) => sum + repo.stargazers_count, 0)
      const totalForks = data.reduce((sum: number, repo: Repository) => sum + repo.forks_count, 0)
      
      setStats({
        totalCommits: Math.floor(Math.random() * 1000) + 500, // Mock data
        totalRepos: data.length,
        totalStars,
        totalForks,
        currentStreak: Math.floor(Math.random() * 30) + 1,
        longestStreak: Math.floor(Math.random() * 100) + 50
      })
      
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
    // Generate contribution data
    const contributionData = generateContributionData()
    setContributions(contributionData)
    setContributionsLoading(false)
  }, [fetchRepos, generateContributionData])

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

  const getContributionColor = (level: number) => {
    const colors = [
      "bg-black border border-muted", // 0 contributions
      "bg-primary/20 border border-primary/30", // 1-2 contributions
      "bg-primary/40 border border-primary/50", // 3-4 contributions
      "bg-primary/70 border border-primary/80", // 5-6 contributions
      "bg-primary border border-primary"  // 7+ contributions
    ]
    return colors[level] || colors[0]
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

  // Group contributions by weeks
  const getContributionWeeks = () => {
    const weeks = []
    for (let i = 0; i < contributions.length; i += 7) {
      weeks.push(contributions.slice(i, i + 7))
    }
    return weeks
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

        {/* GitHub Stats */}
        {stats && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8"
          >
            <div className="bg-card p-4 retro-border hover:border-accent transition-colors">
              <div className="flex items-center gap-2 mb-2">
                <Activity size={16} className="text-primary" />
                <span className="text-sm font-vt323">COMMITS</span>
              </div>
              <div className="text-xl font-pressStart text-primary">{stats.totalCommits.toLocaleString()}</div>
            </div>
            
            <div className="bg-card p-4 retro-border hover:border-accent transition-colors">
              <div className="flex items-center gap-2 mb-2">
                <Github size={16} className="text-primary" />
                <span className="text-sm font-vt323">REPOS</span>
              </div>
              <div className="text-xl font-pressStart text-primary">{stats.totalRepos}</div>
            </div>
            
            <div className="bg-card p-4 retro-border hover:border-accent transition-colors">
              <div className="flex items-center gap-2 mb-2">
                <Star size={16} className="text-yellow-400" />
                <span className="text-sm font-vt323">STARS</span>
              </div>
              <div className="text-xl font-pressStart text-primary">{stats.totalStars}</div>
            </div>
            
            <div className="bg-card p-4 retro-border hover:border-accent transition-colors">
              <div className="flex items-center gap-2 mb-2">
                <GitFork size={16} className="text-secondary" />
                <span className="text-sm font-vt323">FORKS</span>
              </div>
              <div className="text-xl font-pressStart text-primary">{stats.totalForks}</div>
            </div>
            
            <div className="bg-card p-4 retro-border hover:border-accent transition-colors">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp size={16} className="text-accent" />
                <span className="text-sm font-vt323">STREAK</span>
              </div>
              <div className="text-xl font-pressStart text-primary">{stats.currentStreak}D</div>
            </div>
            
            <div className="bg-card p-4 retro-border hover:border-accent transition-colors">
              <div className="flex items-center gap-2 mb-2">
                <Calendar size={16} className="text-muted-foreground" />
                <span className="text-sm font-vt323">BEST</span>
              </div>
              <div className="text-xl font-pressStart text-primary">{stats.longestStreak}D</div>
            </div>
          </motion.div>
        )}

        {/* Contribution Graph */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
          className="mb-12 bg-card p-6 retro-border"
        >
          <div className="flex items-center gap-2 mb-6">
            <Calendar size={20} className="text-primary" />
            <h3 className="text-xl font-pressStart text-primary crt-glow">CONTRIBUTION GRAPH</h3>
          </div>
          
          {contributionsLoading ? (
            <div className="text-center py-8">
              <div className="text-lg font-pressStart mb-4 crt-flicker text-primary">LOADING GRAPH...</div>
              <div className="w-48 h-2 bg-muted overflow-hidden mx-auto">
                <motion.div
                  className="h-full bg-primary"
                  animate={{ x: ["-100%", "100%"] }}
                  transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5, ease: "linear" }}
                />
              </div>
            </div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <div className="inline-flex flex-col gap-1 min-w-fit font-vt323">
                  {/* Month labels */}
                  <div className="flex mb-2">
                    <div className="w-12"></div>
                    {Array.from({length: 12}, (_, i) => (
                      <div key={i} className="text-xs text-muted-foreground w-16 text-center">
                        {new Date(2024, i).toLocaleDateString('en', {month: 'short'})}
                      </div>
                    ))}
                  </div>
                  
                  {/* Contribution grid */}
                  <div className="flex gap-1">
                    {/* Day labels */}
                    <div className="flex flex-col gap-1 w-12">
                      {['', 'MON', '', 'WED', '', 'FRI', ''].map((label, index) => (
                        <div key={index} className="h-3 text-xs text-muted-foreground text-right pr-2 leading-3 font-vt323">
                          {label}
                        </div>
                      ))}
                    </div>
                    
                    {/* Contribution squares */}
                    <div className="flex gap-1">
                      {getContributionWeeks().map((week, weekIndex) => (
                        <div key={weekIndex} className="flex flex-col gap-1">
                          {week.map((day, dayIndex) => (
                            <div
                              key={`${weekIndex}-${dayIndex}`}
                              className={`w-3 h-3 ${getContributionColor(day.level)} cursor-pointer transition-all hover:scale-110`}
                              title={`${day.count} contributions on ${day.date}`}
                            />
                          ))}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Legend */}
              <div className="flex items-center gap-2 mt-6 text-sm font-vt323 text-muted-foreground">
                <span>LESS</span>
                <div className="flex gap-1">
                  {[0, 1, 2, 3, 4].map(level => (
                    <div key={level} className={`w-3 h-3 ${getContributionColor(level)}`} />
                  ))}
                </div>
                <span>MORE</span>
              </div>
            </>
          )}
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
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
                  {displayedRepos.slice(0, visibleCount).map((repo, index) => (
                    <motion.div
                      key={repo.id}
                      initial={{ opacity: 0, y: 50 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="bg-card p-4 md:p-6 retro-border relative group hover:border-accent transition-colors hover:translate-y-1 w-full"
                    >
                      <div className="absolute top-0 right-0 w-0 h-0 border-t-[40px] border-r-[40px] border-t-transparent border-r-primary transform translate-x-px -translate-y-px"></div>
                      
                      <h3 className="text-lg md:text-xl font-pressStart mb-2 truncate pr-8">{repo.name}</h3>
                      <p className="font-vt323 text-muted-foreground mb-4 h-12 overflow-hidden text-sm md:text-base">
                        {repo.description || "No description provided"}
                      </p>

                      {/* Topics/Tags */}
                      {repo.topics && repo.topics.length > 0 && (
                        <div className="flex flex-wrap gap-1 mb-4">
                          {repo.topics.slice(0, 3).map(topic => (
                            <span
                              key={topic}
                              className="inline-block bg-secondary/20 px-2 py-0.5 text-xs font-vt323 cursor-pointer hover:bg-secondary/30 transition-colors"
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

                      <div className="flex flex-wrap gap-2 md:gap-4 mb-4 text-xs md:text-sm">
                        {repo.language && (
                          <div className="flex items-center gap-1">
                            <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-primary"></div>
                            <span>{repo.language}</span>
                          </div>
                        )}
                        <div className="flex items-center gap-1">
                          <Star size={12} className="text-yellow-400" />
                          <span>{repo.stargazers_count}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <GitFork size={12} />
                          <span>{repo.forks_count}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock size={12} />
                          <span className="whitespace-nowrap">Updated {formatDate(repo.updated_at)}</span>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        <a
                          href={repo.html_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="py-1 md:py-2 px-3 md:px-4 bg-primary text-black font-pressStart text-xs md:text-sm retro-shadow hover:translate-y-1 hover:shadow-none transition-all inline-flex items-center gap-1 md:gap-2"
                        >
                          <Github size={14} />
                          REPO
                        </a>
                        
                        {repo.homepage && (
                          <a
                            href={repo.homepage}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="py-1 md:py-2 px-3 md:px-4 bg-secondary text-white font-pressStart text-xs md:text-sm retro-shadow hover:translate-y-1 hover:shadow-none transition-all inline-flex items-center gap-1 md:gap-2"
                          >
                            <ExternalLink size={14} />
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