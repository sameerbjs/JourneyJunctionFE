import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../rootReducer";
import Api from "@/services/api";
import NotificationService from "@/services/notification";



interface Travel {
    _id: string;
    user: User;
    title: string;
    startLocation: string;
    startDate: Date;
    endLocation: string;
    endDate: Date;
    description: string;
    travel_img: string;
    stops: Stop[];
    createdAt: Date;
    updatedAt: Date;
    __v: number;
}

interface Stop {
    "Stop Start Location": string;
    "Stop Start Date": Date;
    "Stop End Location": string;
    "Stop End Date": Date;
    _id: string;
}

interface User {
    _id: string;
    full_name: string;
    email: string;
    profile_img: string;
    country: string;
    state: string;
}

interface TravelData {
    isLoading: boolean;
    travels: Travel[];
}

const initialState: TravelData = {
    isLoading: false,
    travels: []
};



interface Query {
    [key: string]: any;
}

const travelSlice = createSlice({
    name: "travel",
    initialState,
    reducers: {
        setLoading: (state: TravelData, { payload }: PayloadAction<any>) => {
            state.isLoading = payload;
        },
        setUserTravel: (state: TravelData, { payload }: PayloadAction<any>) => {
            state.travels = payload.travels;
        },
    },
});

export const createTravel = (query: Query) => async (dispatch: any) => {
    dispatch(setLoading(true));
    const json = await Api.createTravel(query);
    if (json?.status === 200) {
        dispatch(setLoading(false));
        NotificationService.success(`Travel create successfully`);
    } else {
        dispatch(setLoading(false));
        NotificationService.error(json.data.message);
    }
    return json;
};

export const getUserTravel = (id: string) => async (dispatch: any) => {
    dispatch(setLoading(true));
    const json = await Api.getUserTravel(id);
    if (json?.status === 200) {
        dispatch(setLoading(false));
        dispatch(setUserTravel({ travels: json?.data?.travels }))
    } else {
        dispatch(setLoading(false));
        NotificationService.error('Failed to fetch travels');
    }
    return json;
}

export const { setLoading, setUserTravel } =
    travelSlice.actions;

export const travelSelector = (state: RootState) => state.travel;
export default travelSlice.reducer;
