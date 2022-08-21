import React from "react";
import PropTypes from "prop-types";
import { getDate } from "../../utils/getDate";
import UserInfoItem from "./userInfoItem";
import { useCurrencies } from "../../hooks/useCurrency";

const UserInfo = ({
    cash,
    email,
    firstName,
    lastName,
    phone,
    sex,
    createdAt,
    updatedAt,
    locality,
    street,
    homeNumber,
    flatNumber
}) => {
    const createdDate = getDate(createdAt);
    const updatedDate = getDate(updatedAt);
    const { getConvertPrice, selectedCurrency } = useCurrencies();
    return (
        <div className="d-flex flex-column">
            <UserInfoItem title="Имя" value={firstName} />
            {lastName && <UserInfoItem title="Фамилия" value={lastName} />}
            <UserInfoItem title="Email" value={email} />
            <UserInfoItem
                title="Денежные средства"
                value={`${getConvertPrice(cash)} ${selectedCurrency.symbol}`}
            />
            <UserInfoItem title="Номер телефона" value={phone} />
            <UserInfoItem title="Пол" value={sex} />
            {locality && (
                <UserInfoItem title="Населенный пункт" value={locality} />
            )}
            {street && <UserInfoItem title="Улица" value={street} />}
            {homeNumber && (
                <UserInfoItem title="Номер дома" value={homeNumber} />
            )}
            {flatNumber && (
                <UserInfoItem title="Номер квартиры" value={flatNumber} />
            )}
            <UserInfoItem title="Профиль создан" value={createdDate} />
            <UserInfoItem title="Профиль обновлен" value={updatedDate} />
        </div>
    );
};

UserInfo.propTypes = {
    cash: PropTypes.number,
    email: PropTypes.string,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    phone: PropTypes.string,
    sex: PropTypes.string,
    createdAt: PropTypes.string,
    updatedAt: PropTypes.string,
    locality: PropTypes.string,
    street: PropTypes.string,
    homeNumber: PropTypes.string,
    flatNumber: PropTypes.string
};

export default UserInfo;
