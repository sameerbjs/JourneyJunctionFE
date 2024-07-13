"use client";

import validationRegisterSchema from "@/schema/registerSchema";
import {
    Button,
    Combobox,
    ComboboxButton,
    ComboboxInput,
    ComboboxOption,
    ComboboxOptions,
    Field,
    Input,
    Label,
    Transition,
} from "@headlessui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import Link from "next/link";
import React, { useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { Country, State } from "country-state-city";
import { BsArrowDown } from "react-icons/bs";
import { IoCheckmark } from "react-icons/io5";
import { useState } from "react";
import { ICountry, IState } from "country-state-city";
import { userRegister } from "@/redux/slices/authSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useRouter } from "next/navigation";
import Loader from "@/components/Loader";
import { toast } from "react-toastify";

interface FormData {
    full_name: string;
    email: string;
    password: string;
    country: string;
    state?: string | null;
    profile_img: string;
}
const Register = () => {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const isLoading = useAppSelector((state) => state.auth.isLoading);

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<FormData>({
        resolver: yupResolver(validationRegisterSchema),
    });

    const [query, setQuery] = useState<string>("");
    const [selectedCountry, setSelectedCountry] = useState<ICountry | null>(
        null
    );
    const [queryState, setQueryState] = useState<string>("");
    const [selectedState, setSelectedState] = useState<IState | null>(null);

    const filteredCountries: ICountry[] = useMemo(() => {
        if (query === "") {
            return Country.getAllCountries();
        }
        return Country.getAllCountries().filter((country) =>
            country.name.toLowerCase().includes(query.toLowerCase())
        );
    }, [query]);

    const filteredStates: IState[] = useMemo(() => {
        if (queryState.trim() === "" && selectedCountry) {
            return State.getStatesOfCountry(selectedCountry?.isoCode);
        }
        return State.getStatesOfCountry(selectedCountry?.isoCode).filter(
            (state) =>
                state.name.toLowerCase().includes(queryState.toLowerCase())
        );
    }, [queryState, selectedCountry]);

    useEffect(() => {
        if (filteredStates.length === 0) {
            setValue("state", null);
        }
    }, [selectedCountry]);

    const onSubmit = async (data: FormData) => {
        const response = await dispatch(userRegister(data));
        if (response.status === 200) {
            router.push("/login");
        }
    };

    const handleFile = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event?.target?.files?.[0];

        if (file) {
            if (file.size > 2 * 1024 * 1024) {
                toast.error(
                    "File size exceeds 2MB. Please choose a smaller file."
                );
                return;
            }
            const reader = new FileReader();
            reader.onloadend = () => {
                if (typeof reader.result === "string") {
                    setValue("profile_img", reader.result);
                }
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="flex p-5 flex-col justify-center items-center">
            <h1 className="text-primary font-semibold lg:text-5xl text-4xl lg:text-start text-center my-10">
                Register to Journey Junction
            </h1>
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
                <Field className={"flex flex-col gap-y-1"}>
                    <Label className={"text-lg font-normal"}>Password</Label>
                    <Input
                        {...register("password")}
                        onChange={(e) => setValue("password", e.target.value)}
                        className={
                            "h-10 rounded px-4 data-[focus]:border-none data-[focus]:outline-none text-base  bg-secondary"
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
                <Field className={"flex flex-col gap-y-1"}>
                    <Label className={"text-lg font-normal"}>
                        Profile Image
                    </Label>
                    <Input
                        onChange={handleFile}
                        className={
                            "py-1  bg-secondary rounded px-4 data-[focus]:border-none data-[focus]:outline-none text-base"
                        }
                        type="file"
                        accept="image/jpeg, image/png"
                    />
                    {errors.profile_img && (
                        <p className="text-red-500">
                            {errors.profile_img.message}
                        </p>
                    )}
                </Field>
                <Field className={"flex flex-col gap-y-1"}>
                    <Label className={"text-lg font-normal"}>Country</Label>
                    <Combobox
                        value={selectedCountry}
                        onChange={(value: ICountry) => {
                            setSelectedCountry(value);
                            setSelectedState(null);
                            setValue("country", value?.name);
                            setValue("state", "");
                        }}
                    >
                        <div className="relative">
                            <ComboboxInput
                                {...register("country")}
                                className={
                                    "h-10 rounded px-4 text-primary bg-secondary data-[focus]:border-none data-[focus]:outline-none text-base w-full"
                                }
                                displayValue={(country: ICountry) =>
                                    country?.name
                                }
                                onChange={(event) =>
                                    setQuery(event.target.value)
                                }
                                placeholder="Please select country"
                            />
                            <ComboboxButton className="group absolute inset-y-0 right-0 px-2.5">
                                <BsArrowDown className="size-4 fill-primary/60 group-data-[hover]:fill-primary" />
                            </ComboboxButton>
                        </div>
                        <Transition
                            leave="transition ease-in duration-100"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                            afterLeave={() => setQuery("")}
                        >
                            <ComboboxOptions
                                anchor="bottom"
                                className="w-[var(--input-width)] mt-2 h-36 shadow  bg-secondary rounded-xl border border-white/5 p-1 [--anchor-gap:var(--spacing-1)] empty:hidden"
                            >
                                {filteredCountries.map(
                                    (country: ICountry, index: number) => (
                                        <ComboboxOption
                                            key={index}
                                            value={country}
                                            className="group flex cursor-default items-center gap-2 rounded-lg py-1.5 px-3 select-none data-[focus]:bg-white/10"
                                        >
                                            <IoCheckmark className="invisible size-4 fill-primary group-data-[selected]:visible" />
                                            <div className="text-base cursor-pointer text-primary">
                                                {country.name}
                                            </div>
                                        </ComboboxOption>
                                    )
                                )}
                            </ComboboxOptions>
                        </Transition>
                    </Combobox>
                    {errors.country && (
                        <p className="text-red-500">{errors.country.message}</p>
                    )}
                </Field>
                {selectedCountry !== null && filteredStates.length !== 0 && (
                    <Field className={"flex flex-col gap-y-1"}>
                        <Label className={"text-lg font-normal"}>State</Label>
                        <Combobox
                            value={selectedState}
                            onChange={(value: IState) => {
                                setSelectedState(value);
                                setValue("state", value?.name);
                            }}
                        >
                            <div className="relative">
                                <ComboboxInput
                                    {...register("state")}
                                    className={
                                        "h-10 rounded px-4 bg-secondary text-primary data-[focus]:border-none data-[focus]:outline-none text-base w-full"
                                    }
                                    displayValue={(state: IState) =>
                                        state?.name
                                    }
                                    onChange={(event) =>
                                        setQueryState(event.target.value)
                                    }
                                    placeholder="Please select state"
                                />
                                <ComboboxButton className="group absolute inset-y-0 right-0 px-2.5">
                                    <BsArrowDown className="size-4 fill-primary/60 group-data-[hover]:fill-primary" />
                                </ComboboxButton>
                            </div>
                            <Transition
                                leave="transition ease-in duration-100"
                                leaveFrom="opacity-100"
                                leaveTo="opacity-0"
                                afterLeave={() => setQueryState("")}
                            >
                                <ComboboxOptions
                                    anchor="bottom"
                                    className="w-[var(--input-width)] mt-2 h-36 shadow  bg-secondary rounded-xl border border-white/5 p-1 [--anchor-gap:var(--spacing-1)] empty:hidden"
                                >
                                    {filteredStates.map(
                                        (state: IState, index: number) => (
                                            <ComboboxOption
                                                key={index}
                                                value={state}
                                                className="group flex cursor-default items-center gap-2 rounded-lg py-1.5 px-3 select-none data-[focus]:bg-white/10"
                                            >
                                                <IoCheckmark className="invisible size-4 fill-primary group-data-[selected]:visible" />
                                                <div className="text-base cursor-pointer text-primary">
                                                    {state.name}
                                                </div>
                                            </ComboboxOption>
                                        )
                                    )}
                                </ComboboxOptions>
                            </Transition>
                        </Combobox>
                        {errors.state && (
                            <p className="text-red-500">
                                {errors.state.message}
                            </p>
                        )}
                    </Field>
                )}
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
                        "Register"
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
                    Have an account{" "}
                    <Link
                        href={"/login"}
                        className="text-primary underline text-base"
                    >
                        Login here
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Register;
