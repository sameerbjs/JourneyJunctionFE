import Loader from "@/components/Loader";
import React from "react";

const loading = () => {
    return (
        <div className="h-full flex overflow-hidden flex-col justify-center items-center">
            <Loader size={{ height: 40, width: 40 }} />
        </div>
    );
};

export default loading;