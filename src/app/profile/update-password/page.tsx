"use client";

import Loader from "@/components/Loader";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { updatePassword } from "@/redux/slices/authSlice";
import validationPasswordSchema from "@/schema/passwordSchema";
import notification from "@/services/notification";
import { Button, Field, Input, Label } from "@headlessui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { useForm } from "react-hook-form";

interface FormData {
    current_password: string;
    new_password: string;
}

const ChangePassword = () => {
    const dispatch = useAppDispatch();
    const isLoading = useAppSelector((state) => state.auth.isLoading);
    const id = useAppSelector((state) => state.auth.data?.user._id);
    const {
        register,
        handleSubmit,
        setValue,
        reset,
        formState: { errors },
    } = useForm<FormData>({
        resolver: yupResolver(validationPasswordSchema),
    });

    const onSubmit = async (data: FormData) => {
        if (data.current_password == data.new_password) {
            return notification.error(
                "Current and New password should not be same"
            );
        }

        const json = await dispatch(updatePassword(data, id || ""));
        if (json.status === 200) {
            reset();
        }
    };

    return (
        <div className="shadow-[0px_0px_20px_0px_rgba(0,0,0,0.1)] rounded p-5">
            <h1 className="text-primary font-semibold text-lg lg:text-start text-center mb-4">
                Update Password
            </h1>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="w-full max-w-3xl space-y-4"
            >
                <Field className={"flex flex-col gap-y-1"}>
                    <Label className={"text-lg font-normal"}>
                        Current Password
                    </Label>
                    <Input
                        {...register("current_password")}
                        onChange={(e) =>
                            setValue("current_password", e.target.value)
                        }
                        className={
                            "h-10 rounded bg-secondary px-4 data-[focus]:border-none data-[focus]:outline-none text-base"
                        }
                        type="password"
                        placeholder="Enter your current password"
                    />
                    {errors.current_password && (
                        <p className="text-red-500">
                            {errors.current_password.message}
                        </p>
                    )}
                </Field>
                <Field className={"flex flex-col gap-y-1"}>
                    <Label className={"text-lg font-normal"}>
                        New Password
                    </Label>
                    <Input
                        {...register("new_password")}
                        onChange={(e) =>
                            setValue("new_password", e.target.value)
                        }
                        className={
                            "h-10 rounded bg-secondary px-4 data-[focus]:border-none data-[focus]:outline-none text-base"
                        }
                        type="password"
                        placeholder="Enter your new password"
                    />
                    {errors.new_password && (
                        <p className="text-red-500">
                            {errors.new_password.message}
                        </p>
                    )}
                </Field>
                <Button
                    type="submit"
                    className={
                        "bg-primary w-32 flex justify-center items-center text-white px-4 py-2 rounded hover:opacity-80"
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

export default ChangePassword;
