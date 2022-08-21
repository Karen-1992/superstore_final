import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import userService from "../../services/user.service";
import Loader from "./loader";

const User = ({ userId }) => {
    const [user, setUser] = useState();
    useEffect(() => {
        userService.getOneUser(userId).then((res) => setUser(res.content));
    }, []);
    return (
        <div>
            {user ? (
                <span className="">{user.firstName + " " + user.lastName}</span>
            ) : (
                <Loader />
            )}
        </div>
    );
};

User.propTypes = {
    userId: PropTypes.string.isRequired
};

export default User;
