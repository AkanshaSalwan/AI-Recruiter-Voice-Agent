import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "./_components/AppSidebar"
import WelcomeContainer from "./dashboard/_components/WelcomeContainer"

function DashboardLayout({ children }) {
    return (
        <SidebarProvider>
            <AppSidebar />
            <main className="min-h-screen w-full bg-gray-100 p-5">
                <SidebarTrigger />
                <WelcomeContainer />
                {children}
            </main>
        </SidebarProvider>
    )
}

export default DashboardLayout
