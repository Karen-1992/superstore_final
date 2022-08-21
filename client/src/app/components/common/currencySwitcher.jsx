import React, { useState } from "react";
import { useCurrencies } from "../../hooks/useCurrency";

const CurrencySwitcher = () => {
    const { selectedCurrency, currencies, onSelectCurrency } = useCurrencies();
    const [isOpen, setOpen] = useState(false);
    const toggleMenu = () => {
        setOpen((prevState) => !prevState);
    };
    const handleSelectCurrency = (currency) => {
        onSelectCurrency(currency);
    };
    const handleClose = () => {
        if (isOpen) {
            setTimeout(() => {
                setOpen(false);
            }, 1000);
        }
    };
    return (
        <div
            className="dropdown my-auto"
            onClick={toggleMenu}
            onMouseLeave={handleClose}
        >
            <div className="btn dropdown-toggle d-flex align-items-center">
                <span className="fs-4">{selectedCurrency?.symbol}</span>
            </div>
            <div className={"dropdown-menu" + (isOpen ? " show" : "")}>
                {currencies.map((currency) => (
                    <span
                        className="dropdown-item"
                        key={currency.label}
                        onClick={() => handleSelectCurrency(currency)}
                    >
                        {currency.symbol}
                    </span>
                ))}
            </div>
        </div>
    );
};

export default CurrencySwitcher;
