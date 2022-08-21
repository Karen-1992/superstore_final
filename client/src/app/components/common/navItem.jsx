import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const NavItem = ({ quantity, title, iconClasses, path }) => {
    return (
        <>
            <Link to={path} className="nav-link">
                <div className="text-center">
                    <i
                        className={
                            "position-relative px-2 fs-3 text-dark " +
                            iconClasses
                        }
                    >
                        {quantity > 0 && (
                            <span
                                className="position-absolute top-0 start-100 translate-middle
                                    badge rounded-pill bg-dark fs-6 py-1 px-2"
                            >
                                {quantity}
                            </span>
                        )}
                    </i>
                </div>
                {title && <p className="">{title}</p>}
            </Link>
        </>
    );
};

NavItem.propTypes = {
    quantity: PropTypes.number,
    title: PropTypes.string,
    iconClasses: PropTypes.string,
    path: PropTypes.string
};

export default NavItem;
