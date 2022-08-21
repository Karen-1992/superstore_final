import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { logOut } from "../store/users";

const LogOut = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(logOut());
    }, []);
    return <h1>Loading from logout</h1>;
};

export default LogOut;
