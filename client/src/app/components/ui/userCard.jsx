import React from "react";
import { useSelector } from "react-redux";
import { getCurrentUserData } from "../../store/users";
import history from "../../utils/history";
import UserInfo from "../common/userInfo";

const UserCard = () => {
    const userData = useSelector(getCurrentUserData());
    const handleClick = () => {
        history.push(history.location.pathname + "/edit");
    };
    return (
        <div className="card mb-3 col-lg-6 mx-auto shadow">
            <div className="card-body">
                <button
                    className="position-absolute top-0 end-0 btn btn-light btn-sm"
                    onClick={handleClick}
                >
                    <i className="bi bi-gear"></i>
                </button>
                <div className="d-flex flex-column align-items-center text-center position-relative">
                    <UserInfo {...userData} />
                </div>
            </div>
        </div>
    );
};

export default UserCard;
