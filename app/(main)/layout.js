import React from 'react'
import { DashboardProvider } from '@/app/provider.jsx'

function DashboardLayout({ children }) {
    return (
        <div>
            <DashboardProvider>
                {children}
            </DashboardProvider>
        </div>
    )
}
export default DashboardLayout