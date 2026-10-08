import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "./_components/AppSidebar"

function DashboardLayout({ children }) {
    return (
        <SidebarProvider>
            <AppSidebar />
            <main className="min-h-screen w-full bg-gray-100 p-5">
                <SidebarTrigger />
                {children}
            </main>
        </SidebarProvider>
    )
}

export default DashboardLayout
