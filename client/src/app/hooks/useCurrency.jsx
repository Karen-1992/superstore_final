import React, { useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import localStorageService from "../services/localStorage.service";
import rates from "../constants/rates";

const CurrenciesContext = React.createContext();

export const useCurrencies = () => {
    return useContext(CurrenciesContext);
};

export const CurrenciesProvider = ({ children }) => {
    const initCurrency = !localStorageService.getCurrency()
        ? localStorageService.setCurrency(rates[0])
        : localStorageService.getCurrency();
    const [selectedCurrency, setSelectedCurrency] = useState(initCurrency);
    const [currencies, setCurrencies] = useState([]);
    useEffect(() => {
        setCurrencies(rates);
    }, []);
    const onSelectCurrency = (selectedCurrency) => {
        setSelectedCurrency(selectedCurrency);
        localStorageService.setCurrency(selectedCurrency);
    };
    function getConvertPrice(value) {
        return Math.round(value * selectedCurrency.rate);
    }

    return (
        <CurrenciesContext.Provider
            value={{
                currencies,
                selectedCurrency,
                onSelectCurrency,
                getConvertPrice
            }}
        >
            {children}
        </CurrenciesContext.Provider>
    );
};

CurrenciesProvider.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};
