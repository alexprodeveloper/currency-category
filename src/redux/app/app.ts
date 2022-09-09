import type {PayloadAction} from '@reduxjs/toolkit'
import {createSlice} from '@reduxjs/toolkit'
import {currencyCode, CurrencyType} from "../../intefaces/Interfaces";

interface State {
    giveInputValue?: string;
    getInputValue?: string;
    giveCurrencyCode?: currencyCode;
    getCurrencyCode?: currencyCode;
    giveCurrencyType: CurrencyType;
    getCurrencyType: CurrencyType;
}

const initialState: State = {
    giveCurrencyType: CurrencyType.ALL,
    getCurrencyType: CurrencyType.ALL,
}

export const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        setGiveInputValue: (state, action: PayloadAction<string>) => {
            state.giveInputValue = action.payload;
        },
        setGetInputValue: (state, action: PayloadAction<string>) => {
            state.getInputValue = action.payload;
        },
        setGiveCurrencyCode: (state, action: PayloadAction<currencyCode>) => {
            state.giveCurrencyCode = action.payload;
        },
        setGetCurrencyCode: (state, action: PayloadAction<currencyCode>) => {
            state.getCurrencyCode = action.payload;
        },
        setGetCurrencyType: (state, action: PayloadAction<CurrencyType>) => {
            state.getCurrencyType = action.payload;
        },
        setGiveCurrencyType: (state, action: PayloadAction<CurrencyType>) => {
            state.giveCurrencyType = action.payload;
        }
    },
})

export const { setGiveInputValue, setGetInputValue, setGiveCurrencyCode, setGetCurrencyCode, setGetCurrencyType, setGiveCurrencyType } = appSlice.actions
