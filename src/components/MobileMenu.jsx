import { Link } from "react-router-dom";
import { X } from "react-bootstrap-icons";

const MobileMenu = ({ closeMethod }) => {
  return (
    <>
      <button id="close-menu" onClick={closeMethod}>
        <X />
      </button>
      <ul id="mobile-menu">
        {/* mobile nav links */}
        <li>
          <Link to="/" onClick={closeMethod}>
            Home
          </Link>
        </li>
        <li>
          <Link to="/" onClick={closeMethod}>
            Initiatives
          </Link>
        </li>
        <li>
          <Link to="/resources" onClick={closeMethod}>
            Resources
          </Link>
        </li>
        <li>
          <Link to="/" onClick={closeMethod}>
            About
          </Link>
        </li>
        <li>
          <Link to="/contact" onClick={closeMethod}>
            Contact
          </Link>
        </li>
        <li>
          <Link to="/donationfront" onClick={closeMethod}>
            Donate
          </Link>
        </li>
      </ul>
    </>
  );
};

export default MobileMenu;
