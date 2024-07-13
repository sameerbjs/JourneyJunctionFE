"use client";

import validationCreateTravelSchema from "@/schema/createTravelSchema";
import { Button, Field, Input, Label, Textarea } from "@headlessui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import React, { useState } from "react";
import { FieldErrors, useForm } from "react-hook-form";
import { toast } from "react-toastify";

interface Stop {
    "Stop Start Location": string;
    "Stop Start Date": Date;
    "Stop End Location": string;
    "Stop End Date": Date;
}

interface FormData {
    title: string;
    startLocation: string;
    startDate: Date;
    endLocation: string;
    endDate: Date;
    description: string;
    travel_img: string;
    stops?: Stop[];
}

const CreateTravel = () => {
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<FormData>({
        resolver: yupResolver(validationCreateTravelSchema),
    });

    const [stops, setStops] = useState<Stop[]>([]);

    const addStop = () => {
        const fields: Stop = {
            "Stop Start Location": "",
            "Stop Start Date": new Date(),
            "Stop End Location": "",
            "Stop End Date": new Date(),
        };
        setStops([...stops, fields]);
    };

    const onSubmit = async (data: FormData) => {
        console.log("data :>> ", data);
    };

    const removeStop = (index: number) => {
        const updatedStops = [...stops];
        updatedStops.splice(index, 1);
        setStops(updatedStops);
    };

    function getRegisterName(groupIndex: number, fieldLabel: string): string {
        return `stops.${groupIndex}.${fieldLabel}`;
    }

    function getStopError(errors: FieldErrors<FormData>, index: number, field: keyof Stop) {
        return errors?.stops?.[index]?.[field];
    }

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
                    setValue("travel_img", reader.result);
                }
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="m-10 p-5 shadow-[0px_0px_20px_0px_rgba(0,0,0,0.1)] rounded">
            <p className="text-xl font-semibold">Create Travel</p>
            <form onSubmit={handleSubmit(onSubmit)} className="mt-10 space-y-5">
                <div className="space-y-4">
                    <Field className={"flex flex-col gap-y-1"}>
                        <Label className={"text-lg font-normal"}>Title</Label>
                        <Input
                            {...register("title")}
                            className={
                                "h-10 rounded px-4 data-[focus]:border-none data-[focus]:outline-none text-base bg-secondary"
                            }
                            type="text"
                            placeholder="Enter travel title"
                        />
                        {errors.title && (
                            <p className="text-red-500">
                                {errors.title.message}
                            </p>
                        )}
                    </Field>
                    <Field className={"flex flex-col gap-y-1"}>
                        <Label className={"text-lg font-normal"}>
                            Travel Image
                        </Label>
                        <Input
                            onChange={handleFile}
                            className={
                                "py-1  bg-secondary rounded px-4 data-[focus]:border-none data-[focus]:outline-none text-base"
                            }
                            type="file"
                            accept="image/jpeg, image/png"
                        />
                        {errors.travel_img && (
                            <p className="text-red-500">
                                {errors.travel_img.message}
                            </p>
                        )}
                    </Field>
                    <Field className={"flex flex-col gap-y-1"}>
                        <Label className={"text-lg font-normal"}>
                            Start Location
                        </Label>
                        <Input
                            {...register("startLocation")}
                            className={
                                "h-10 rounded px-4 data-[focus]:border-none data-[focus]:outline-none text-base bg-secondary"
                            }
                            type="text"
                            placeholder="Enter your start location"
                        />
                        {errors.startLocation && (
                            <p className="text-red-500">
                                {errors.startLocation.message}
                            </p>
                        )}
                    </Field>
                    <Field className={"flex flex-col gap-y-1"}>
                        <Label className={"text-lg font-normal"}>
                            Start Date
                        </Label>
                        <Input
                            {...register("startDate")}
                            className={
                                "h-10 rounded px-4 data-[focus]:border-none data-[focus]:outline-none text-base bg-secondary"
                            }
                            type="date"
                        />
                        {errors.startDate && (
                            <p className="text-red-500">
                                {errors.startDate.message}
                            </p>
                        )}
                    </Field>
                    <Field className={"flex flex-col gap-y-1"}>
                        <Label className={"text-lg font-normal"}>
                            End Location
                        </Label>
                        <Input
                            {...register("endLocation")}
                            className={
                                "h-10 rounded px-4 data-[focus]:border-none data-[focus]:outline-none text-base bg-secondary"
                            }
                            type="text"
                            placeholder="Enter your start location"
                        />
                        {errors.endLocation && (
                            <p className="text-red-500">
                                {errors.endLocation.message}
                            </p>
                        )}
                    </Field>
                    <Field className={"flex flex-col gap-y-1"}>
                        <Label className={"text-lg font-normal"}>
                            End Date
                        </Label>
                        <Input
                            {...register("endDate")}
                            className={
                                "h-10 rounded px-4 data-[focus]:border-none data-[focus]:outline-none text-base bg-secondary"
                            }
                            type="date"
                        />
                        {errors.endDate && (
                            <p className="text-red-500">
                                {errors.endDate.message}
                            </p>
                        )}
                    </Field>
                </div>
                <div className="space-y-4">
                    {stops.map((group: Stop, groupIndex: number) => (
                        <div
                            key={groupIndex}
                            className="space-y-4 border-t py-4 border-primary"
                        >
                            <div className="flex items-center justify-end">
                                <Button
                                    type="button"
                                    onClick={() => removeStop(groupIndex)}
                                    className="h-10 rounded px-4 data-[focus]:border-none data-[focus]:outline-none text-base bg-primary text-white hover:opacity-80 w-max"
                                >
                                    - Remove Stop
                                </Button>
                            </div>
                            {Object.entries(group).map(
                                ([fieldLabel, fieldProps]) => (
                                    <Field
                                        className={"flex flex-col gap-y-1"}
                                        key={`${fieldLabel}_${groupIndex}`}
                                    >
                                        <Label
                                            className={"text-lg font-normal"}
                                        >
                                            {fieldLabel}
                                        </Label>
                                        <Input
                                            className={
                                                "h-10 rounded px-4 data-[focus]:border-none data-[focus]:outline-none text-base bg-secondary"
                                            }
                                            {...register(
                                                getRegisterName(
                                                    groupIndex,
                                                    fieldLabel
                                                ) as keyof FormData
                                            )}
                                            type={
                                                fieldLabel.includes("Date")
                                                    ? "date"
                                                    : "text"
                                            }
                                            placeholder={`Enter ${fieldLabel.toLowerCase()}`}
                                        />
                                        {getStopError(errors, groupIndex, fieldLabel as keyof Stop) && (
                                            <p className="text-red-500">
                                                {getStopError(errors, groupIndex, fieldLabel as keyof Stop)?.message}
                                            </p>
                                        )}
                                    </Field>
                                )
                            )}
                        </div>
                    ))}

                    {stops.length <= 2 && (
                        <Field className={"flex flex-col gap-y-1"}>
                            <Label className={"text-lg font-normal"}>
                                Add stops betweeen Start and End date (max 3
                                stops are allowed)
                            </Label>
                            <Button
                                type="button"
                                onClick={addStop}
                                className="h-10 rounded px-4 data-[focus]:border-none data-[focus]:outline-none text-base bg-primary text-white hover:opacity-80"
                            >
                                + Add Stops
                            </Button>
                        </Field>
                    )}
                </div>
                <Field className={"flex flex-col gap-y-1"}>
                    <Label className={"text-lg font-normal"}>
                        Description
                    </Label>
                    <Textarea
                        {...register('description')}
                        className={
                            "rounded p-4 data-[focus]:border-none data-[focus]:outline-none text-base bg-secondary"
                        }
                        placeholder="Enter travel description"
                        rows={10}
                    ></Textarea>
                    {errors.endDate && (
                        <p className="text-red-500">
                            {errors.endDate.message}
                        </p>
                    )}
                </Field>
                <Button
                    type="submit"
                    className="h-10 rounded px-4 data-[focus]:border-none data-[focus]:outline-none text-base bg-primary text-white hover:opacity-80"
                >
                    Create
                </Button>
            </form>
        </div>
    );
};

export default CreateTravel;
