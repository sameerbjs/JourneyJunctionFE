import SideBar from "@/components/Profile/SideBar";
import React from "react";

export default function ProfileLayout({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    return (
        <div className="grow">
            <div className="grid grid-cols-12 h-[calc(100vh-64px)] overflow-y-auto">
                <div className="col-span-2">
                    <SideBar />
                </div>
                <div className="p-5 col-span-10">{children}</div>
            </div>
        </div>
    );
}
