"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    Home,
    Briefcase,
    BarChart3,
    FileText,
    User,
    Lightbulb,
    BookOpen
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupAction, SidebarGroupLabel, SidebarHeader, SidebarProvider } from "../ui/sidebar";

const navItems = [
    { href: "/", label: "Home", icon: Home },
    { href: "/practice", label: "Practice", icon: Briefcase },
    { href: "/leaderboard", label: "Leaderboard", icon: BarChart3 },
    { href: "/questions", label: "Questions", icon: FileText },
    { href: "/profile", label: "Profile", icon: User },
];

export function SidebarL() {
    const pathname = usePathname();

    return (
        <SidebarProvider>
            <Sidebar>
                <SidebarHeader>
                    <h1 className="font-bold text-3xl w-full place-content-center flex items-center gap-2"> <BookOpen />Eduade</h1>
                </SidebarHeader>
                <SidebarContent>
                    <SidebarGroup>
                        <SidebarGroupLabel className="text-xl">Subjects</SidebarGroupLabel>
                        <div className="flex gap-3 w-full flex-wrap ">
                            <Button>Mathematics</Button>
                            <Button variant={"outline"}>Chemistry</Button>
                            <Button variant={"outline"}>Biology</Button>
                            <Button variant={"outline"}>Physics</Button>
                            <Button variant={"outline"}>Geo</Button>
                            <Button variant={"outline"}>Agri</Button>
                        </div>
                    </SidebarGroup>
                    <SidebarGroup className="flex-none gap-1">
                        <SidebarGroupLabel className="text-xl">Hub</SidebarGroupLabel>
                        <Button >Physics</Button>
                        <Button variant={"ghost"}>Geo</Button>
                        <Button variant={"ghost"}>Agri</Button>
                    </SidebarGroup>
                </SidebarContent>

            </Sidebar>
        </SidebarProvider>
    );
}