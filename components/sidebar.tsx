"use client"

import type React from "react"

import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { KairosLogo } from "@/components/kairos-logo"
import { useAuth } from "@/components/auth/auth-provider"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  Home,
  Code2,
  Trophy,
  MessageSquare,
  LineChart,
  Users,
  User,
  Settings,
  LogOut,
  X,
  ChevronDown,
  FileCode,
} from "lucide-react"

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
  { href: "/versions", icon: FileCode, label: "Versions" },
]

const analyticsNavItems: NavItem[] = [
  { href: "/statistics", icon: LineChart, label: "Statistics" },
  { href: "/participants", icon: Users, label: "Participants" },
]

export function Sidebar({
  open,
  setOpen,
  isMobile,
  pathname,
}: {
  open: boolean
  setOpen: (open: boolean) => void
  isMobile: boolean
  pathname: string
}) {
  const { user, signOut } = useAuth()

  return (
    <AnimatePresence mode="wait">
      {open && (
        <>
          {/* Mobile overlay */}
          {isMobile && <div className="fixed inset-0 z-20 bg-black/50 md:hidden" onClick={() => setOpen(false)} />}

          <motion.aside
            initial={{ x: -300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -300, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className={`fixed inset-y-0 left-0 z-30 flex w-64 flex-col border-r border-border/50 bg-card/50 backdrop-blur-md ${
              isMobile ? "md:relative" : "relative"
            }`}
          >
            {/* Sidebar Header */}
            <div className="flex h-16 items-center justify-between px-4">
              <Link href="/dashboard" className="flex items-center gap-2">
                <KairosLogo size="sm" />
                <span className="font-bold text-lg neon-text">Kairos</span>
              </Link>
              {isMobile && (
                <Button variant="ghost" size="icon" onClick={() => setOpen(false)} className="md:hidden">
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
                      <ChevronDown className="h-4 w-4 ml-2" />
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
        </>
      )}
    </AnimatePresence>
  )
}

function NavItem({ item, isActive }: { item: NavItem; isActive: boolean }) {
  return (
    <li>
      <Link
        href={item.href}
        className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors relative ${
          isActive ? "bg-primary/10 text-primary" : "text-foreground hover:bg-muted/50"
        }`}
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

