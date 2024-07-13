"use client";

import Loader from "@/components/Loader";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { userLogin } from "@/redux/slices/authSlice";
import validationLoginSchema from "@/schema/loginSchema";
import { Button, Field, Input, Label } from "@headlessui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import Cookies from "js-cookie";
import Api from "@/services/api";

interface FormData {
    email: string;
    password: string;
}

const Login = () => {
    const dispatch = useAppDispatch();
    const router = useRouter();
    const isLoading = useAppSelector((state) => state.auth.isLoading);

    const {
        register,
        handleSubmit,
        setValue,
        reset,
        formState: { errors },
    } = useForm<FormData>({
        resolver: yupResolver(validationLoginSchema),
    });

    
    const onSubmit = async (data: FormData) => {
        const json = await dispatch(userLogin(data));
        if (json.status === 200) {
            reset();
            Api.setClientToken(`${json.data?.token}`);
            Cookies.set("authToken", "true");
            router.refresh();
            router.replace("/");
        }
    };

    return (
        <div className="h-screen overflow-y-auto flex p-5 flex-col justify-center items-center">
            <h1 className="text-primary font-semibold lg:text-5xl text-3xl lg:text-start text-center mb-10">
                Login to Journey Junction
            </h1>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="w-full max-w-lg space-y-4"
            >
                <Field className={"flex flex-col gap-y-1"}>
                    <Label className={"text-lg font-normal"}>Email</Label>
                    <Input
                        {...register("email")}
                        onChange={(e) => setValue("email", e.target.value)}
                        className={
                            "h-10 rounded px-4 data-[focus]:border-none data-[focus]:outline-none text-base bg-secondary" 
                        }
                        placeholder="Enter your email"
                    />
                    {errors.email && (
                        <p className="text-red-500">{errors.email.message}</p>
                    )}
                </Field>
                <Field className={"flex flex-col gap-y-1"}>
                    <Label className={"text-lg font-normal"}>Password</Label>
                    <Input
                        {...register("password")}
                        onChange={(e) => setValue("password", e.target.value)}
                        className={
                            "h-10 rounded px-4 data-[focus]:border-none data-[focus]:outline-none text-base bg-secondary" 
                        }
                        type="password"
                        placeholder="Enter your password"
                    />
                    {errors.password && (
                        <p className="text-red-500">
                            {errors.password.message}
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
                        "Login"
                    )}
                </Button>
            </form>
            <div className="flex justify-center items-center w-full mt-4 max-w-lg">
                <div className="grow bg-primary h-px" />
                <p className="text-base px-3">or</p>
                <div className="grow bg-primary h-px" />
            </div>
            <div className="mt-4">
                <p className="text-base">
                    Don't have an account{" "}
                    <Link
                        href={"/register"}
                        className="text-primary underline text-base"
                    >
                        Register here
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
