import { useState, useEffect } from "react";
// import mobile menu
import MobileMenu from "./MobileMenu";
import { Link } from "react-router-dom";
//import list from bootstrap icons
import { List } from "react-bootstrap-icons";
import axios from "axios";

const baseUrl = import.meta.env.VITE_WP_BASEURL;

const Header = () => {
  // set a state for the mobile menu open / closed
  const [menuIsOpen, openMenu] = useState(false);
  const [logoUrl, setLogoUrl] = useState("");

  // fetch the logo with useEffect
  useEffect(() => {
    const fetchNavLogo = async () => {
      try {
        const response = await axios.get(
          `${baseUrl}wp-json/custom/v1/nav-logo`
        );
        if (response.status === 200) {
          const data = response.data;
          console.log(response.data);
          setLogoUrl(data[0]);
        } else {
          console.error("failed to fetch logo");
        }
      } catch (error) {
        console.error("Error fetching logo URL", error);
      }
    };

    fetchNavLogo();
  }, []);

  const toggleMobileMenu = () => {
    openMenu(!menuIsOpen);
    // stops scrolling
    document.body.classList.toggle("no-scroll");
  };

  return (
    <>
      <div id="topnav">
        <div id="logo">
          <Link to="/">
            <img src={logoUrl} alt="logo-withText" />
          </Link>
        </div>

        {/* Desktop Menu */}

        <ul id="menu">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/">Initiatives</Link>
          </li>
          <li>
            <Link to="/resources">Resources</Link>
          </li>
          <li>
            <Link to="/">About</Link>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>
          <li id="donate-nav-link">
            <Link to="/donationfront">Donate</Link>
          </li>
        </ul>

        {/* Hamburger Menu mobile / tablet */}
        <div id="menu-container">
          <button
            id="menu-button"
            className="show-mobile-menu-button"
            onClick={toggleMobileMenu}
          >
            <List id="hamburger-icon" />
          </button>
        </div>
      </div>

      {/* if menu is open show the mobile menu */}
      {/* mobile menu close method is the prop */}
      {menuIsOpen && <MobileMenu closeMethod={toggleMobileMenu} />}
    </>
  );
};

export default Header;
