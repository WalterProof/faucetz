import React from "react";
import Branding from "./Branding";
import Navbar from "./NavBar";
import NetworkSelector from "./NetworkSelector";

const Header = () => {
    return (
        <header>
            <Branding />
            <div className="g-Nav">
                <Navbar />
                <NetworkSelector />
            </div>
        </header>
    );
};

export default Header;
