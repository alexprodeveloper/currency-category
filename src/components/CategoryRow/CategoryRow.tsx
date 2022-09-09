import React, {FC} from 'react';
import classes from './CategoryRow.module.scss';
import {CurrencyType} from "../../intefaces/Interfaces";
import {useDispatch, useSelector} from "react-redux";
import {setGetCurrencyType, setGiveCurrencyType} from '../../redux/app/app';
import {RootState} from "../../redux/store";

interface CategoryRowProps {
    location: 'give' | 'get';
}
const CategoryRow:FC<CategoryRowProps> = ({location}) => {
    const dispatch = useDispatch();
    const giveCurrencyType = useSelector((state: RootState) => state.app.giveCurrencyType);
    const getCurrencyType = useSelector((state: RootState) => state.app.getCurrencyType);
    const changeCurrencyType = (type: CurrencyType) => {
        if (location === 'give') {
            dispatch(setGiveCurrencyType(type));
        } else {
            dispatch(setGetCurrencyType(type));
        }
    }
    const isOptionSelected = (type: CurrencyType) => {
        if (location === 'give') {
            return type === giveCurrencyType;
        } else {
            return type === getCurrencyType;
        }
    }
    return (
        <div className={classes.container}>
            <p className={`${classes.category} ${isOptionSelected(CurrencyType.ALL) && classes.categorySelected}`} onClick={() => changeCurrencyType(CurrencyType.ALL)}>{CurrencyType.ALL}</p>
            <p className={`${classes.category} ${isOptionSelected(CurrencyType.CRYPTOCURRENCY) && classes.categorySelected}`} onClick={() => changeCurrencyType(CurrencyType.CRYPTOCURRENCY)}>{CurrencyType.CRYPTOCURRENCY}</p>
            <p className={`${classes.category} ${isOptionSelected(CurrencyType.CASH) && classes.categorySelected}`} onClick={() => changeCurrencyType(CurrencyType.CASH)}>{CurrencyType.CASH}</p>
            <p className={`${classes.category} ${isOptionSelected(CurrencyType.RUS_BANKS) && classes.categorySelected}`} onClick={() => changeCurrencyType(CurrencyType.RUS_BANKS)}>{CurrencyType.RUS_BANKS}</p>
            <p className={`${classes.category} ${isOptionSelected(CurrencyType.UAH_BANKS) && classes.categorySelected}`} onClick={() => changeCurrencyType(CurrencyType.UAH_BANKS)}>{CurrencyType.UAH_BANKS}</p>
        </div>
    );
};

export default CategoryRow;
