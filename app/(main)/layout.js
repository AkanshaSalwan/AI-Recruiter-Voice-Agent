import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "./_components/AppSidebar"
import WelcomeContainer from "./dashboard/_components/WelcomeContainer"
import { Toaster } from "@/components/ui/toast"

function DashboardLayout({ children }) {
    return (
        <SidebarProvider>
            <AppSidebar />
            <main className="min-h-screen w-full bg-gray-100 p-5">
                <SidebarTrigger />
                <WelcomeContainer />
                {children}
                <Toaster />
            </main>
        </SidebarProvider>
    )
}

export default DashboardLayout
