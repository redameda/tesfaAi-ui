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
    BookOpen,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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

import {
    Drawer,
    DrawerContent,
    DrawerHeader,
    DrawerTrigger,
} from "@/components/ui/drawer";

import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import MainP from "./MainP";

const hubNav = [
    { href: "/", label: "Home", icon: Home },
    { href: "/practice", label: "Practice", icon: Briefcase },
    { href: "/leaderboard", label: "Leaderboard", icon: BarChart3 },
    { href: "/questions", label: "Questions", icon: FileText },
    { href: "/profile", label: "Profile", icon: User },
];

const subjects = [
    "Mathematics",
    "Biology",
    "Physics",
    "Chemistry",
    "History",
    "Economics",
    "Geography",
];

export default function AppLayout() {
    const pathname = usePathname();
    const [activeSubject, setActiveSubject] = useState("Mathematics");

    const isActive = (href: string) =>
        pathname === href || pathname.startsWith(href + "/");

    return (
        <SidebarProvider>
            <div className="flex h-screen bg-background text-foreground">

                {/* SIDEBAR */}
                <Sidebar className="border-r border-border hidden md:block">
                    <SidebarHeader className="border-b border-border p-6">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
                                <BookOpen className="w-6 h-6 text-primary-foreground" />
                            </div>
                            <div>
                                <h1 className="font-bold text-xl">Eduade</h1>
                                <p className="text-xs text-muted-foreground">
                                    Learning Platform
                                </p>
                            </div>
                        </div>
                    </SidebarHeader>

                    <SidebarContent>
                        {/* SUBJECTS */}
                        <SidebarGroup>
                            <SidebarGroupLabel className="text-xs uppercase tracking-widest text-muted-foreground px-4 mb-2">
                                Subjects
                            </SidebarGroupLabel>

                            <SidebarGroupContent className="px-3">
                                <div className="flex flex-wrap gap-2">
                                    {subjects.map((subject) => (
                                        <Button
                                            key={subject}
                                            variant={
                                                activeSubject === subject ? "default" : "ghost"
                                            }
                                            size="sm"
                                            onClick={() => setActiveSubject(subject)}
                                        >
                                            {subject}
                                        </Button>
                                    ))}
                                </div>
                            </SidebarGroupContent>
                        </SidebarGroup>

                        {/* NAV */}
                        <SidebarGroup>
                            <SidebarGroupLabel className="text-xs uppercase tracking-widest text-muted-foreground px-4 mb-2">
                                Hub
                            </SidebarGroupLabel>

                            <SidebarGroupContent>
                                <SidebarMenu>
                                    {hubNav.map((item) => {
                                        const active = isActive(item.href);

                                        return (
                                            <SidebarMenuItem key={item.href}>
                                                <SidebarMenuButton asChild isActive={active}>
                                                    <Link
                                                        href={item.href}
                                                        className={
                                                            active ? "text-primary font-medium" : ""
                                                        }
                                                    >
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

                {/* MAIN */}
                <div className="flex-1 flex flex-col overflow-hidden">

                    {/* HEADER (MOBILE) */}
                    <header className="md:hidden fixed top-0 left-0 right-0 border-b border-border px-4 py-4 flex items-center justify-between bg-background z-50">
                        <Drawer direction="top">
                            <DrawerTrigger asChild>
                                <Badge className="bg-primary text-primary-foreground py-2 px-3">
                                    {activeSubject}
                                </Badge>
                            </DrawerTrigger>

                            <DrawerContent className="rounded-none bg-background">
                                <DrawerHeader>
                                    <Badge className="py-3">
                                        Grade 9 Learning Subjects
                                    </Badge>

                                    <ScrollArea className="w-full">
                                        <div className="flex w-max gap-2 p-2">
                                            {subjects.map((subject) => (
                                                <Button
                                                    key={subject}
                                                    variant={
                                                        activeSubject === subject
                                                            ? "default"
                                                            : "ghost"
                                                    }
                                                    size="sm"
                                                    onClick={() => setActiveSubject(subject)}
                                                >
                                                    {subject}
                                                </Button>
                                            ))}
                                        </div>
                                        <ScrollBar orientation="horizontal" />
                                    </ScrollArea>
                                </DrawerHeader>
                            </DrawerContent>
                        </Drawer>
                    </header>

                    {/* CONTENT */}
                    <main className="flex-1 overflow-auto pt-20 px-4 pb-20 md:p-6">
                        <div className="text-muted-foreground">
                            <MainP grade={"9"} subject={activeSubject.toLowerCase()} />f
                        </div>
                    </main>

                    {/* MOBILE NAV */}
                    <nav className="md:hidden fixed bottom-0 left-0 right-0 border-t border-border bg-background mx-4 my-2 rounded-xl z-50">
                        <div className="flex items-center justify-around h-16">
                            {hubNav.map((item) => {
                                const active = isActive(item.href);

                                return (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        className={`flex flex-col items-center justify-center flex-1 gap-1 ${active
                                            ? "text-primary"
                                            : "text-muted-foreground"
                                            }`}
                                    >
                                        <item.icon size={22} />
                                        <span className="text-[10px]">
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