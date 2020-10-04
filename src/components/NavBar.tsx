import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const { pathname } = useLocation();
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
}
