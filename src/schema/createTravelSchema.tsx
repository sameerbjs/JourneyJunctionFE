import * as Yup from "yup";

const stopSchema = Yup.object().shape({
    "Stop Start Location": Yup.string().required('Start location is required'),
    "Stop Start Date": Yup.date().required('Start date is required').typeError("Start date is required"),
    "Stop End Location": Yup.string().required('End location is required'),
    "Stop End Date": Yup.date().required('End date is required').typeError("End date is required"),
});

const validationCreateTravelSchema = Yup.object().shape({
    title: Yup.string().required("Title is required"),
    description: Yup.string().required("Description is required"),
    startLocation: Yup.string().required("Start location is required"),
    startDate: Yup.date().required("Start date is required").typeError("Start date is required"),
    endLocation: Yup.string().required("End location is required"),
    endDate: Yup.date().required("End date is required").typeError("End date is required"),
    stops: Yup.array().of(stopSchema).max(3, 'Maximum of 3 stops allowed'),
    travel_img: Yup.string().trim().required("Travel image is required."),
});

export default validationCreateTravelSchema;
