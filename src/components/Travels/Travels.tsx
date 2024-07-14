'use client'

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { RootState } from "@/redux/rootReducer";
import { getUserTravel } from "@/redux/slices/travelSlice";
import { Button } from "@headlessui/react";
import moment from "moment";
import Image from "next/image";
import React, { useEffect } from "react";
import { CiBookmark, CiHeart } from "react-icons/ci";
import Loader from "../Loader";

type Props = {};

const Travels = (props: Props) => {

    const dispatch = useAppDispatch();
    const userId = useAppSelector((state: RootState) => state.auth.data?.user._id);
    const travels = useAppSelector((state: RootState) => state.travel.travels);
    const isLoading = useAppSelector((state: RootState) => state.travel.isLoading);

    useEffect(() => {
        dispatch(getUserTravel(userId || ''));
    }, [])

    
    if(isLoading){
        return (
            <div className="h-44 flex justify-center items-center">
              <Loader size={{height : 40, width : 40}} />
            </div>
        )
    }

    if(travels.length === 0){
        return (
            <div className="h-44 flex justify-center items-center">
                <p className="font-semibold text-lg text-primary">
                    No Travel Found
                </p>
            </div>
        )
    }


    return (
        <div className="grid md:grid-cols-2 grid-cols-1 gap-10 mt-10">
            {travels.map((travel, index) => {
                return (
                    <div
                        key={index}
                        className="flex h-full flex-col bg-white p-4 rounded-3xl shadow-[0px_4px_40px_0px_#0000001A] cursor-pointer justify-center gap-y-3"
                    >
                        <div className="h-[300px] group w-full relative">
                            <div
                                style={{
                                    background: `url(${travel.travel_img})`,
                                    backgroundSize: "cover",
                                    backgroundRepeat: "no-repeat",
                                    backgroundPosition: "50% 50%",
                                    height: "100%",
                                    width: "100%",
                                }}
                            >
                                <div className="h-full flex justify-center items-center">
                                    <div className="text-center space-y-2">
                                        <p className=" text-white text-3xl font-semibold tracking-wide">
                                            {travel.startLocation}
                                        </p>
                                        <p className=" text-white text-xl font-semibold tracking-wide">
                                            {moment(travel.endDate).format('DD-MMMM-YYYY')}
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="absolute top-3 left-3 bg-black/30 rounded px-3 py-2">
                                <p className="text-base text-white">
                                    Travel from {travel.startLocation} to {travel.endLocation}
                                </p>
                            </div>
                            <div className="absolute transition-all ease-in-out duration-500 hidden group-hover:flex bg-black/60 inset-0 h-full justify-center items-center">
                                <Button className={'text-white border-2 transition-all ease-in-out duration-500 hover:bg-secondary hover:text-primary border-secondary w-44 py-2'}>See more</Button>
                            </div>
                        </div>
                        <div className="mt-3 flex justify-between items-center">
                            <div className="flex cursor-pointer items-center gap-x-3">
                                <Image
                                    src={travel.user.profile_img}
                                    alt="avatar"
                                    width={50}
                                    height={50}
                                    className="rounded-full min-h-[50px] min-w-[50px]"
                                />
                                <p className="text-base font-normal">
                                    {travel.user.full_name}
                                </p>
                            </div>
                            <div className="flex items-center gap-x-3">
                                <div className="flex items-center gap-x-1">
                                    <CiHeart
                                        size={30}
                                        className="text-primary"
                                    />
                                    <span className="text-sm">1</span>
                                </div>
                                <div className="flex items-center gap-x-1">
                                    <CiBookmark
                                        size={27}
                                        className="text-primary"
                                    />
                                    <span className="text-sm">1</span>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default Travels;
