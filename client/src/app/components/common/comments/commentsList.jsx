import React from "react";

import Comment from "./comment";
import PropTypes from "prop-types";
const CommentsList = ({ comments, onRemove, showPage }) => {
    return comments.map((comment) => (
        <Comment
            key={comment._id}
            {...comment}
            showPage={showPage}
            onRemove={onRemove}
        />
    ));
};

CommentsList.propTypes = {
    comment: PropTypes.array,
    showPage: PropTypes.bool,
    onRemove: PropTypes.func
};

export default CommentsList;
