import { orderBy } from "lodash";
import React, { useState } from "react";
import CommentsList, { AddCommentForm } from "../common/comments";
import PropTypes from "prop-types";
import Loader from "../common/loader";
import { useProduct } from "../../hooks/useProduct";

const Comments = ({ pageId }) => {
    const { comments, isCommentsLoading, removeComment, createComment } =
        useProduct();
    const [isOpenAddForm, setOpenAddForm] = useState(comments.length === 0);
    const handleToggleAddForm = () => {
        setOpenAddForm((prevState) => !prevState);
    };
    const handleRemoveComment = (id) => {
        removeComment(id);
    };
    const handleSubmit = (data, rating) => {
        createComment({ ...data, pageId, rating });
    };
    const sortedComments = orderBy(comments, ["created_at"], ["desc"]);
    return (
        <div>
            <p
                className="text-end fw-bold text-success"
                role="button"
                onClick={handleToggleAddForm}
            >
                {!isOpenAddForm ? (
                    "Добавить отзыв"
                ) : (
                    <span>
                        Закрыть
                        <i className="bi bi-x-lg px-1"></i>
                    </span>
                )}
            </p>
            <div className="card mb-2">
                {isOpenAddForm && (
                    <div className="card-body ">
                        <AddCommentForm onSubmit={handleSubmit} />
                    </div>
                )}
            </div>
            {sortedComments.length > 0 && (
                <div className="card mb-3">
                    <div className="card-body ">
                        <h5>Отзывы покупателей</h5>
                        <hr />
                        {!isCommentsLoading ? (
                            <CommentsList
                                comments={sortedComments}
                                onRemove={handleRemoveComment}
                            />
                        ) : (
                            <Loader />
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

Comments.propTypes = {
    pageId: PropTypes.string
};

export default Comments;
