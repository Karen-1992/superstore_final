import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import ImageComponent from "../../common/imageComponent";
import ProductButtons from "../../common/productButtons";
import { addProductToCart, getCartProductById } from "../../../store/cart";
import { getIsFavorite, toggleFavorite } from "../../../store/favorites";
import Loader from "../../common/loader";
import Comments from "../../ui/comments";
import { useProduct } from "../../../hooks/useProduct";
import RatingStars from "../../common/ratingStars";
import { getIsLoggedIn } from "../../../store/users";
import CommentsStatus from "../../ui/commentsStatus";
import ImagesStrip from "../../ui/imagesStrip";
import history from "../../../utils/history";
import { getAverageRating } from "../../../utils/getAverageRating";
import { getPriceWithDiscount } from "../../../utils/getPriceWithDiscount";
import Price from "../../ui/price";
import Badge from "../../common/badge";
import { getIsNewProduct } from "../../../utils/getIsNewProduct";
import InStockStatus from "../../common/inStockStatus";
import { dateNewProduct } from "../../../constants/dateNewProduct";

const ProductPage = ({ productId }) => {
    const dispatch = useDispatch();
    const isLoggedIn = useSelector(getIsLoggedIn());
    const {
        product,
        getProduct,
        getComments,
        isCommentsLoading,
        isLoading,
        comments
    } = useProduct();
    useEffect(() => {
        getProduct(productId);
        getComments(productId);
    }, []);
    const [selectedImg, setSelectedImg] = useState(0);
    const [isOpenComments, setOpenComments] = useState(false);
    const handleSelectImg = (i) => {
        setSelectedImg(i);
    };
    const handleOpenCommentForm = () => {
        if (isLoggedIn) {
            setOpenComments((prevState) => !prevState);
        } else {
            history.push("/login");
        }
    };
    const isInCart = !!useSelector(getCartProductById(productId));
    const isFavorite = useSelector(getIsFavorite(productId));
    const isNewProduct = getIsNewProduct(product.createdAt, dateNewProduct);
    const handleAddToCart = () => {
        dispatch(
            addProductToCart({
                stock: product.stock,
                _id: productId
            })
        );
    };
    const handleToggleFavorite = () => {
        dispatch(toggleFavorite(productId));
    };
    const productRating = getAverageRating(comments);
    const { discountValue, finalPrice } = getPriceWithDiscount(
        product.discountPercentage,
        product.price
    );
    return (
        <div className="pb-5 px-3">
            {!isLoading && !isCommentsLoading ? (
                <>
                    <h2>{product.title}</h2>
                    <div className="d-flex flex-row gap-3 py-2">
                        <RatingStars value={productRating} role="null" />
                        <CommentsStatus
                            length={comments.length}
                            onOpenComments={handleOpenCommentForm}
                        />
                    </div>
                    <div className="row pt-3">
                        <div className="col-1 d-flex flex-column gap-2">
                            <ImagesStrip
                                images={product.images}
                                onSelect={handleSelectImg}
                                selectedImg={selectedImg}
                            />
                        </div>
                        <div className="col-6">
                            <ImageComponent
                                src={product.images[selectedImg]}
                                height="400px"
                                width="100%"
                            />
                        </div>
                        <div className="col">
                            <h3>Основные характеристики:</h3>
                            <p>
                                Наименование:
                                <span className="px-1 fw-bold">
                                    {product.title}
                                </span>
                            </p>
                            <p>
                                Описание:
                                <span className="px-1 fw-bold">
                                    {product.description}
                                </span>
                            </p>
                            <div className="d-flex pb-2">
                                <InStockStatus quantity={product.stock} />
                            </div>
                            <div className="d-flex gap-1">
                                <p className="">Цена:</p>
                                <Price
                                    discount={product.discountPercentage}
                                    discountValue={discountValue}
                                    finalPrice={finalPrice}
                                    price={product.price}
                                />
                            </div>
                            <div className="d-flex gap-2 pb-2">
                                {product.discountPercentage > 0 && (
                                    <Badge
                                        color="danger"
                                        title={`-${product.discountPercentage}%`}
                                    />
                                )}
                                {isNewProduct && (
                                    <Badge color="success" title="новинка" />
                                )}
                            </div>
                            <div className="d-flex  justify-content-start gap-4 py-2">
                                <ProductButtons
                                    isInCart={isInCart}
                                    isFavorite={isFavorite}
                                    onAddToCart={handleAddToCart}
                                    onToggleFavorite={handleToggleFavorite}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="my-3">
                        {isOpenComments && <Comments pageId={productId} />}
                    </div>
                </>
            ) : (
                <Loader />
            )}
        </div>
    );
};

ProductPage.propTypes = {
    productId: PropTypes.string.isRequired
};

export default ProductPage;
