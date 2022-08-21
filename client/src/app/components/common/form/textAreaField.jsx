import React from "react";
import PropTypes from "prop-types";

const TextAreaField = ({
    label,
    name,
    value,
    onChange,
    error,
    placeholder
}) => {
    const isRequired = error === "isRequired";
    const handleChange = ({ target }) => {
        onChange({ name: target.name, value: target.value });
    };
    const getInputClasses = () => {
        return "form-control" + (error && !isRequired ? " is-invalid" : "");
    };

    return (
        <div className="mb-4">
            <label htmlFor={name}> {label}</label>
            {isRequired && <span className="text-danger">*</span>}
            <div className="input-group has-validation">
                <textarea
                    id={name}
                    name={name}
                    placeholder={placeholder}
                    value={value}
                    onChange={handleChange}
                    className={getInputClasses()}
                />
                {error && !isRequired && (
                    <div className="invalid-feedback">{error}</div>
                )}
            </div>
        </div>
    );
};
TextAreaField.defaultProps = {
    type: "text"
};
TextAreaField.propTypes = {
    label: PropTypes.string,
    type: PropTypes.string,
    name: PropTypes.string,
    value: PropTypes.string,
    placeholder: PropTypes.string,
    onChange: PropTypes.func,
    error: PropTypes.string
};

export default TextAreaField;
