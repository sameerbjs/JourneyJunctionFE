import { Button } from "@headlessui/react";
import Image from "next/image";
import React from "react";
import { CiBookmark, CiHeart } from "react-icons/ci";

type Props = {};

const Travels = (props: Props) => {
    const travels = [
        {
            image: "https://img.freepik.com/free-photo/famous-statue-louis-xiv-lyon-city_268835-4070.jpg?t=st=1716542864~exp=1716546464~hmac=13dae17776615ef3b8cd515382ab7e028647cd4eed62368e2649a0ca3ea575b1",
        },
        {
            image: "https://img.freepik.com/free-photo/view-3d-place-praying_23-2151112538.jpg?t=st=1716542867~exp=1716546467~hmac=226060fc1f7432f9c4346c10e21fbb3e65e8682af564df4af2cff2297ecc0d03",
        },
        {
            image: "https://img.freepik.com/free-photo/3d-model-residential-building_23-2150761210.jpg?t=st=1716542872~exp=1716546472~hmac=2613ffbb215ed26dfa50f59911b617d8e7c1a235f2e280e37e5811c7e63411b0",
        },
        {
            image: "https://img.freepik.com/free-photo/view-3d-place-praying_23-2151112538.jpg?t=st=1716542867~exp=1716546467~hmac=226060fc1f7432f9c4346c10e21fbb3e65e8682af564df4af2cff2297ecc0d03",
        },
    ];
    return (
        <div className="grid md:grid-cols-2 grid-cols-1 gap-10 mt-10">
            {travels.map((travel, index) => {
                return (
                    <div
                        key={index}
                        className="flex h-full flex-col bg-white p-4 rounded-3xl shadow-[0px_4px_40px_0px_#0000001A] cursor-pointer justify-center gap-y-3"
                    >
                        <div className="lg:h-[500px] h-[300px] group w-full relative">
                            <div
                                style={{
                                    background: `url(${travel.image})`,
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
                                            Islamabad
                                        </p>
                                        <p className=" text-white text-xl font-semibold tracking-wide">
                                            12-Feb-2024
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="absolute top-3 left-3 bg-black/30 rounded px-3 py-2">
                                <p className="text-base text-white">
                                    Travel from Lahore to Islamabad
                                </p>
                            </div>
                            <div className="absolute transition-all ease-in-out duration-500 hidden group-hover:flex bg-black/60 inset-0 h-full justify-center items-center">
                                <Button className={'text-white border-2 transition-all ease-in-out duration-500 hover:bg-secondary hover:text-primary border-secondary w-44 py-2'}>See more</Button>
                            </div>
                        </div>
                        <div className="mt-3 flex justify-between items-center">
                            <div className="flex cursor-pointer items-center gap-x-3">
                                <Image
                                    src={
                                        "https://avatar.iran.liara.run/public/28"
                                    }
                                    alt="avatar"
                                    width={50}
                                    height={50}
                                />
                                <p className="text-base font-normal">
                                    John Doe
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
