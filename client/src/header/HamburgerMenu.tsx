import { useState } from "react";
import { useNavigate } from "react-router-dom";
import BackButton from "../reusable/BackButton";
import LottieDarkModeSwitch from "./LottieDarkModeSwitch";

const HamburgerMenu = () => {
  const [menuDisplay, setMenuDisplay] = useState(false);
  const navigate = useNavigate();

  function handleMenuDisplay() {
    setMenuDisplay((s) => !s);
  }

  function handleBackNavigation() {
    navigate(-1);
  }

  return (
    <div className={`hamburger-menu-wrapper ${menuDisplay ? "open" : ""}`}>
      <div className="hamburger-icon-wrapper" onClick={handleMenuDisplay}>
        <div className="hamburger-icon" />
      </div>
      <div className="hamburger-menu">
        {location.pathname !== "/home" && (
          <BackButton
            className="back-button"
            text="Back"
            onClick={handleBackNavigation}
          />
        )}
        <LottieDarkModeSwitch />
      </div>
      {menuDisplay && (
        <div className="screen-cover" onClick={handleMenuDisplay} />
      )}
    </div>
  );
};

export default HamburgerMenu;
