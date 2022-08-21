import React from "react";
import PropTypes from "prop-types";
import ImageComponent from "../common/imageComponent";

const ImagesStrip = ({ images, selectedImg, onSelect }) => {
    return (
        <>
            {images.map((img, index) => (
                <div
                    className={
                        selectedImg === index
                            ? "border border-warning border-2 rounded"
                            : ""
                    }
                    key={index}
                    onClick={() => onSelect(index)}
                    role="button"
                >
                    <ImageComponent src={img} />
                </div>
            ))}
        </>
    );
};

ImagesStrip.propTypes = {
    images: PropTypes.array,
    selectedImg: PropTypes.number,
    onSelect: PropTypes.func
};

export default ImagesStrip;
