import React, {FC, useEffect, useMemo} from 'react';
import classes from './Main.module.scss';
import CategoryRow from "../../components/CategoryRow/CategoryRow";
import MyInput from "../../components/MyInput/MyInput";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../redux/store";
import {currencyCode, CurrencyType} from "../../intefaces/Interfaces";
import {setCurrencyMultiplier, setGiveInputValue, setGetInputValue} from '../../redux/app/app';
import CurrencyService from "../../services/CurrencyService";

interface MainProps {

}

const Main: FC<MainProps> = ({}) => {
    const giveCurrencyCode = useSelector((state: RootState) => state.app.giveCurrencyCode);
    const getCurrencyCode = useSelector((state: RootState) => state.app.getCurrencyCode);
    const giveInputValue = useSelector((state: RootState) => state.app.giveInputValue);
    const getInputValue = useSelector((state: RootState) => state.app.getInputValue);
    const currencyMultiplier = useSelector((state: RootState) => state.app.currencyMultiplier);
    const dispatch = useDispatch();
    useEffect(() => {
        if (giveCurrencyCode && getCurrencyCode) {
            const getRate = async () => {
                const response = await CurrencyService.getCurrencyRate(getCurrencyCodeForResponse(giveCurrencyCode), getCurrencyCodeForResponse(getCurrencyCode))
                if (response.result) {
                    dispatch(setCurrencyMultiplier(response.result));
                }
                if (giveInputValue) {
                    dispatch(setGetInputValue(String(parseFloat(giveInputValue || '0') * response.result)))
                }
            }
            getRate();
        }

    }, [giveCurrencyCode, getCurrencyCode]);
    useEffect(() => {
        if (giveInputValue) {
            dispatch(setGetInputValue(String(parseFloat(giveInputValue || '0') * currencyMultiplier)))
        }
    }, [currencyMultiplier, giveInputValue]);
    useEffect(() => {
        if (currencyMultiplier && getInputValue !== '0' && giveInputValue) {
            dispatch(setGiveInputValue(String(parseFloat(getInputValue || '0') / currencyMultiplier)));
        }
    }, [getInputValue])
    const getCurrencyCodeForResponse = (code: currencyCode) => {
        switch (code) {
            case "CASHRUB":
            case "SBERRUB":
            case "TCSBRUB":
            case "ACRUB":
                return 'RUB';
            case "BTC":
                return 'BTC';
            case "CASHUSD":
                return 'USD';
            case "ETH":
                return 'ETH';
            case "USDTTRC":
                return 'USDTTRC';
            default:
                return 'USD';
        }
    }
    return (
        <div className={classes.container}>
            <main className={classes.currencyContainer}>
                <p className={classes.heading}>Вы отдаете</p>
                <CategoryRow location={'give'} key={'giveCategoryRow'}/>
                <MyInput location={'give'}/>
                <p className={`${classes.heading} ${classes.offset}`}>Вы получаете</p>
                <CategoryRow location={'get'} key={'getCategoryRow'}/>
                <MyInput location={'get'}/>
            </main>
        </div>
    );
};

export default Main;
