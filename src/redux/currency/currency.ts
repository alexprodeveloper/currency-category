import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import {Currency, CurrencyFilter} from "../../intefaces/Interfaces";
import {currency, currencyFilter} from "../../data/currency";

interface State {
    currency: Currency[];
    currencyFilter: CurrencyFilter[];
}

const initialState: State = {
    currency: currency,
    currencyFilter: currencyFilter,
}

export const currencySlice = createSlice({
    name: 'currency',
    initialState,
    reducers: {
    },
})

export const { } = currencySlice.actions

