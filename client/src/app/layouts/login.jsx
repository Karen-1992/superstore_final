import React, { useState } from "react";
import { useParams } from "react-router-dom";
import LoginForm from "../components/ui/forms/loginForm";
import RegisterForm from "../components/ui/forms/registerForm";

const Login = () => {
    const { type } = useParams();
    const [formType, setFormType] = useState(
        type === "register" ? type : "login"
    );
    const toggleFormType = () => {
        setFormType((prevState) =>
            prevState === "register" ? "login" : "register"
        );
    };

    return (
        <div className="container my-5 pb-5">
            <div className="row">
                <div className="col-md-6 offset-md-3 bg-body rounded shadow p-4">
                    {formType === "register" ? (
                        <>
                            <h3 className="mb-4">Регистрация</h3>
                            <RegisterForm />
                            <p>
                                Есть аккаунт?{" "}
                                <a
                                    className=""
                                    role="button"
                                    onClick={toggleFormType}
                                >
                                    {" "}
                                    Войти
                                </a>
                            </p>
                        </>
                    ) : (
                        <>
                            <h3 className="mb-4">Авторизация</h3>
                            <LoginForm />
                            <p>
                                Новый пользователь?{" "}
                                <a
                                    className=""
                                    role="button"
                                    onClick={toggleFormType}
                                >
                                    {" "}
                                    Зарегистрируйтесь
                                </a>
                            </p>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Login;
