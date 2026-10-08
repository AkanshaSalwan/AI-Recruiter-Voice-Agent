'use client'
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { SideBarOptions } from "@/services/Constants"

export function AppSidebar() {

    const pathname = usePathname();

    return (
        <Sidebar>
            <SidebarHeader className="flex items-center">
                <Image
                    src="/AI Interview Voice Agent Logo.png"
                    alt="logo"
                    width={180}
                    height={180}
                    className="w-[150px]"
                />
                <Button className="w-full mt-4"><Plus />Create New Interview</Button>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarMenu>
                        {SideBarOptions.map((option, index) => {
                            const Icon = option.icon
                            const isActive = pathname === option.path
                            return (
                                <SidebarMenuItem key={index}>
                                    <SidebarMenuButton
                                        render={<Link href={option.path} />}
                                        isActive={isActive}
                                        className={`flex items-center gap-2 p-6 hover:bg-blue-50 hover:text-primary ${isActive ? "bg-blue-50 text-primary data-active:bg-blue-50 data-active:text-primary hover:bg-blue-50 hover:text-primary [&_svg]:text-primary [&_svg]:stroke-primary" : ""}`}
                                    >
                                        <Icon className={isActive ? "!text-primary !stroke-primary" : ""} />
                                        <span className={`text-[16px] ${isActive ? "text-primary font-medium" : ""}`}>
                                            {option.name}
                                        </span>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            )
                        })}
                    </SidebarMenu>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter />
        </Sidebar>
    )
}
