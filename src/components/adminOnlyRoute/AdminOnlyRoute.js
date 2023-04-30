import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { selectEmail } from "../../redux/slice/authSlice";
import "./noAccess.scss";

const AdminOnlyRoute = ({ children }) => {
  const userEmail = useSelector(selectEmail);

  if (userEmail === "cyberfrog.contact@gmail.com") {
    return children;
  }
  return (
    <section style={{ height: "80vh" }} className="no_access_container">
      <div className="container">
        <h2>Permission Denied.</h2>
        <p>Only Admins can view this page.</p>
        <br />
        <Link to="/">
          <button className="--btn">&larr; Back To Home</button>
        </Link>
      </div>
    </section>
  );
};

export const AdminOnlyLink = ({ children }) => {
  const userEmail = useSelector(selectEmail);

  if (userEmail === "cyberfrog.contact@gmail.com") {
    return children;
  }
  return null;
};

export default AdminOnlyRoute;
