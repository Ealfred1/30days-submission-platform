"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import { KairosLogo } from "@/components/kairos-logo"
import { ModeToggle } from "@/components/mode-toggle"
import { useAuth } from "@/components/auth/auth-provider"
import {
  Home,
  Code2,
  Trophy,
  MessageSquare,
  ViewIcon as Versions,
  LineChart,
  Users,
  User,
  Settings,
  LogOut,
  Menu,
  X,
  Bell,
  Search,
} from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { motion, AnimatePresence } from "framer-motion"

type NavItem = {
  href: string
  icon: React.ElementType
  label: string
}

const mainNavItems: NavItem[] = [
  { href: "/dashboard", icon: Home, label: "Dashboard" },
  { href: "/submissions", icon: Code2, label: "Submissions" },
  { href: "/leaderboard", icon: Trophy, label: "Leaderboard" },
  { href: "/reviews", icon: MessageSquare, label: "Reviews" },
  { href: "/versions", icon: Versions, label: "Versions" },
]

const analyticsNavItems: NavItem[] = [
  { href: "/statistics", icon: LineChart, label: "Statistics" },
  { href: "/participants", icon: Users, label: "Participants" },
]

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const { user, signOut } = useAuth()
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  // Handle responsive behavior
  useEffect(() => {
    const checkIsMobile = () => {
      const mobile = window.innerWidth < 1024
      setIsMobile(mobile)
      if (mobile) {
        setIsSidebarOpen(false)
      } else {
        setIsSidebarOpen(true)
      }
    }

    // Initial check
    checkIsMobile()

    // Add event listener
    window.addEventListener("resize", checkIsMobile)

    // Cleanup
    return () => window.removeEventListener("resize", checkIsMobile)
  }, [])

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [pathname])

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Sidebar - Desktop */}
      <AnimatePresence mode="wait">
        {isSidebarOpen && (
          <motion.aside
            initial={{ x: -300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -300, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className={cn(
              "fixed inset-y-0 left-0 z-20 flex w-64 flex-col border-r border-border/50 bg-card/50 backdrop-blur-md",
              isMobile ? "lg:relative" : "relative",
            )}
          >
            {/* Sidebar Header */}
            <div className="flex h-16 items-center justify-between px-4">
              <Link href="/dashboard" className="flex items-center gap-2">
                <KairosLogo size="sm" />
                <span className="font-bold text-lg neon-text">Kairos</span>
              </Link>
              {isMobile && (
                <Button variant="ghost" size="icon" onClick={() => setIsSidebarOpen(false)} className="lg:hidden">
                  <X className="h-5 w-5" />
                </Button>
              )}
            </div>

            {/* Sidebar Content */}
            <div className="flex-1 overflow-y-auto py-4 px-3">
              <nav className="space-y-6">
                <div className="space-y-2">
                  <h3 className="px-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Navigation
                  </h3>
                  <ul className="space-y-1">
                    {mainNavItems.map((item) => (
                      <NavItem key={item.href} item={item} isActive={pathname === item.href} />
                    ))}
                  </ul>
                </div>

                <div className="space-y-2">
                  <h3 className="px-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Analytics
                  </h3>
                  <ul className="space-y-1">
                    {analyticsNavItems.map((item) => (
                      <NavItem key={item.href} item={item} isActive={pathname === item.href} />
                    ))}
                  </ul>
                </div>
              </nav>
            </div>

            {/* Sidebar Footer */}
            <div className="border-t border-border/50 p-4">
              <div className="flex items-center justify-between">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="flex items-center gap-2 h-auto p-2 w-full justify-start">
                      <Avatar className="h-8 w-8 border border-primary/20">
                        <AvatarImage
                          src={user?.image || "/placeholder.svg?height=40&width=40"}
                          alt={user?.name || "User"}
                        />
                        <AvatarFallback>{user?.name?.charAt(0) || "U"}</AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col items-start text-sm">
                        <span className="font-medium">{user?.name || "User"}</span>
                        <span className="text-xs text-muted-foreground capitalize">{user?.role || "Participant"}</span>
                      </div>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuItem asChild>
                      <Link href="/profile" className="flex items-center gap-2 cursor-pointer">
                        <User className="h-4 w-4" />
                        <span>Profile</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/settings" className="flex items-center gap-2 cursor-pointer">
                        <Settings className="h-4 w-4" />
                        <span>Settings</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="flex items-center gap-2 cursor-pointer text-destructive"
                      onClick={() => signOut()}
                    >
                      <LogOut className="h-4 w-4" />
                      <span>Logout</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-10 bg-black/50 lg:hidden" onClick={() => setIsMobileMenuOpen(false)} />
      )}

      {/* Main Content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Navbar */}
        <header className="flex h-16 items-center justify-between border-b border-border/50 bg-card/50 backdrop-blur-md px-4">
          <div className="flex items-center gap-4">
            {/* Mobile Menu Trigger */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => {
                if (isMobile) {
                  setIsSidebarOpen(true)
                } else {
                  setIsSidebarOpen(!isSidebarOpen)
                }
              }}
              className="lg:hidden"
            >
              <Menu className="h-5 w-5" />
            </Button>

            {/* Desktop Sidebar Toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="hidden lg:flex"
            >
              <Menu className="h-5 w-5" />
            </Button>

            {/* Logo for mobile (when sidebar is closed) */}
            {(!isSidebarOpen || isMobile) && (
              <Link href="/dashboard" className="flex items-center gap-2">
                <KairosLogo size="sm" />
                <span className="font-bold text-lg neon-text">Kairos</span>
              </Link>
            )}

            {/* Search Bar */}
            <div className="hidden md:block relative max-w-md">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="Search..." className="pl-10 w-[200px] lg:w-[300px] bg-background/50" />
            </div>
          </div>

          {/* Right side of navbar */}
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground">
                3
              </span>
            </Button>
            <ModeToggle />

            {/* User Menu (Mobile) */}
            <div className="lg:hidden">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <Avatar className="h-8 w-8 border border-primary/20">
                      <AvatarImage
                        src={user?.image || "/placeholder.svg?height=40&width=40"}
                        alt={user?.name || "User"}
                      />
                      <AvatarFallback>{user?.name?.charAt(0) || "U"}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuItem asChild>
                    <Link href="/profile" className="flex items-center gap-2 cursor-pointer">
                      <User className="h-4 w-4" />
                      <span>Profile</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/settings" className="flex items-center gap-2 cursor-pointer">
                      <Settings className="h-4 w-4" />
                      <span>Settings</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="flex items-center gap-2 cursor-pointer text-destructive"
                    onClick={() => signOut()}
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Logout</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>
    </div>
  )
}

function NavItem({ item, isActive }: { item: NavItem; isActive: boolean }) {
  return (
    <li>
      <Link
        href={item.href}
        className={cn(
          "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
          isActive ? "bg-primary/10 text-primary" : "text-foreground hover:bg-muted/50",
        )}
      >
        <item.icon className="h-5 w-5" />
        <span>{item.label}</span>
        {isActive && (
          <motion.div
            layoutId="sidebar-active-item"
            className="absolute inset-0 rounded-md bg-primary/10 -z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          />
        )}
      </Link>
    </li>
  )
}

