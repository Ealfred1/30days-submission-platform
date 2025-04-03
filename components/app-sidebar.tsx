"use client"

import type React from "react"

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarRail,
} from "@/components/ui/sidebar"
import { KairosLogo } from "@/components/kairos-logo"
import { useAuth } from "@/components/auth/auth-provider"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { motion } from "framer-motion"
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
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export function AppSidebar() {
  const pathname = usePathname()
  const { user, signOut } = useAuth()

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center gap-2 px-4 py-3">
          <KairosLogo size="sm" />
          <span className="font-bold text-lg neon-text">Kairos</span>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <NavItem href="/dashboard" icon={Home} label="Dashboard" active={pathname === "/dashboard"} />
              <NavItem href="/submissions" icon={Code2} label="Submissions" active={pathname === "/submissions"} />
              <NavItem href="/leaderboard" icon={Trophy} label="Leaderboard" active={pathname === "/leaderboard"} />
              <NavItem href="/reviews" icon={MessageSquare} label="Reviews" active={pathname === "/reviews"} />
              <NavItem href="/versions" icon={Versions} label="Versions" active={pathname === "/versions"} />
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup className="mt-6">
          <SidebarGroupLabel>Analytics</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <NavItem href="/statistics" icon={LineChart} label="Statistics" active={pathname === "/statistics"} />
              <NavItem href="/participants" icon={Users} label="Participants" active={pathname === "/participants"} />
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4">
        <div className="flex items-center justify-between">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center gap-2 h-auto p-2 w-full justify-start">
                <Avatar className="h-8 w-8 border border-primary/20">
                  <AvatarImage src={user?.image || "/placeholder.svg?height=40&width=40"} alt={user?.name || "User"} />
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
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  )
}

function NavItem({
  href,
  icon: Icon,
  label,
  active = false,
}: {
  href: string
  icon: React.ElementType
  label: string
  active?: boolean
}) {
  const uniqueId = `sidebar-active-item-${href.replace(/\//g, "-")}`

  return (
    <SidebarMenuItem>
      <SidebarMenuButton asChild isActive={active}>
        <Link href={href} className="relative group flex items-center w-full">
          <div className="flex items-center gap-2 w-full">
            <Icon className="h-4 w-4" />
            <span>{label}</span>
          </div>

          {active && (
            <motion.div
              layoutId={uniqueId}
              className="absolute inset-0 bg-primary/10 rounded-md -z-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            />
          )}
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  )
}

