import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { displayDate } from "../../../utils/displayDate";
import { getCurrentUserId } from "../../../store/users";
import { useSelector } from "react-redux";
import userService from "../../../services/user.service";
import RatingStars from "../ratingStars";
import productService from "../../../services/product.service";
import ImageComponent from "../imageComponent";
import history from "../../../utils/history";

const Comment = ({
    content,
    rating,
    created_at: created,
    _id: id,
    pageId,
    userId,
    onRemove,
    showPage
}) => {
    const currentUserId = useSelector(getCurrentUserId());
    const [user, setUser] = useState();
    const [product, setProduct] = useState();
    useEffect(() => {
        userService.getOneUser(userId).then((res) => setUser(res.content));
        productService
            .getOneProduct(pageId)
            .then((res) => setProduct(res.content));
    }, []);
    return (
        <div className="bg-light card-body mb-3">
            <div className="row">
                <div className="col">
                    <div className="d-flex flex-start ">
                        <div className="flex-grow-1 flex-shrink-1">
                            <div className="d-flex justify-content-between align-items-center">
                                <div className="d-flex flex-column gap-3 justify-content-between">
                                    <p className="mb-0 ">
                                        {user &&
                                            user?.firstName +
                                                " " +
                                                user?.lastName}{" "}
                                        <span className="small">
                                            - {displayDate(created)}
                                        </span>
                                    </p>
                                    <div className="my-2">
                                        <RatingStars value={rating} />
                                    </div>
                                    <p>{content}</p>
                                </div>
                                {showPage && (
                                    <>
                                        {product ? (
                                            <div>
                                                <p>{product.title}</p>
                                                <div>
                                                    <ImageComponent
                                                        src={product.thumbnail}
                                                        height="100px"
                                                        onClick={() =>
                                                            history.push(
                                                                `/products/${product._id}`
                                                            )
                                                        }
                                                    />
                                                </div>
                                            </div>
                                        ) : (
                                            <p>Товар не найден</p>
                                        )}
                                    </>
                                )}
                                {currentUserId === userId && (
                                    <button
                                        className="btn btn-sm"
                                        onClick={() => onRemove(id)}
                                    >
                                        <i className="bi bi-x-lg"></i>
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
Comment.propTypes = {
    content: PropTypes.string,
    edited_at: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    created_at: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    userId: PropTypes.string,
    rating: PropTypes.number,
    onRemove: PropTypes.func,
    showPage: PropTypes.bool,
    _id: PropTypes.string,
    pageId: PropTypes.string
};

export default Comment;
