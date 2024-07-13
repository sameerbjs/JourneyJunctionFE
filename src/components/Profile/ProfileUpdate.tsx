"use client";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import React, { useEffect } from "react";
import Loader from "../Loader";
import { Button, Field, Input, Label } from "@headlessui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import validationProfileSchema from "@/schema/profileUpdateSchema";
import { useForm } from "react-hook-form";
import { updateProfile } from "@/redux/slices/authSlice";

type Props = {};

interface FormData {
    full_name: string;
    email: string;
}

const ProfileUpdate = (props: Props) => {
    const dispatch = useAppDispatch();
    const isLoading = useAppSelector((state) => state.auth.isLoading);
    const data = useAppSelector((state) => state.auth.data?.user);

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<FormData>({
        resolver: yupResolver(validationProfileSchema),
    });

    useEffect(() => {
        setValue("full_name", data?.full_name || "'");
        setValue("email", data?.email || "'");
    }, []);

    const onSubmit = async (query: FormData) => {
        
        await dispatch(updateProfile(query, data?._id || ""));
    };

    return (
        <div className="flex gap-y-4 flex-col">
            <p className="text-lg font-semibold">Profile Update</p>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="w-full lg:max-w-lg max-w-md space-y-4"
            >
                <Field className={"flex flex-col gap-y-1"}>
                    <Label className={"text-lg font-normal"}>Full Name</Label>
                    <Input
                        {...register("full_name")}
                        onChange={(e) => setValue("full_name", e.target.value)}
                        className={
                            "h-10 rounded px-4 data-[focus]:border-none data-[focus]:outline-none text-base  bg-secondary"
                        }
                        placeholder="Enter your full name"
                    />
                    {errors.full_name && (
                        <p className="text-red-500">
                            {errors.full_name.message}
                        </p>
                    )}
                </Field>
                <Field className={"flex flex-col gap-y-1"}>
                    <Label className={"text-lg font-normal"}>Email</Label>
                    <Input
                        {...register("email")}
                        onChange={(e) => setValue("email", e.target.value)}
                        className={
                            "h-10 rounded px-4 data-[focus]:border-none data-[focus]:outline-none text-base  bg-secondary"
                        }
                        placeholder="Enter your email"
                    />
                    {errors.email && (
                        <p className="text-red-500">{errors.email.message}</p>
                    )}
                </Field>
                <Button
                    type="submit"
                    className={
                        "bg-primary text-white w-32 flex justify-center items-center px-4 py-2 rounded hover:opacity-80"
                    }
                    disabled={isLoading}
                >
                    {isLoading ? (
                        <Loader size={{ width: 20, height: 20 }} />
                    ) : (
                        "Update"
                    )}
                </Button>
            </form>
        </div>
    );
};

export default ProfileUpdate;
