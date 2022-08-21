import React from "react";

const Footer = () => {
    return (
        <footer className="text-center bg-dark p-3 position-absolute w-100 end-0 bottom-0 text-light">
            <div>
                <p>© 2022 Copyright: Karen Habuzian</p>
            </div>
            <div className="w-100 mx-auto">
                <div className="d-flex gap-3 justify-content-center fs-5">
                    <span>Мы в социальных сетях</span>
                    <i className="bi bi-telegram"></i>
                    <i className="bi bi-instagram"></i>
                    <i className="bi bi-github"></i>
                    <i className="bi bi-facebook"></i>
                    <i className="bi bi-youtube"></i>
                    <i className="bi bi-twitter"></i>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
