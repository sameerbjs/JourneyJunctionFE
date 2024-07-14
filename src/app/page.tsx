import React from "react";
import Banner from "@/components/Banner/Banner";
import Moments from "@/components/Moments/Moments";
import PeopleTravel from "@/components/PeopleTravel/PeopleTravel";
import Travels from "@/components/Travels/Travels";

export default function Home() {
    return (
        <>
            <Banner scrollID="scroll" />
            <div className="p-10 space-y-20" id="scroll">
                <div>
                    <p className="capitalize text-center text-primary text-2xl font-normal">
                        People Travelling Around The World
                    </p>
                    <PeopleTravel />
                </div>
                {/* <div>
                    <p className="capitalize text-center text-primary text-2xl font-normal">
                        Travels
                    </p>
                    <Travels />
                </div> */}
                <div>
                    <p className="capitalize text-center text-primary text-2xl font-normal">
                        moments
                    </p>
                    <Moments />
                </div>
            </div>
        </>
    );
}
