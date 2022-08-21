import React, { useState, useEffect } from "react";
import TextAreaField from "../form/textAreaField";
import { validator } from "../../../utils/validator";
import PropTypes from "prop-types";
import RatingStars from "../ratingStars";

const AddCommentForm = ({ onSubmit }) => {
    const [data, setData] = useState({});
    const [rating, setRating] = useState(5);
    const [errors, setErrors] = useState({});
    const handleChange = (target) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };
    const handleSetRating = (rating) => {
        setRating(rating + 1);
    };
    const validatorConfig = {
        content: {
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

    const clearForm = () => {
        setData({});
        setRating(5);
        setErrors({});
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return;
        onSubmit(data, rating);
        clearForm();
    };
    const isValid = Object.keys(errors).length === 0;
    return (
        <div>
            <h5>Поставьте оценку и напишите отзыв о выбранном товаре</h5>
            <div className="mb-2">
                <span className="me-2">Оценка:</span>
                <RatingStars onSetRating={handleSetRating} value={rating} />
            </div>
            <form onSubmit={handleSubmit}>
                <TextAreaField
                    value={data.content || ""}
                    onChange={handleChange}
                    name="content"
                    label="Сообщение"
                    error={errors.content}
                />
                <div className="d-flex justify-content-end">
                    <button
                        className="btn btn-primary"
                        type="submit"
                        disabled={!isValid}
                    >
                        Опубликовать
                    </button>
                </div>
            </form>
        </div>
    );
};
AddCommentForm.propTypes = {
    onSubmit: PropTypes.func
};

export default AddCommentForm;
