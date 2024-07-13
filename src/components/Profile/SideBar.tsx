"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

type Props = {};

const SideBar = (props: Props) => {
    const pathname = usePathname();

    const links = [
        { href: "/profile", label: "Profile" },
        { href: "/profile/update-password", label: "Update Password" },
        { href: "/profile/moments", label: "Moments" },
        { href: "/profile/travels", label: "Travels" },
    ];
    const activeIndex = links.findIndex((link) => link.href === pathname);
    return (
        <div className="pl-5 py-5 border-r h-full">
            <div className="flex flex-col gap-y-4 relative">
                <div
                    className="absolute h-12 w-[2px] bg-primary right-0 top-0 transition-transform duration-400 ease-in"
                    style={{ transform: `translateY(${activeIndex * 4}rem)` }}
                />

                {links.map((link, index) => (
                    <Link
                        key={index}
                        href={link.href}
                        className={`px-4 h-12 flex items-center border-primary transition-all duration-200 ease-in hover:bg-primary/20 ${
                            pathname === link.href ? "bg-primary/20" : ""
                        }`}
                    >
                        {link.label}
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default SideBar;
