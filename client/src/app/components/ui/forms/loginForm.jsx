import React, { useEffect, useState } from "react";
import { validator } from "../../../utils/validator";
import TextField from "../../common/form/textField";
import CheckBoxField from "../../common/form/checkBoxField";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAuthErrors, login } from "../../../store/users";
import localStorageService from "../../../services/localStorage.service";

const LoginForm = () => {
    const userData = localStorageService.getUserData();
    const initialData = userData
        ? {
            email: userData.email,
            password: userData.password,
            stayOn: userData.stayOn
        }
        : {
            email: "",
            password: "",
            stayOn: false
        };
    const [data, setData] = useState(initialData);
    const loginError = useSelector(getAuthErrors());
    const history = useHistory();
    const dispatch = useDispatch();
    const [errors, setErrors] = useState({});
    const handleChange = (target) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };

    const validatorConfig = {
        email: {
            isRequired: {
                message: "isRequired"
            }
        },
        password: {
            isRequired: {
                message: "isRequired"
            }
        }
    };
    useEffect(() => {
        validate();
    }, [data]);
    const validate = () => {
        const errors = validator(data, validatorConfig);
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };
    const isValid = Object.keys(errors).length === 0;

    const handleSubmit = (e) => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return;
        if (data.stayOn) {
            localStorageService.setUserData(data);
        } else {
            localStorageService.removeUserData();
        }
        const redirect = history.location.state
            ? history.location.state.from.pathname
            : "/";
        dispatch(login({ payload: data, redirect }));
    };
    return (
        <form onSubmit={handleSubmit}>
            <TextField
                label="Электронная почта"
                name="email"
                value={data.email}
                onChange={handleChange}
                error={errors.email}
            />
            <TextField
                label="Пароль"
                type="password"
                name="password"
                value={data.password}
                onChange={handleChange}
                error={errors.password}
            />
            <CheckBoxField
                value={data.stayOn}
                onChange={handleChange}
                name="stayOn"
            >
                Оставаться в системе
            </CheckBoxField>
            {loginError && <p className="text-danger">{loginError}</p>}
            {!isValid && (
                <p>
                    <span className="text-danger">*</span>
                    Поле обязательно для заполнения
                </p>
            )}
            <button
                className="btn btn-primary w-100 mx-auto"
                type="submit"
                disabled={!isValid}
            >
                Войти
            </button>
        </form>
    );
};

export default LoginForm;
