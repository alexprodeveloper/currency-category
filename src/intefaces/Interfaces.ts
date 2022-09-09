export interface Currency {
    code: string;
    name: string;
    category?: CurrencyType;
}

export interface CurrencyFilter {
    from: Currency;
    to: Currency[];
}

export enum CurrencyType {
    ALL = 'Все',
    CRYPTOCURRENCY = 'Криптовалюта',
    CASH = 'Наличные',
    RUS_BANKS = 'Банки rus',
    UAH_BANKS = 'Банки uah',
}

export type currencyCode = 'BTC' | 'ETH' | 'CASHUSD' | 'CASHRUB' | 'ACRUB' | 'SBERRUB' | 'TCSBRUB' | 'USDTTRC' | '';

export enum CurrencyCodeForFetch {
    RUB = 'rub',
    USD = 'usd',
}

