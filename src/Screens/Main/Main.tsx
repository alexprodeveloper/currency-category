import React, {FC, useMemo} from 'react';
import classes from './Main.module.scss';
import CategoryRow from "../../components/CategoryRow/CategoryRow";
import MyInput from "../../components/MyInput/MyInput";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../redux/store";
import {currencyCode, CurrencyType} from "../../intefaces/Interfaces";
import {setGetCurrencyCode, setGetInputValue, setGiveCurrencyCode, setGiveInputValue} from '../../redux/app/app';

interface MainProps {

}
const Main:FC<MainProps> = ({}) => {
    const giveInputValue = useSelector((state: RootState) => state.app.giveInputValue);
    const getInputValue = useSelector((state: RootState) => state.app.getInputValue);
    return (
        <div className={classes.container}>
            <main className={classes.currencyContainer}>
                <p className={classes.heading}>Вы отдаете</p>
                <CategoryRow location={'give'} key={'giveCategoryRow'} />
                <MyInput location={'give'} inputValue={giveInputValue} />
                <p className={`${classes.heading} ${classes.offset}`}>Вы получаете</p>
                <CategoryRow location={'get'} key={'getCategoryRow'} />
                <MyInput location={'get'} inputValue={getInputValue} />
            </main>
        </div>
    );
};

export default Main;
