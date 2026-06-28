import {Analytics} from '@/pages/analytics'
import {Users} from '@/pages/users'
import {Permissions} from '@/pages/permissions'
import {Groups} from '@/pages/groups'
import { LayoutDashboardIcon, UserRoundKey, ListIcon, ChartBarIcon, FolderIcon, Group, UsersIcon, CameraIcon, FileTextIcon, Settings2Icon, CircleHelpIcon, SearchIcon, DatabaseIcon, FileChartColumnIcon, FileIcon, CommandIcon } from "lucide-react"

export const navData = {
    user: {
      name: "denen",
      email: "m@example.com",
      avatar: "/avatars/shadcn.jpg",
    },
    navMain: [
      {
        id: 1,
        title: "Dashboard",
        page: Analytics,
        icon: (
          <LayoutDashboardIcon />
        ),
        active: true
      },
      {
        id: 2,
        title: "Users",
        page: Users,
        icon: (
          <UsersIcon />
        ),
        active: false
      },
      {
        id: 3,
        title: "Groups",
        page: Groups,
        icon: (
          <Group />
        ),
        active: false
      },
      {
        id: 4,
        title: "Permissions",
        page: Permissions,
        icon: (
          <UserRoundKey />
        ),
        active: false
      },
    ],
  
    navClouds: [
      {
        title: "Capture",
        icon: (
          <CameraIcon />
        ),
        isActive: true,
        url: "#",
        items: [
          {
            title: "Active Proposals",
            url: "#",
          },
          {
            title: "Archived",
            url: "#",
          },
        ],
      },
      {
        title: "Proposal",
        icon: (
          <FileTextIcon />
        ),
        url: "#",
        items: [
          {
            title: "Active Proposals",
            url: "#",
          },
          {
            title: "Archived",
            url: "#",
          },
        ],
      },
      {
        title: "Prompts",
        icon: (
          <FileTextIcon />
        ),
        url: "#",
        items: [
          {
            title: "Active Proposals",
            url: "#",
          },
          {
            title: "Archived",
            url: "#",
          },
        ],
      },
    ],
    navSecondary: [
      {
        title: "Settings",
        url: "#",
        icon: (
          <Settings2Icon />
        ),
      },
      {
        title: "Get Help",
        url: "#",
        icon: (
          <CircleHelpIcon />
        ),
      },
      {
        title: "Search",
        url: "#",
        icon: (
          <SearchIcon />
        ),
      },
    ],
  
  }
  