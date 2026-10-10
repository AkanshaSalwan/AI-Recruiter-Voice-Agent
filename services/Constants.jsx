import { LayoutDashboard, Calendar, List, WalletCards, Settings } from "lucide-react"
import { Code2Icon, User2Icon, BriefcaseBusinessIcon, PuzzleIcon } from "lucide-react"

export const SideBarOptions = [
   {
     name:'Dashboard',
    icon: LayoutDashboard,
    path: '/dashboard'
   },
   {
    name:'Scheduled Interviews',
   icon: Calendar,
   path: '/scheduled-interviews'
  },
  {
    name:'All Interviews',
   icon: List,
   path: '/all-interviews'
  },
  {
    name:'Billing',
   icon: WalletCards,
   path: '/billing'
  },
  {
    name:'Settings',
   icon: Settings,
   path: '/settings'
  }
]

export const InterviewType = [
  {
    title:'Technical',
    icon: Code2Icon
  },
  {
    title:'Behavioral',
    icon: User2Icon
  },
  {
    title:'Experienced',
    icon: BriefcaseBusinessIcon
  },
  {
    title:'Problem Solving',
    icon: PuzzleIcon
  },
  {
    title:'Leadership',
    icon: User2Icon
  }
]
