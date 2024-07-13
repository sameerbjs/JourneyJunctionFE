import React from "react";
import ProfileImage from "@/components/Profile/ProfileImage";
import ProfileUpdate from "@/components/Profile/ProfileUpdate";

type Props = {};

const Profile = (props: Props) => {
    return (
        <div className="w-full grid shadow-[0px_0px_20px_0px_rgba(0,0,0,0.1)] rounded p-5 gap-5 grid-cols-12">
            <div className="col-span-3">
                <ProfileImage />
            </div>
            <div className="col-span-9">
              <ProfileUpdate />
            </div>
        </div>
    );
};

export default Profile;
