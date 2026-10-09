import React from 'react'
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import WelcomeContainer from './dashboard/_components/WelcomeContainer'

function DashboardProvider({ children }) {
    return (
        <SidebarProvider>
            {/* <SidebarTrigger /> */}
             <div>{children}</div>

             <WelcomeContainer />
        </SidebarProvider>
    )
}

export default DashboardProvider
