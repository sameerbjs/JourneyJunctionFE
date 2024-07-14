import { combineReducers } from "@reduxjs/toolkit";
import auth from "./slices/authSlice";
import travel from "./slices/travelSlice";

export type RootState = ReturnType<typeof rootReducer>;
const rootReducer = combineReducers({
    auth,
    travel
});

export default rootReducer;
