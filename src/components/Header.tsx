import React from "react";
import Navbar from "./NavBar";
import NetworkSelector from "./NetworkSelector";

export default function Header() {
  return (
    <header>
      <Navbar />
      <NetworkSelector />
    </header>
  );
}
