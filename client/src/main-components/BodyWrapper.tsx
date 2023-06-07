import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useAppSelector } from "../redux/hooks";

const BodyWrapper = () => {
  const { darkMode, additionalDarkModeClass } = useAppSelector(
    (s) => s.tictactoe
  );
  const navigate = useNavigate();
  useEffect(() => {
    if (location.pathname === "/") navigate("/home", { replace: true });
  }, []);

  return (
    <div
      className={`body-wrapper ${darkMode ? "dark" : "light"} ${
        additionalDarkModeClass ? "dark-mode-switched" : ""
      }`}
    >
      <Outlet />
    </div>
  );
};

export default BodyWrapper;
