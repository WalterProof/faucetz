import React, { FunctionComponent } from "react";
import { Link } from "react-router-dom";

type NavBarProps = {
    pathname: string;
};

const Navbar: FunctionComponent<NavBarProps> = ({ pathname }) => {
    const getNavLinkClass = (path: string) => {
        return pathname === path ? "is-active" : "";
    };

    return (
        <ul className="g-Menu">
            <li className={getNavLinkClass("/")}>
                <Link to="/">Faucet</Link>
            </li>
            <li className={getNavLinkClass("/account-generator")}>
                <Link to="/account-generator">Account Generator</Link>
            </li>
        </ul>
    );
};

export default Navbar;
