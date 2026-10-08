import { LayoutDashboard, Calendar, List, WalletCards, Settings } from "lucide-react"

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
