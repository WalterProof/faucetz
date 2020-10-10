import React from "react";
import Navbar from "./NavBar";
import NetworkSelector from "./NetworkSelector";

const Header = () => {
    return (
        <header>
            <Navbar />
            <NetworkSelector />
        </header>
    );
};

export default Header;
