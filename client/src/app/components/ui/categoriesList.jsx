import React from "react";
import ImageComponent from "../common/imageComponent";
import Loader from "../common/loader";
import { useSelector } from "react-redux";
import { getCategories } from "../../store/categories";
import history from "../../utils/history";

const CategoriesList = () => {
    const categoriesList = useSelector(getCategories());
    const handleClick = (category) => {
        history.push(`/products/catalog/${category}`);
    };
    return (
        <>
            {categoriesList ? (
                categoriesList.map((c) => (
                    <div
                        className="hover col"
                        key={c._id}
                        role="button"
                        onClick={() => handleClick(c.name)}
                    >
                        <div className="h-100 shadow rounded-3">
                            <p className="fw-light fs-5 text-center">
                                {c.name}
                            </p>
                            <div className="">
                                <ImageComponent
                                    height="200px"
                                    classes=""
                                    src={c.thumbnail}
                                />
                            </div>
                        </div>
                    </div>
                ))
            ) : (
                <Loader />
            )}
        </>
    );
};

export default CategoriesList;
