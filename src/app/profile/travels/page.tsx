import Link from "next/link";
import React from "react";

const Travels = () => {
    return (
        <div className="shadow-[0px_0px_20px_0px_rgba(0,0,0,0.1)] rounded p-5">
            <div className="flex justify-end items-end">
                <Link
                    href={"/create-travel"}
                    className={
                        "bg-primary text-white px-4 py-2 rounded hover:opacity-80"
                    }
                >
                    + Create travel
                </Link>
            </div>
        </div>
    );
};

export default Travels;
