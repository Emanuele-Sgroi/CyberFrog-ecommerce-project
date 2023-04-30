import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CartButton } from "./CartButton";
import { Link, NavLink, useNavigate } from "react-router-dom";
import "./Header.scss";
import Dropdown from "./Dropdown";
import { MdArrowDropDown } from "react-icons/md";
import { images } from "../../constants";
import { IoIosCart } from "react-icons/io";
import { auth } from "../../firebase/config";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
//import Loader from "../../components/loader/Loader";
import {
  SET_ACTIVE_USER,
  REMOVE_ACTIVE_USER,
} from "../../redux/slice/authSlice";
import ShowOnLogin, { ShowOnLogout } from "../hiddenLink/hiddenLink";
import { AdminOnlyLink } from "../adminOnlyRoute/AdminOnlyRoute";
import {
  CALCULATE_TOTAL_QUANTITY,
  selectCartTotalQuantity,
} from "../../redux/slice/cartSlice";

function Header() {
  const [click, setClick] = useState(false);
  const [dropdown, setDropdown] = useState(false);
  const [navColor, setNavColor] = useState(false);
  const [menuActive, setMenuActive] = useState(false);
  const [menuClicked, setMenuClicked] = useState(false);
  const [userNameDisplay, setUserNameDisplay] = useState("");
  const cartTotalQuantity = useSelector(selectCartTotalQuantity);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(CALCULATE_TOTAL_QUANTITY());
  }, [dispatch]);

  //monitor current user
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        if (user.displayName == null) {
          //const uid = user.uid;
          const extractUserName = user.email.substring(
            0,
            user.email.indexOf("@")
          );
          const userName =
            extractUserName.charAt(0).toUpperCase() + extractUserName.slice(1);
          setUserNameDisplay(userName);
        } else {
          setUserNameDisplay(user.displayName);
        }

        dispatch(
          SET_ACTIVE_USER({
            email: user.email,
            userName: user.displayName ? user.displayName : userNameDisplay,
            userID: user.uid,
          })
        );
      } else {
        //user is signed out
        setUserNameDisplay("");
        dispatch(REMOVE_ACTIVE_USER());
      }
    });
  }, [dispatch, userNameDisplay]);

  const logoutUser = () => {
    hideMenu();
    signOut(auth)
      .then(() => {
        toast.success("You've been logged out");
        navigate("/");
      })
      .catch((error) => {
        toast.error("ERROR! Check your credential");
        console.log(error.message, error.code);
      });
  };

  const hideMenu = () => {
    setMenuActive(false);
  };

  const closeMobileMenu = () => setClick(false);

  const logo = (
    <Link to="/" className="navbar-logo" onClick={hideMenu}>
      <img className="my-logo" src={images.logo} alt="logo" />
      <i className="fab fa-firstdraft" />
    </Link>
  );

  const mobileCart = (
    <span className="app__header_nav_cart_mobile" onClick={hideMenu}>
      <Link to="/cart">
        <IoIosCart size={22} />
        <p>{cartTotalQuantity}</p>
      </Link>
    </span>
  );

  const onMouseEnter = () => {
    if (window.innerWidth < 700) {
      setDropdown(false);
    } else {
      setDropdown(true);
    }
  };

  const onMouseLeave = () => {
    if (window.innerWidth < 700) {
      setDropdown(false);
    } else {
      setDropdown(false);
    }
  };

  const changeNavColor = () => {
    if (window.scrollY >= 80) {
      setNavColor(true);
    } else {
      setNavColor(false);
    }
  };

  const menuIsClicked = () => {
    setMenuActive(!menuActive);
    setMenuClicked(true);
  };

  window.addEventListener("scroll", changeNavColor);

  return (
    <>
      <div className={`${navColor ? "navbar navColor" : "navbar"}`}>
        {logo}

        <ul className={click ? "nav-menu active" : "nav-menu"}>
          <ShowOnLogin>
            <li className="nav-item">
              <a href="#home" rel="noreferrer" className="username_display">
                Hi, <span>{userNameDisplay}</span>
              </a>
            </li>
          </ShowOnLogin>
          <AdminOnlyLink>
            <li className="nav-item">
              <NavLink
                to="/admin/home"
                className={({ isActive }) =>
                  isActive ? "active-nav-links" : "nav-links"
                }
              >
                Admin
              </NavLink>
            </li>
          </AdminOnlyLink>
          <ShowOnLogout>
            <li className="nav-item">
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  isActive ? "active-nav-links" : "nav-links"
                }
              >
                Sign In
              </NavLink>
            </li>
          </ShowOnLogout>
          <ShowOnLogin>
            <li
              className="nav-item"
              onMouseEnter={onMouseEnter}
              onMouseLeave={onMouseLeave}
            >
              <h5 onClick={closeMobileMenu} className="nav-links get-the-arrow">
                My Account <i className="fas fa-caret-down" />
                <MdArrowDropDown
                  size={30}
                  className={dropdown ? "keep-rotation" : "no-rotation"}
                />
              </h5>
              {dropdown && <Dropdown />}
            </li>
          </ShowOnLogin>
          <li className="nav-item">
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                isActive ? "active-nav-links" : "nav-links"
              }
            >
              Contact Us
            </NavLink>
          </li>
        </ul>
        <CartButton onClick={hideMenu} className="cartButton_class" />
      </div>

      <div
        className={`${
          navColor || menuActive
            ? "mobile-navbar mobile-navColor"
            : "mobile-navbar"
        }`}
      >
        {logo}
        <div className="mobile_navbar_left">
          {mobileCart}
          <div
            className={`${
              menuActive
                ? "menu_mobile_btn mobile_active"
                : "menu_mobile_btn mobile_not-active"
            }`}
            onClick={menuIsClicked}
          >
            <span className="mobile_menu_icon_span"></span>
            <span className="mobile_menu_icon_span"></span>
            <span className="mobile_menu_icon_span"></span>
          </div>
        </div>
      </div>

      <div className={`${!menuClicked ? "no-show-menu" : ""}`}>
        <div
          className={`${
            menuActive
              ? "mobile_menu default_mobile_menu"
              : "hide-mobile-menu default_mobile_menu"
          }`}
        >
          <ShowOnLogin>
            <a
              href="#home"
              rel="noreferrer"
              className="username_display_mobile"
            >
              Hi, <span>{userNameDisplay}</span>
            </a>
          </ShowOnLogin>
          <ul>
            <AdminOnlyLink>
              <li>
                <NavLink
                  to="/admin/home"
                  onClick={hideMenu}
                  className={({ isActive }) =>
                    isActive ? "active-nav-links-mobile" : "nav-links-mobile"
                  }
                >
                  Admin
                </NavLink>
              </li>
            </AdminOnlyLink>
            <ShowOnLogout>
              <li>
                <NavLink
                  to="/login"
                  onClick={hideMenu}
                  className={({ isActive }) =>
                    isActive ? "active-nav-links-mobile" : "nav-links-mobile"
                  }
                >
                  Sign In
                </NavLink>
              </li>
            </ShowOnLogout>
            <ShowOnLogin>
              <li>
                <NavLink
                  to="/order-history"
                  onClick={hideMenu}
                  className={({ isActive }) =>
                    isActive ? "active-nav-links-mobile" : "nav-links-mobile"
                  }
                >
                  My orders
                </NavLink>
              </li>
            </ShowOnLogin>
            <li>
              <NavLink
                to="/contact"
                onClick={hideMenu}
                className={({ isActive }) =>
                  isActive ? "active-nav-links-mobile" : "nav-links-mobile"
                }
              >
                Contact Us
              </NavLink>
            </li>
            <ShowOnLogin>
              <li>
                <NavLink
                  to="/"
                  onClick={logoutUser}
                  className={({ isActive }) =>
                    isActive ? "active-nav-links-mobile" : "nav-links-mobile"
                  }
                >
                  Logout
                </NavLink>
              </li>
            </ShowOnLogin>
          </ul>
        </div>
      </div>
    </>
  );
}

export default Header;
