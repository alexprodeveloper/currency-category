import {CurrencyCodeForFetch} from "../intefaces/Interfaces";

export default class CurrencyService {
    public static async getCurrencyRate(fromCurrencyCode: string, toCurrencyCode: string) {
        const result = await fetch(`https://api.exchangerate.host/convert?from=${fromCurrencyCode}&to=${toCurrencyCode}`, {
            method: 'GET',
            headers: {'Content-type': 'application/json'},
        })
        return result.json();
    }
}
