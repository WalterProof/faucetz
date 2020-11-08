import React from "react";
import { useLocation } from "react-router-dom";
import Branding from "./Branding";
import Navbar from "./NavBar";
import NetworkSelector from "./NetworkSelector";

const Header = () => {
    const { pathname } = useLocation();

    return (
        <header>
            <Branding />
            <div className="g-Nav">
                <Navbar pathname={pathname} />
                {pathname === "/" && <NetworkSelector />}
            </div>
        </header>
    );
};

export default Header;
