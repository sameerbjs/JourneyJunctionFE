import { combineReducers } from "@reduxjs/toolkit";
import auth from "./slices/authSlice";

export type RootState = ReturnType<typeof rootReducer>;
const rootReducer = combineReducers({
    auth,
});

export default rootReducer;
