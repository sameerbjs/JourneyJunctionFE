"use client";

import Image from "next/image";
import React from "react";
import banner from "../../assets/images/banner.jpg";
import { Button } from "@headlessui/react";
import { scrollToContent } from "@/helpers/ScrollToContent";

type Props = {
    scrollID: string;
};

const Banner = ({ scrollID }: Props) => {
    return (
        <div className="lg:h-[calc(100vh-200px)] relative">
            <Image
                src={banner}
                alt="banner"
                className="w-full h-full object-cover object-top"
            />
            <div className="absolute flex flex-col justify-center items-center inset-0 bg-black/50 h-full lg:gap-y-10 gap-y-5">
                <h1 className="text-white lg:text-5xl text-3xl text-center font-semibold">
                    You're an adventurer - go explore and discover new things!
                </h1>
                <Button
                    onClick={() => scrollToContent(scrollID, 1500)}
                    className="bg-secondary hover:opacity-80 text-primary px-4 py-2 rounded"
                >
                    Let's get started
                </Button>
            </div>
        </div>
    );
};

export default Banner;
