import React, { useState } from "react";
import { MenuItems } from "./MenuItems";
import "./Dropdown.scss";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { auth } from "../../firebase/config";
import { signOut } from "firebase/auth";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "../../components/loader/Loader";

function Dropdown() {
  const [click, setClick] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = () => setClick(!click);

  const navigate = useNavigate();

  const logoutUser = () => {
    setClick(false);
    setIsLoading(true);

    signOut(auth)
      .then(() => {
        setIsLoading(false);
        toast.success("You've been logged out");
        navigate("/");
      })
      .catch((error) => {
        setIsLoading(false);
        toast.error("ERROR! Something went wrong!");
        console.log(error.message, error.code);
      });
  };

  return (
    <>
      {isLoading && <Loader />}
      <ul
        onClick={handleClick}
        className={click ? "dropdown-menu clicked" : "dropdown-menu"}
      >
        {MenuItems.map((item, index) => {
          return (
            <li key={index}>
              <NavLink
                className={({ isActive }) =>
                  !isActive ? "dropdown-link" : "active-dropdown-link"
                }
                to={item.path}
                onClick={() => setClick(false)}
              >
                {item.title}
              </NavLink>
            </li>
          );
        })}
        <li>
          <Link className="dropdown-logout" to={"/"} onClick={logoutUser}>
            Logout
          </Link>
        </li>
      </ul>
    </>
  );
}

export default Dropdown;
