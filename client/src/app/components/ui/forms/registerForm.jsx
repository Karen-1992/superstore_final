import React, { useEffect, useState } from "react";
import { validator } from "../../../utils/validator";
import TextField from "../../common/form/textField";
import RadioField from "../../common/form/radioField";
import CheckBoxField from "../../common/form/checkBoxField";
import { useDispatch, useSelector } from "react-redux";
import { getAuthErrors, signUp } from "../../../store/users";

const RegisterForm = () => {
    const dispatch = useDispatch();
    const [data, setData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        sex: "мужской",
        locality: "",
        street: "",
        homeNumber: "",
        flatNumber: "",
        phone: "",
        licence: false
    });
    const [errors, setErrors] = useState({});
    const registerError = useSelector(getAuthErrors());
    const handleChange = (target) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };
    const validatorConfig = {
        firstName: {
            isRequired: {
                message: "isRequired"
            },
            min: {
                message: "Имя должно состоять минимум из 2 символов",
                value: 2
            }
        },
        email: {
            isRequired: {
                message: "isRequired"
            },
            isEmail: {
                message: "Email введен некорректно"
            }
        },
        phone: {
            isRequired: {
                message: "isRequired"
            }
        },
        locality: {
            isRequired: {
                message: "isRequired"
            }
        },
        street: {
            isRequired: {
                message: "isRequired"
            }
        },
        homeNumber: {
            isRequired: {
                message: "isRequired"
            }
        },
        flatNumber: {
            isRequired: {
                message: "isRequired"
            }
        },
        password: {
            isRequired: {
                message: "isRequired"
            },
            isCapitalSymbol: {
                message: "Пароль должен содержать хотя бы одну заглавную букву"
            },
            isContainDigit: {
                message: "Пароль должен содержать хотя бы одно число"
            },
            min: {
                message: "Пароль должен состоять минимум из 8 символов",
                value: 8
            }
        },
        licence: {
            isRequired: {
                message:
                    "Вы не можете использовать наш сервис без подтверждения лицензионного соглашения"
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
        dispatch(signUp(data));
    };
    return (
        <form onSubmit={handleSubmit}>
            <TextField
                label="Имя"
                name="firstName"
                value={data.firstName}
                onChange={handleChange}
                error={errors.firstName}
            />
            <TextField
                label="Фамилия"
                name="lastName"
                value={data.lastName}
                onChange={handleChange}
                error={errors.lastName}
            />
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
            <TextField
                label="Телефон"
                name="phone"
                value={data.phone}
                onChange={handleChange}
                error={errors.phone}
            />
            <RadioField
                options={[
                    { name: "мужской", value: "мужской" },
                    { name: "женский", value: "женский" }
                ]}
                value={data.sex}
                name="sex"
                onChange={handleChange}
                label="Выберите ваш пол"
            />
            <div className="d-flex justify-content-evenly gap-5">
                <TextField
                    label="Населенный пункт"
                    name="locality"
                    value={data.locality}
                    onChange={handleChange}
                    error={errors.locality}
                />
                <TextField
                    label="Улица"
                    name="street"
                    value={data.street}
                    onChange={handleChange}
                    error={errors.street}
                />
            </div>
            <div className="d-flex justify-content-evenly gap-5">
                <TextField
                    label="Дом"
                    name="homeNumber"
                    value={data.homeNumber}
                    onChange={handleChange}
                    error={errors.homeNumber}
                />
                <TextField
                    label="Квартира"
                    name="flatNumber"
                    value={data.flatNumber}
                    onChange={handleChange}
                    error={errors.flatNumber}
                />
            </div>
            <CheckBoxField
                value={data.licence}
                onChange={handleChange}
                name="licence"
                error={errors.licence}
            >
                Подтвердить <a>лицензионное соглашение</a>
            </CheckBoxField>
            {registerError && <p className="text-danger">{registerError}</p>}
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
                Зарегистрироваться
            </button>
        </form>
    );
};

export default RegisterForm;
