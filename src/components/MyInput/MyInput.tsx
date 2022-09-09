import React, {FC, useEffect, useMemo} from 'react';
import classes from './MyInput.module.scss';
import {FormControl, InputLabel, MenuItem, Select, TextField} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../redux/store";
import {Currency, currencyCode, CurrencyType} from "../../intefaces/Interfaces";
import {setGetCurrencyCode, setGetInputValue, setGiveCurrencyCode, setGiveInputValue} from "../../redux/app/app";

interface MyInputProps {
    location: 'give' | 'get';
}
const MyInput:FC<MyInputProps> = ({ location}) => {
    const currency = useSelector((state: RootState) => state.currency.currency);
    const giveCurrencyType = useSelector((state: RootState) => state.app.giveCurrencyType);
    const currencyFilter = useSelector((state: RootState) => state.currency.currencyFilter);
    const giveCurrencyCode = useSelector((state: RootState) => state.app.giveCurrencyCode);
    const getCurrencyType = useSelector((state: RootState) => state.app.getCurrencyType);
    const getCurrencyCode = useSelector((state: RootState) => state.app.getCurrencyCode);
    const giveInputValue = useSelector((state: RootState) => state.app.giveInputValue);
    const getInputValue = useSelector((state: RootState) => state.app.getInputValue);
    const currencyMultiplier = useSelector((state: RootState) => state.app.currencyMultiplier);
    const dispatch = useDispatch();
    const getCurrency = (code: currencyCode) => {
        return currency.find((c) => c.code === code);
    }

    const currencyForSelect = useMemo(() => {
        let result = currency;
        if (location === 'give') {
            if (giveCurrencyType !== CurrencyType.ALL) {
                result = result.filter((c) => c.category === giveCurrencyType);
            }
            if (result.length === 0) {
                result.push({code: 'К сожалению это пока невозможно', name: 'К сожалению это пока невозможно'})
            }
            return result;
        } else {
            if (!giveCurrencyCode) {
                return [{code: 'Необходимо выбрать первую валюту', name: 'Необходимо выбрать первую валюту'}]
            } else {
                if (getCurrencyType !== CurrencyType.ALL) {
                    result = result.filter((c) => c.category === getCurrencyType);
                }
                const chosenGiveCurrency = currencyFilter.find((filter) => filter.from.code === giveCurrencyCode);
                const possibleToCode = chosenGiveCurrency?.to.map((to) => to.code);
                result = result.filter((filter) => possibleToCode?.includes(filter.code)) || [];
                if (result.length === 0) {
                    result.push({code: 'К сожалению это пока невозможно', name: 'К сожалению это пока невозможно'})
                }
                return result;
            }
        }
    }, [giveCurrencyType, getCurrencyType, giveCurrencyCode, getCurrencyCode]);

    useEffect(() => {
        if (location === 'give') {
            const possibleFromCurrencyCode = currencyForSelect.map(currency => currency.code);
            if (giveCurrencyCode && !possibleFromCurrencyCode.includes(giveCurrencyCode)) {
                dispatch(setGiveCurrencyCode(''));
                dispatch(setGetInputValue(''))
            } else if (giveInputValue && currencyMultiplier) {
                dispatch(setGetInputValue(String(parseFloat(giveInputValue) / currencyMultiplier)))
            }
        } else {
            const possibleToCurrencyCode = currencyForSelect.map(currency => currency.code);
            if (getCurrencyCode && !possibleToCurrencyCode.includes(getCurrencyCode)) {
                dispatch(setGetCurrencyCode(''));
                dispatch(setGetInputValue(''));
            }
        }
    }, [currencyForSelect])


    useEffect(() => {
        if (!getCurrencyCode) {
            dispatch(setGetInputValue(''))
        }
    }, [getCurrencyCode])

    // @ts-ignore
    const changeCurrencyCode = (code) => {
        if (location === 'give') {
            dispatch(setGiveCurrencyCode(code));
        } else {
            dispatch(setGetCurrencyCode(code));
        }
    }
    // @ts-ignore
    const changeCurrencyInputValue = (value) => {
        if (location === 'give') {
            dispatch(setGiveInputValue(value));
        } else {
            dispatch(setGetInputValue(value));
        }
    }
    const getCurrencyName = () => {
        if (location === 'give' && giveCurrencyCode) {
            return getCurrency(giveCurrencyCode)?.name;
        } else if (location === 'get' && getCurrencyCode) {
            return getCurrency(getCurrencyCode)?.name;
        }
        return '';
    }
    return (
        <div className={classes.container}>
            <div className={classes.inputContainer}>
                <TextField id="outlined-basic" value={location === 'give' ? giveInputValue || '' : getInputValue || ''} onChange={(event) => changeCurrencyInputValue(event.target.value)} variant="outlined" label={getCurrencyName() || 'Выберите валюту'} className={classes.input} type={'number'} />
            </div>
            <FormControl className={classes.select}>
                <InputLabel id="demo-simple-select-label">Валюта</InputLabel>
                <Select
                    //labelId="demo-simple-select-label"
                    //id="demo-simple-select"
                    //value={age}
                    label="Валюта"
                    onChange={(value) => changeCurrencyCode(value.target?.value)}
                >
                    {currencyForSelect.map(c => <MenuItem disabled={c.code === 'К сожалению это пока невозможно' || c.code === 'Необходимо выбрать первую валюту'} key={c.code} value={c.code}>{c.name}</MenuItem>)}
                </Select>
            </FormControl>
        </div>
    );
};

export default MyInput;

