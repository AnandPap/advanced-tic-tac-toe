import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useAppSelector } from "../redux/hooks";

const BodyWrapper = () => {
  const theme = useAppSelector((s) => s.tictactoe.theme);
  const navigate = useNavigate();
  useEffect(() => {
    if (location.pathname === "/") navigate("/home", { replace: true });
  }, []);

  return (
    <div className={`body-wrapper ${theme}`}>
      <Outlet />
    </div>
  );
};

export default BodyWrapper;
