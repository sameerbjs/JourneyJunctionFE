import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../rootReducer";
import Api from "@/services/api";
import NotificationService from "@/services/notification";

interface UserClass {
    _id: string | null;
    full_name: string | null;
    email: string | null;
    country: string | null;
    state: string | null;
    profile_img: string | null;
}

interface User {
    user: UserClass;
    token: string | null;
    auth: boolean;
}

interface UserData {
    data: User | null;
    isLoading: boolean;
}

const initialState: UserData = {
    data: {
        user: {
            _id: null,
            full_name: null,
            email: null,
            country: null,
            state: null,
            profile_img: null,
        },
        token: null,
        auth: false,
    },
    isLoading: false,
};

interface Query {
    [key: string]: any;
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setLoading: (state: UserData, { payload }: PayloadAction<boolean>) => {
            state.isLoading = payload;
        },
        setUserData: (state: UserData, { payload }: PayloadAction<any>) => {
            state.data = payload;
        },
        setUserUpdateData: (
            state: UserData,
            { payload }: PayloadAction<any>
        ) => {
            if (state.data) {
                state.data.user = payload;
            }
        },
        setLogout: (state: UserData) => initialState,
    },
});

export const userRegister = (query: Query) => async (dispatch: any) => {
    dispatch(setLoading(true));
    const json = await Api.registerUser(query);
    if (json.status === 200) {
        dispatch(setLoading(false));
        NotificationService.success(`User registered successfully`);
    } else {
        dispatch(setLoading(false));
        NotificationService.error(json.data.message);
    }
    return json;
};

export const userLogin = (query: Query) => async (dispatch: any) => {
    dispatch(setLoading(true));
    const json = await Api.loginUser(query);
    if (json.status === 200) {
        dispatch(setLoading(false));
        dispatch(setUserData(json.data));
        NotificationService.success(`User login successfully`);
    } else {
        dispatch(setLoading(false));
        NotificationService.error(json.data.message);
    }
    return json;
};

export const updatePassword =
    (query: Query, id: string) => async (dispatch: any) => {
        dispatch(setLoading(true));
        const json = await Api.updatePassword(query, id);
        if (json.status === 200) {
            dispatch(setLoading(false));
            NotificationService.success(`Password update successfully`);
        } else {
            dispatch(setLoading(false));
            NotificationService.error(json.data.message);
        }
        return json;
    };

export const updateProfileImage =
    (query: Query, id: string) => async (dispatch: any) => {
        dispatch(setLoading(true));
        const json = await Api.updateProfileImage(query, id);
        if (json.status === 200) {
            dispatch(setLoading(false));
            dispatch(setUserUpdateData(json.data.user));
            NotificationService.success(`Profile image update successfully`);
        } else {
            dispatch(setLoading(false));
            NotificationService.error(json.data.message);
        }
        return json;
    };

export const updateProfile =
    (query: Query, id: string) => async (dispatch: any) => {
        dispatch(setLoading(true));
        const json = await Api.updateProfile(query, id);
        if (json.status === 200) {
            dispatch(setLoading(false));
            dispatch(setUserUpdateData(json.data.user));
            NotificationService.success(`Profile update successfully`);
        } else {
            dispatch(setLoading(false));
            NotificationService.error(json.data.message);
        }
        return json;
    };

export const { setLoading, setUserData, setLogout, setUserUpdateData } =
    authSlice.actions;

export const userSelector = (state: RootState) => state.auth;
export default authSlice.reducer;
