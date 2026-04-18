"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import {
    Home,
    Briefcase,
    BarChart3,
    FileText,
    User,
    Lightbulb,
    BookOpen,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarProvider,
    SidebarRail,
} from "@/components/ui/sidebar";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from "../ui/drawer";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";

// Hub Navigation
const hubNav = [
    { href: "/", label: "Home", icon: Home },
    { href: "/practice", label: "Practice", icon: Briefcase },
    { href: "/leaderboard", label: "Leaderboard", icon: BarChart3 },
    { href: "/questions", label: "Questions", icon: FileText },
    { href: "/profile", label: "Profile", icon: User },
];

// Subjects
const subjects = ["Mathematics", "Biology", "Physics", "Chemistry", "History", "Economics", "Geography"];

export default function AppLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const pathname = usePathname();
    const [activeSubject, setActiveSubject] = useState("Mathematics");

    return (
        <SidebarProvider>
            <div className="flex h-screen bg-zinc-950">

                {/* ==================== DESKTOP SIDEBAR ==================== */}
                <Sidebar className="border-r border-zinc-800/50 hidden md:block">
                    <SidebarHeader className="border-b border-zinc-800/50 p-6">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-blue-600 rounded-2xl flex items-center justify-center">
                                <BookOpen className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h1 className="font-bold text-2xl tracking-tight">Eduade</h1>
                                <p className="text-xs text-zinc-500 -mt-1">Learning Platform</p>
                            </div>
                        </div>
                    </SidebarHeader>

                    <SidebarContent>

                        {/* SUBJECTS */}
                        <SidebarGroup>
                            <SidebarGroupLabel className="text-sm uppercase tracking-widest text-zinc-500 px-4 mb-2">
                                Subjects
                            </SidebarGroupLabel>
                            <SidebarGroupContent className="px-3">
                                <div className="flex flex-wrap gap-2">
                                    {subjects.map((subject) => (
                                        <Button
                                            key={subject}
                                            variant={activeSubject === subject ? "default" : "ghost"}
                                            size="sm"
                                            className={`transition-all ${activeSubject === subject
                                                ? "bg-blue-600 text-white"
                                                : "hover:bg-zinc-900 border-zinc-700"
                                                }`}
                                            onClick={() => setActiveSubject(subject)}
                                        >
                                            {subject}
                                        </Button>
                                    ))}
                                </div>
                            </SidebarGroupContent>
                        </SidebarGroup>

                        <SidebarGroup>
                            <SidebarGroupLabel className="text-sm uppercase tracking-widest text-zinc-500 px-4 mb-2">
                                Hub
                            </SidebarGroupLabel>
                            <SidebarGroupContent>
                                <SidebarMenu>
                                    {hubNav.map((item) => {
                                        const isActive = pathname === item.href;
                                        return (
                                            <SidebarMenuItem key={item.href}>
                                                <SidebarMenuButton asChild isActive={isActive}>
                                                    <Link href={item.href}>
                                                        <item.icon />
                                                        <span>{item.label}</span>
                                                    </Link>
                                                </SidebarMenuButton>
                                            </SidebarMenuItem>
                                        );
                                    })}
                                </SidebarMenu>
                            </SidebarGroupContent>
                        </SidebarGroup>

                    </SidebarContent>

                    <SidebarRail />
                </Sidebar>

                {/* ==================== MAIN CONTENT ==================== */}
                <div className="flex-1 flex flex-col overflow-hidden">

                    {/* HEADER */}
                    <header className="md:hidden fixed top-0 left-0 right-0 w-screen border-b border-zinc-800/50 px-4 py-4 flex items-center justify-between bg-zinc-950 z-50">
                        <Drawer direction="top" >
                            <DrawerTrigger asChild >
                                <Badge className="bg-blue-600  text-white px-6 py-4 text-base rounded-full flex items-center gap-2 font-semibold">
                                    <Lightbulb className="w-5 h-5" />
                                    {activeSubject}
                                    <span className="ml-1 text-sm opacity-90">100XP</span>
                                </Badge>
                            </DrawerTrigger>
                            <DrawerContent className="rounded-none">
                                <DrawerHeader>
                                    <DrawerTitle>Choose subject</DrawerTitle>
                                    <ScrollArea className="w-full whitespace-nowrap">


                                        {subjects.map((subject) => (
                                            <Button
                                                key={subject}
                                                variant={activeSubject === subject ? "default" : "ghost"}
                                                size="sm"
                                                className={`transition-all ${activeSubject === subject
                                                    ? "bg-blue-600 text-white"
                                                    : "hover:bg-zinc-900 border-zinc-700"
                                                    }`}
                                                onClick={() => setActiveSubject(subject)}
                                            >
                                                {subject}
                                            </Button>
                                        ))}

                                    </ScrollArea>
                                </DrawerHeader>
                            </DrawerContent>
                        </Drawer>
                    </header>

                    {/* MAIN */}
                    <main className="flex-1 overflow-auto pt-20 px-0 pb-20 md:p-6">
                        <div className="text-zinc-400">
                            {children}
                        </div>
                    </main>

                    {/* MOBILE FOOTER (ONLY PROFILE) */}
                    <nav className="md:hidden fixed bottom-0 left-0 right-0 border-t rounded-2xl mx-4 my-2 border-zinc-800/50 bg-zinc-900 z-50">
                        <div className="flex items-center justify-around h-16">
                            {hubNav.map((item) => {
                                const isActive = pathname === item.href;
                                return (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        className={`flex flex-col items-center justify-center flex-1 gap-1 ${isActive
                                            ? "text-blue-500"
                                            : "text-zinc-400 hover:text-zinc-300"
                                            }`}
                                    >
                                        <item.icon size={24} strokeWidth={isActive ? 2.5 : 2} />
                                        <span className="text-[10px] font-medium">
                                            {item.label}
                                        </span>
                                    </Link>
                                );
                            })}
                        </div>
                    </nav>
                </div>
            </div>
        </SidebarProvider>
    );
}