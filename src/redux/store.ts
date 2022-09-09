import {configureStore} from '@reduxjs/toolkit'
import {currencySlice} from "./currency/currency";
import {appSlice} from "./app/app";

export const store = configureStore({
    reducer: {
        currency: currencySlice.reducer,
        app: appSlice.reducer,
    },
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
