import React, { useEffect } from "react";
import Loader from "../../common/loader";
import { orderBy } from "lodash";
import CommentsList from "../../common/comments";
import { useDispatch, useSelector } from "react-redux";
import {
    getComments,
    getCommentsLoadingStatus,
    loadCommentsList,
    removeComment
} from "../../../store/comments";
import localStorageService from "../../../services/localStorage.service";

const Reviews = () => {
    const userId = localStorageService.getUserId();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(loadCommentsList({ userId }));
    }, [userId]);
    const isLoading = useSelector(getCommentsLoadingStatus());
    const comments = useSelector(getComments());
    const handleRemoveComment = (id) => {
        dispatch(removeComment(id));
    };
    const sortedComments = orderBy(comments, ["created_at"], ["desc"]);
    return (
        <>
            <div className="card mb-3">
                <div className="card-body ">
                    <h4>Мои отзывы и оценки</h4>
                    <hr />
                    {!isLoading ? (
                        <>
                            {sortedComments.length > 0 ? (
                                <CommentsList
                                    comments={sortedComments}
                                    onRemove={handleRemoveComment}
                                    showPage={true}
                                />
                            ) : (
                                <p>У вас еще нет комментариев</p>
                            )}
                        </>
                    ) : (
                        <Loader />
                    )}
                </div>
            </div>
        </>
    );
};

export default Reviews;
