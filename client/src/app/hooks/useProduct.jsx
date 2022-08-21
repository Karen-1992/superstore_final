import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import productService from "../services/product.service";
import { toast } from "react-toastify";
import commentService from "../services/comment.service";

const ProductContext = React.createContext();

export const useProduct = () => {
    return useContext(ProductContext);
};

export const ProductProvider = ({ children }) => {
    const [product, setProduct] = useState([]);
    const [comments, setComments] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [isCommentsLoading, setCommentsLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        if (error != null) {
            toast(error);
            setError(null);
        }
    }, [error]);
    async function getProduct(productId) {
        try {
            const { content } = await productService.getOneProduct(productId);
            setProduct(content);
            setLoading(false);
        } catch (error) {
            errorCatcher(error);
        }
    }
    async function getComments(productId) {
        try {
            const { content } = await commentService.getComments({
                pageId: productId
            });
            setComments(content);
            setCommentsLoading(false);
        } catch (error) {
            errorCatcher(error);
        }
    }
    async function createComment(payload) {
        try {
            const { content } = await commentService.createComment(payload);
            setComments((prevState) => [...prevState, content]);
        } catch (error) {
            errorCatcher(error);
        }
    }

    async function removeComment(id) {
        try {
            await commentService.removeComment(id);
            setComments((prevState) => prevState.filter((c) => c._id !== id));
        } catch (error) {
            errorCatcher(error);
        }
    }
    function errorCatcher(error) {
        const { message } = error.response.data;
        setError(message);
    }
    return (
        <ProductContext.Provider
            value={{
                isLoading,
                isCommentsLoading,
                product,
                getProduct,
                comments,
                getComments,
                createComment,
                removeComment
            }}
        >
            {children}
        </ProductContext.Provider>
    );
};
ProductProvider.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};
