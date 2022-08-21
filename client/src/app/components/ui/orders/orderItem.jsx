import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import ImageComponent from "../../common/imageComponent";
import { useSelector } from "react-redux";
import { getIsAdmin } from "../../../store/users";
import productService from "../../../services/product.service";

const OrderItem = ({ quantity, productId, onClick }) => {
    const isAdmin = useSelector(getIsAdmin());
    const [product, setProduct] = useState();
    useEffect(() => {
        productService
            .getOneProduct(productId)
            .then((res) => setProduct(res.content));
    }, []);
    return (
        <div className="d-flex border p-1">
            {product ? (
                <div className="d-flex flex-column">
                    <span className="fw-semibold">{product.title}</span>
                    <div className="d-flex">
                        <ImageComponent
                            src={product.thumbnail}
                            width="100px"
                            onClick={() => onClick(product._id)}
                        />
                        <div className="d-flex flex-column px-2">
                            <span className="text-nowrap">{`Количество: ${quantity} шт.`}</span>
                            {isAdmin && (
                                <span className="text-nowrap">{`В наличии: ${product.stock} шт.`}</span>
                            )}
                        </div>
                    </div>
                </div>
            ) : (
                <span>Товар не найден</span>
            )}
        </div>
    );
};

OrderItem.propTypes = {
    quantity: PropTypes.number,
    productId: PropTypes.string,
    onClick: PropTypes.func
};

export default OrderItem;
