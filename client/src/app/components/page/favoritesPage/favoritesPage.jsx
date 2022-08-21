import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import productService from "../../../services/product.service";
import { addProductToCart } from "../../../store/cart";
import {
    clearFavorite,
    getFavoriteList,
    toggleFavorite
} from "../../../store/favorites";
import history from "../../../utils/history";
import ClearButton from "../../common/clearButton";
import Loader from "../../common/loader";
import ProductItem from "../../ui/productItem";
import noImage from "../../../assets/images/no_icon.png";

const FavoritesPage = () => {
    const dispatch = useDispatch();
    const favoritesIds = useSelector(getFavoriteList());
    const [favoritesList, setFavoritesList] = useState();
    useEffect(() => {
        getProducts(favoritesIds).then((res) => setFavoritesList(res));
    }, [favoritesIds]);
    async function getProducts(ids) {
        const result = [];
        if (ids) {
            for (const item of ids) {
                const { productId } = item;
                const { content } = await productService.getOneProduct(
                    productId
                );
                if (content) {
                    result.push(content);
                } else {
                    result.push({
                        _id: productId,
                        thumbnail: noImage
                    });
                }
            }
        }
        return result;
    }
    const handleClear = () => {
        dispatch(clearFavorite());
    };
    const handleAddToCart = (data) => {
        dispatch(addProductToCart(data));
    };
    const handleToggleFavorite = (id) => {
        dispatch(toggleFavorite(id));
    };
    const handleOpenProductPage = (productId) => {
        history.push(`/products/${productId}`);
    };
    return (
        <div className="d-flex flex-column px-3">
            {favoritesList ? (
                <>
                    {favoritesList.length > 0 ? (
                        <>
                            <div className="d-flex justify-content-end mb-2">
                                <ClearButton
                                    onClick={handleClear}
                                    classes="fw-light mb-2"
                                    label="Очистить"
                                />
                            </div>
                            <div className="row row-cols-1 row-cols-lg-3 row-cols-md-2 row-cols-sm-1 g-4">
                                {favoritesList.map((favProduct) => (
                                    <div key={favProduct._id}>
                                        <ProductItem
                                            {...favProduct}
                                            onAddToCart={() =>
                                                handleAddToCart(favProduct)
                                            }
                                            onToggleFavorite={() =>
                                                handleToggleFavorite(
                                                    favProduct._id
                                                )
                                            }
                                            onOpenProductPage={() =>
                                                handleOpenProductPage(
                                                    favProduct._id
                                                )
                                            }
                                        />
                                    </div>
                                ))}
                            </div>
                        </>
                    ) : (
                        <div>
                            <p>
                                У нас столько замечательных товаров, а в
                                Избранном у Вас – пусто
                            </p>
                            <Link to="/products">Перейти в каталог</Link>
                        </div>
                    )}
                </>
            ) : (
                <Loader />
            )}
        </div>
    );
};

export default FavoritesPage;
