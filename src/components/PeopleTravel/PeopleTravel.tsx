'use client'

import Image from "next/image";
import React from "react";

type Props = {};

const PeopleTravel = (props: Props) => {
    const travelers = [
        {
            avatar: "https://avatar.iran.liara.run/public/45",
            place : "Spain"
        },
        {
            avatar: "https://avatar.iran.liara.run/public/37",
            place : "United State"

        },
        {
            avatar: "https://avatar.iran.liara.run/public/12",
            place : "Pakistan"

        },
        {
            avatar: "https://avatar.iran.liara.run/public/24",
            place : "India"

        },
        {
            avatar: "https://avatar.iran.liara.run/public/10",
            place : "Canada"

        },
        {
            avatar: "https://avatar.iran.liara.run/public/6",
            place : "Ukrain"

        },
        {
            avatar: "https://avatar.iran.liara.run/public/28",
            place : "Islamabad"

        },
        {
            avatar: "https://avatar.iran.liara.run/public/45",
            place : "Portugal"

        },
        {
            avatar: "https://avatar.iran.liara.run/public/37",
            place : "United kingdom"

        },
        {
            avatar: "https://avatar.iran.liara.run/public/12",
            place : "Spain"

        },
    ];

    return (
        <div className="flex justify-center flex-wrap items-center gap-x-10 gap-y-5 mt-10">
            {travelers.map((people,index) => {
                return (
                    <div key={index} className="flex flex-col cursor-pointer justify-center items-center gap-y-3">
                        <Image
                            src={people.avatar}
                            alt="avatar"
                            width={50}
                            height={50}
                        />
                        <p className="text-base font-normal">{people.place}</p>
                    </div>
                );
            })}
        </div>
    );
};

export default PeopleTravel;
