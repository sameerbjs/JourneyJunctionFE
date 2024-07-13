"use client";

import { Provider } from "react-redux";
import { persistor, store } from "./store";
import { PersistGate } from "redux-persist/integration/react";
import notification from "@/services/notification";
import Header from "@/components/Header";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Api from "@/services/api";

export function Providers({ children }: { children: React.ReactNode }) {

    const pathName = usePathname();
    const token = store.getState().auth.data?.token;

    useEffect(()=>{
       Api.setClientToken(token || '');
    },[pathName])
    return (
        <PersistGate loading={null} persistor={persistor}>
            <Provider store={store}>
                <div className="relative min-h-screen flex flex-col">
                    <Header />
                    {children}
                    {notification.render()}
                </div>
            </Provider>
        </PersistGate>
    );
}
