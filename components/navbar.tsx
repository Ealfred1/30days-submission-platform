"use client"

import { useState } from "react"
import { useAuth } from "@/components/auth/auth-provider"
import { ModeToggle } from "@/components/mode-toggle"
import { KairosLogo } from "@/components/kairos-logo"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Bell, Menu, Search, User, Settings, LogOut } from "lucide-react"
import Link from "next/link"

export function Navbar({
  sidebarOpen,
  setSidebarOpen,
}: {
  sidebarOpen: boolean
  setSidebarOpen: (open: boolean) => void
}) {
  const { user, userInfo, signOut } = useAuth()
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-border/50 bg-card/50 backdrop-blur-md px-4">
      <div className="flex items-center gap-4">
        {/* Sidebar Toggle Button */}
        <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(!sidebarOpen)} className="h-9 w-9">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle sidebar</span>
        </Button>

        {/* Logo (visible when sidebar is closed) */}
        {!sidebarOpen && (
          <Link href="/dashboard" className="flex items-center gap-2">
            <KairosLogo size="sm" />
            <span className="font-bold text-lg neon-text">Kairos</span>
          </Link>
        )}

        {/* Search Bar */}
        <div className="hidden md:flex relative max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search..."
            className="pl-10 w-[200px] lg:w-[300px] bg-background/50"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Right side of navbar */}
      <div className="flex items-center gap-3">
        {/* Notifications */}
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground">
            3
          </span>
        </Button>

        {/* Theme Toggle */}
        <ModeToggle />

        {/* User Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="rounded-full h-9 w-9">
              <Avatar className="h-8 w-8 border border-primary/20">
                <AvatarImage src={userInfo?.avatar || "/placeholder.svg"} alt={userInfo?.name || "User"} />
                <AvatarFallback>{userInfo?.name?.charAt(0) || "U"}</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <div className="flex items-center gap-2 p-2">
              <Avatar className="h-8 w-8">
                <AvatarImage 
                  src={userInfo?.avatar || "/placeholder.svg"} 
                  alt={userInfo?.name || "User"} 
                />
                <AvatarFallback>
                  {userInfo?.name?.charAt(0) || "U"}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <span className="text-sm font-medium">
                  {userInfo?.name || "User"}
                </span>
                <span className="text-xs text-muted-foreground">
                  {userInfo?.email || "Loading..."}
                </span>
              </div>
            </div>
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
    </header>
  )
}

