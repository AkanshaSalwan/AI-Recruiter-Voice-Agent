import React from 'react'
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'

function DashboardProvider({ children }) {
    return (
        <SidebarProvider>
             <SidebarTrigger />
             <div>{children}</div>
        </SidebarProvider>
    )
}

export default DashboardProvider
