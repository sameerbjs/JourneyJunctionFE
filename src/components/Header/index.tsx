"use client";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { RootState } from "@/redux/rootReducer";
import { setLogout } from "@/redux/slices/authSlice";
import {
    CloseButton,
    Popover,
    PopoverButton,
    PopoverPanel,
    Transition,
} from "@headlessui/react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import { GiWorld } from "react-icons/gi";
import Cookies from "js-cookie";
import Api from "@/services/api";

type Props = {};

const Header = (props: Props) => {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const pathName = usePathname();

    const profileImg = useAppSelector(
        (state: RootState) => state.auth.data?.user?.profile_img
    );
    const isAuthenticated = useAppSelector(
        (state: RootState) => state.auth.data?.auth
    );

    const showHeader = () => {
        return pathName === "/login" || pathName === "/register";
    };

    return (
        <div
            className={`lg:px-10 h-16 px-5 justify-between ${
                showHeader() ? "hidden" : "flex"
            } items-center bg-secondary`}
        >
            <Link
                href={"/"}
                className="uppercase hover:text-primary text-lg font-semibold"
            >
                <GiWorld size={24} className="text-primary" />
            </Link>
            {
                isAuthenticated && 
                <div className="flex justify-center items-center space-x-10">
                    <Link
                        href={"/"}
                        className="font-normal hover:text-primary text-lg"
                    >
                        Home
                    </Link>
                    <Link
                        href={"/"}
                        className="font-normal hover:text-primary text-lg"
                    >
                        Explore
                    </Link>
                    <Link
                        href={"/"}
                        className="font-normal hover:text-primary text-lg"
                    >
                        Travels
                    </Link>
                </div>
            }
            {isAuthenticated ? (
                <div className="flex justify-center items-center space-x-5">
                    <Popover className="relative">
                        <PopoverButton className={"border-none outline-none"}>
                            <img
                                alt="avatar"
                                src={
                                    profileImg ||
                                    "https://img.freepik.com/premium-photo/man-with-glasses-tie-is-wearing-tie_745528-2624.jpg"
                                }
                                className="rounded-full object-cover h-[40px] w-[40px]"
                            />
                        </PopoverButton>
                        <Transition
                            enter="transition ease-out duration-200"
                            enterFrom="opacity-0 translate-y-1"
                            enterTo="opacity-100 translate-y-0"
                            leave="transition ease-in duration-150"
                            leaveFrom="opacity-100 translate-y-0"
                            leaveTo="opacity-0 translate-y-1"
                        >
                            <PopoverPanel
                                anchor="bottom end"
                                className="flex mt-2 divide-y w-full !max-w-[150px] flex-col bg-white p-2 rounded shadow"
                            >
                                <CloseButton
                                    as={Link}
                                    href="/profile"
                                    className="p-2 hover:bg-secondary"
                                >
                                    Profile
                                </CloseButton>
                                <CloseButton
                                    onClick={() => {
                                        Api.clearClientToken();
                                        dispatch(setLogout());
                                        Cookies.remove("authToken");
                                        router.replace('/');
                                        router.refresh();
                                    }}
                                    className="p-2 hover:bg-secondary text-start"
                                >
                                    Logout
                                </CloseButton>
                            </PopoverPanel>
                        </Transition>
                    </Popover>
                </div>
            ) : (
                <Link
                    href={"/login"}
                    className="font-normal bg-primary hover:opacity-80 px-3 py-1 rounded-lg text-secondary text-base"
                >
                    Login
                </Link>
            )}
        </div>
    );
};

export default Header;
