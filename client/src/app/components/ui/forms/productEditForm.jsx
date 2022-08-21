import React, { useEffect, useState } from "react";
import TextField from "../../common/form/textField";
import PropTypes from "prop-types";
import SelectField from "../../common/form/selectField";
import {
    getCategories,
    getCategoriesLoadingStatus
} from "../../../store/categories";
import { useDispatch, useSelector } from "react-redux";
import {
    createProduct,
    getProductById,
    updateProduct
} from "../../../store/products";
import { validator } from "../../../utils/validator";
import TextAreaField from "../../common/form/textAreaField";

const ProductEditForm = ({ productId, clearForm }) => {
    const initialData = {
        title: "",
        brand: "",
        category: "",
        description: "",
        price: "",
        discountPercentage: "",
        stock: "",
        thumbnail: ""
    };
    const dispatch = useDispatch();
    const [data, setData] = useState(initialData);
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const categories = useSelector(getCategories());
    const categoriesLoading = useSelector(getCategoriesLoadingStatus());
    const currentProduct = useSelector(getProductById(productId));
    const handleSubmit = (e) => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return;
        if (productId) {
            const { price, discountPercentage, stock } = data;
            dispatch(
                updateProduct({
                    ...data,
                    price,
                    discountPercentage,
                    stock,
                    productId
                })
            );
        } else {
            dispatch(createProduct(data));
        }
        handleClearForm();
    };
    useEffect(() => {
        if (!categoriesLoading && currentProduct && !data) {
            setData({
                ...currentProduct
            });
        }
    }, [currentProduct, data, categoriesLoading]);
    useEffect(() => {
        if (productId) {
            setData(currentProduct);
        }
    }, [productId]);
    useEffect(() => {
        if (data && isLoading) {
            setIsLoading(false);
        }
    }, [data]);
    const validatorConfig = {
        title: {
            isRequired: {
                message: "isRequired"
            }
        },
        brand: {
            isRequired: {
                message: "isRequired"
            }
        },
        category: {
            isRequired: {
                message: "isRequired"
            }
        },
        description: {
            isRequired: {
                message: "isRequired"
            }
        },
        price: {
            isRequired: {
                message: "isRequired"
            },
            minValue: {
                message: "Цена не может быть меньше 0",
                value: 0
            }
        },
        discountPercentage: {
            isRequired: {
                message: "isRequired"
            },
            minValue: {
                message: "Скидка не может быть меньше 0",
                value: 0
            }
        },
        stock: {
            isRequired: {
                message: "isRequired"
            },
            minValue: {
                message: "Количество товаров не может быть меньше 0",
                value: 0
            }
        },
        thumbnail: {
            isRequired: {
                message: "isRequired"
            }
        }
    };
    useEffect(() => {
        validate();
    }, [data]);
    const handleChange = (target) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };
    const handleCancel = () => {
        setData(initialData);
    };
    const handleClearForm = () => {
        setData(initialData);
        clearForm();
    };
    const validate = () => {
        const errors = validator(data, validatorConfig);
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };
    const isValid = Object.keys(errors).length === 0;
    const categoriesList = categories.map((c) => ({
        label: c.name,
        value: c._id
    }));
    return (
        <form onSubmit={handleSubmit}>
            <TextField
                label="Наименование"
                name="title"
                value={data.title}
                onChange={handleChange}
                error={errors.title}
            />
            <TextField
                label="Производитель"
                name="brand"
                value={data.brand}
                onChange={handleChange}
                error={errors.brand}
            />
            <SelectField
                name="category"
                label="Категория"
                value={data.category}
                defaultOption="Выберите категорию..."
                options={categoriesList}
                onChange={handleChange}
                error={errors.category}
            />
            <TextAreaField
                label="Описание"
                name="description"
                value={data.description}
                onChange={handleChange}
                error={errors.description}
                placeholder="Введите описание товара"
            />
            <div className="d-flex gap-2">
                <TextField
                    label="Цена, $"
                    type="number"
                    name="price"
                    value={data.price}
                    onChange={handleChange}
                    error={errors.price}
                />
                <TextField
                    label="Скидка, %"
                    type="number"
                    name="discountPercentage"
                    value={data.discountPercentage}
                    onChange={handleChange}
                    error={errors.discountPercentage}
                />
            </div>
            <TextField
                label="Количество, шт."
                type="number"
                name="stock"
                value={data.stock}
                onChange={handleChange}
                error={errors.stock}
            />
            <TextField
                label="Изображение"
                placeholder="Вставьте ссылку на изображение"
                name="thumbnail"
                value={data.thumbnail}
                onChange={handleChange}
                error={errors.thumbnail}
            />
            {!isValid && (
                <p>
                    <span className="text-danger">*</span>
                    Поле обязательно для заполнения
                </p>
            )}
            <div className="d-flex flex-wrap gap-2">
                <button
                    type="submit"
                    disabled={!isValid}
                    className="btn btn-primary btn-sm w-100"
                >
                    {productId ? "Обновить" : "Добавить"}
                </button>
                <button
                    type="button"
                    onClick={handleCancel}
                    className="btn btn-danger btn-sm w-100"
                >
                    Отмена
                </button>
            </div>
        </form>
    );
};

ProductEditForm.propTypes = {
    clearForm: PropTypes.func,
    productId: PropTypes.string
};

export default ProductEditForm;
