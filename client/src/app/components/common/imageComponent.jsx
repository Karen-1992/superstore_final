import React from "react";
import PropTypes from "prop-types";

const ImageComponent = ({ src, onClick, height, width, classes }) => {
    return (
        <div
            style={{
                height,
                width
            }}
            className={classes}
        >
            <img
                className={"d-block h-100 w-100 " + (classes || "")}
                style={{
                    objectFit: "contain"
                }}
                onClick={onClick}
                role="button"
                src={src}
                alt={src}
            />
        </div>
    );
};

ImageComponent.defaultProps = {
    height: "100%",
    width: "100%"
};

ImageComponent.propTypes = {
    src: PropTypes.string,
    onClick: PropTypes.func,
    classes: PropTypes.string,
    height: PropTypes.string,
    width: PropTypes.string
};

export default ImageComponent;
