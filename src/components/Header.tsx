import React from "react";
import Branding from "./Branding";
import Navbar from "./NavBar";

const Header = () => {
    return (
        <header>
            <Branding />
            <div className="g-Nav">
                <Navbar />
            </div>
        </header>
    );
};

export default Header;
