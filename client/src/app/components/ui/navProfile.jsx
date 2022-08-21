import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { getCurrentUserData } from "../../store/users";
import Loader from "../common/loader";
import { useCurrencies } from "../../hooks/useCurrency";

function NavProfile() {
    const currentUser = useSelector(getCurrentUserData());
    const { getConvertPrice, selectedCurrency } = useCurrencies();
    const [isOpen, setOpen] = useState(false);
    const toggleMenu = () => {
        setOpen((prevState) => !prevState);
    };
    const handleClose = () => {
        if (isOpen) {
            setTimeout(() => {
                setOpen(false);
            }, 1000);
        }
    };
    if (!currentUser) {
        return <Loader />;
    }
    return (
        <div
            className="dropdown my-auto"
            onClick={toggleMenu}
            onMouseLeave={handleClose}
        >
            <div className="btn dropdown-toggle d-flex align-items-center">
                <div className="d-flex flex-column gap-1">
                    <div>
                        <i className="bi bi-person"></i>
                        <span>{currentUser.firstName}</span>
                    </div>
                    <div>
                        <span className="fw-bold">{`${getConvertPrice(
                            currentUser.cash
                        )} ${selectedCurrency.symbol}`}</span>
                    </div>
                </div>
            </div>
            <div className={"w-100 dropdown-menu" + (isOpen ? " show" : "")}>
                <Link to={"/cabinet/personal"} className="dropdown-item">
                    Личный кабинет
                </Link>
                <Link to="/logout" className="dropdown-item">
                    Выйти
                </Link>
            </div>
        </div>
    );
}

export default NavProfile;
