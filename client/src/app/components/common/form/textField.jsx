import React, { useState } from "react";
import PropTypes from "prop-types";

const TextField = ({
    label,
    type,
    name,
    value,
    onChange,
    placeholder,
    error
}) => {
    const isRequired = error === "isRequired";
    const [showPassword, setShowPassword] = useState(false);
    const handleChange = ({ target }) => {
        if (target.type === "number") {
            onChange({ name: target.name, value: +target.value });
        } else {
            onChange({ name: target.name, value: target.value });
        }
    };
    const getInputClasses = () => {
        return "form-control" + (error && !isRequired ? " is-invalid" : "");
    };
    const toggleShowPassword = () => {
        setShowPassword((prevState) => !prevState);
    };
    return (
        <div className="mb-4">
            <label className="text-nowrap" htmlFor={name}>
                {label}
            </label>
            {isRequired && <span className="text-danger">*</span>}
            <div className="input-group has-validation">
                <input
                    type={showPassword ? "text" : type}
                    id={name}
                    name={name}
                    value={value}
                    placeholder={placeholder}
                    onChange={handleChange}
                    className={getInputClasses()}
                />
                {type === "password" && (
                    <button
                        className="btn btn-outline-secondary"
                        type="button"
                        onClick={toggleShowPassword}
                    >
                        <i
                            className={
                                "bi bi-eye" + (showPassword ? "-slash" : "")
                            }
                        ></i>
                    </button>
                )}
                {error && !isRequired && (
                    <div className="invalid-feedback">{error}</div>
                )}
            </div>
        </div>
    );
};
TextField.defaultProps = {
    type: "text"
};
TextField.propTypes = {
    label: PropTypes.string,
    type: PropTypes.string,
    name: PropTypes.string,
    placeholder: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    onChange: PropTypes.func,
    error: PropTypes.string
};

export default TextField;
