"use client";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { RootState } from "@/redux/rootReducer";
import { updateProfileImage } from "@/redux/slices/authSlice";
import { Button } from "@headlessui/react";
import React, { useRef, useState } from "react";
import Loader from "../Loader";
import { toast } from "react-toastify";

type Props = {};

let profile_imgs_name_list = [
    "Garfield",
    "Tinkerbell",
    "Annie",
    "Loki",
    "Cleo",
    "Bob",
    "Mia",
    "Coco",
    "Gracie",
    "Bear",
    "Bella",
    "Abby",
    "Harley",
    "Cali",
    "Leo",
    "Luna",
    "Jack",
    "Felix",
    "Kiki",
];
let profile_imgs_collections_list = [
    "micah",
    "lorelei",
    "avataaars-neutral",
    "bottts",
];

const ProfileImage = (props: Props) => {
    const dispatch = useAppDispatch();
    const userData = useAppSelector(
        (state: RootState) => state.auth.data?.user
    );
    const isLoading = useAppSelector((state) => state.auth.isLoading);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [profileImage, setProfileImage] = useState<string>(
        userData?.profile_img ||
            "https://img.freepik.com/premium-photo/man-with-glasses-tie-is-wearing-tie_745528-2624.jpg"
    );

    const [isChange, setIsChange] = useState(false);

    const handleButtonClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click(); // Programmatically trigger input file dialog
        }
    };

    const saveProfileImage = async () => {
        const data = {
            profile_image: profileImage,
        };
        const json = await dispatch(
            updateProfileImage(data, userData?._id || "")
        );

        if (json?.status === 200) {
            setIsChange(false);
        }
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            if (file.size > 2 * 1024 * 1024) {
                toast.error('File size exceeds 2MB. Please choose a smaller file.');
                return;
            }
            setIsChange(true);
            const reader = new FileReader();
            reader.onloadend = () => {
                if (typeof reader.result === "string") {
                    setProfileImage(reader.result);
                }
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="flex gap-y-4 w-full max-w-[200px] flex-col">
            <p className="text-lg font-semibold">Profile Image</p>
            <img src={profileImage} alt="profile_img" />
            <div className="flex justify-between gap-x-3 items-center">
                <input
                    ref={fileInputRef}
                    type="file"
                    style={{ display: "none" }}
                    onChange={handleFileChange}
                    accept=".jpg, .jpeg, .png"
                />
                <Button
                    className={"bg-secondary grow h-10"}
                    onClick={handleButtonClick}
                >
                    Change
                </Button>
                {isChange && (
                    <Button
                        onClick={saveProfileImage}
                        className={
                            "bg-secondary flex h-10 justify-center items-center grow"
                        }
                    >
                        {isLoading ? (
                            <Loader size={{ width: 20, height: 20 }} />
                        ) : (
                            "Save"
                        )}
                    </Button>
                )}
            </div>
        </div>
    );
};

export default ProfileImage;
