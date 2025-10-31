import {
  BookOpen,
  DollarSign,
  FileText,
  Heart,
  MessageSquare,
  Music,
  PieChart,
  Send,
  Users,
  CheckSquare,
  BarChart3,
  HelpCircle,
  type LucideIcon,
  ScreenShare,
  Mail,
  PenSquare,
} from "lucide-react"

export interface FellowshipApp {
  id: string
  name: string
  description: string
  href: string
  icon: LucideIcon
  category: "ministry" | "management" | "communication" | "analytics"
  color: string
}

export const getFellowshipApps = (fellowshipId: string): FellowshipApp[] => [
  {
    id: "bible",
    name: "Bible",
    description: "Read and study the Bible together",
    href: `/${fellowshipId}/bible`,
    icon: BookOpen,
    category: "ministry",
    color: "bg-blue-500",
  },
  {
    id: "bible-study",
    name: "Bible Study",
    description: "Group Bible study sessions and resources",
    href: `/${fellowshipId}/bible-study`,
    icon: BookOpen,
    category: "ministry",
    color: "bg-indigo-500",
  },
  {
    id: "prayer",
    name: "Prayer",
    description: "Submit and manage prayer requests",
    href: `/${fellowshipId}/Prayer-system`,
    icon: Heart,
    category: "ministry",
    color: "bg-rose-500",
  },
  {
    id: "shared-music",
    name: "Worship Music",
    description: "Songs, playlists, and service planning",
    href: `/${fellowshipId}/shared_music`,
    icon: Music,
    category: "ministry",
    color: "bg-purple-500",
  },
  {
    id: "evangelism",
    name: "Evangelism",
    description: "Outreach and evangelism tracking",
    href: `/${fellowshipId}/evangelism`,
    icon: Send,
    category: "ministry",
    color: "bg-green-500",
  },
  {
    id: "forms",
    name: "Forms",
    description: "Create and manage forms and surveys",
    href: `/${fellowshipId}/forms`,
    icon: FileText,
    category: "management",
    color: "bg-orange-500",
  },
  {
    id: "task-manager",
    name: "Task Manager",
    description: "Organize tasks and assignments",
    href: `/${fellowshipId}/task-manager`,
    icon: CheckSquare,
    category: "management",
    color: "bg-cyan-500",
  },
  {
    id: "leadership",
    name: "Leadership",
    description: "Leadership resources and tools",
    href: `/${fellowshipId}/leadership`,
    icon: Users,
    category: "management",
    color: "bg-amber-500",
  },
  {
    id: "finance",
    name: "Finance",
    description: "Manage church finances and giving",
    href: `/${fellowshipId}/church-finance`,
    icon: DollarSign,
    category: "management",
    color: "bg-emerald-500",
  },
  {
    id: "polling",
    name: "Polling",
    description: "Create polls and gather feedback",
    href: `/${fellowshipId}/polling`,
    icon: PieChart,
    category: "communication",
    color: "bg-pink-500",
  },
  {
    id: "qa",
    name: "Q&A",
    description: "Questions and answers community",
    href: `/${fellowshipId}/qa`,
    icon: HelpCircle,
    category: "communication",
    color: "bg-violet-500",
  },
  {
    id: "feedback",
    name: "Feedback",
    description: "Collect and manage feedback",
    href: `/${fellowshipId}/Feedback`,
    icon: MessageSquare,
    category: "communication",
    color: "bg-teal-500",
  },
  {
    id: "analytics",
    name: "Analytics",
    description: "Sunday service analytics and reports",
    href: `/${fellowshipId}/sunday-analytics`,
    icon: BarChart3,
    category: "analytics",
    color: "bg-sky-500",
  },

  {
   id: "streaming-proxies",
   name: "Streaming Proxies",
   description: "Manage streaming proxies for services",  
   href: `/${fellowshipId}/streaming-proxies`,
   icon: ScreenShare,
   category: "communication",
   color: "bg-blue-200",
  },

  {
    id: "email",
    name: "Email",
    description: "Send and manage email communications",
    href: `/${fellowshipId}/email`,
    icon: Mail,
    category: "communication",
    color: "bg-blue-600",
  },
  {
    id: "blog",
    name: "Blog",
    description: "Share updates, articles, and insights",
    href: `/${fellowshipId}/fellowship-blog`,
    icon: PenSquare,
    category: "communication",
    color: "bg-slate-600",
  },

]

export const CATEGORY_LABELS = {
  ministry: "Ministry",
  management: "Management",
  communication: "Communication",
  analytics: "Analytics",
} as const
