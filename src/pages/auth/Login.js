import { useState } from "react";
import styles from "./auth.module.scss";
import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import Card from "../../components/card/Card";
import {
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../../firebase/config";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "../../components/loader/Loader";
import { useSelector } from "react-redux";
import { selectPreviousURL } from "../../redux/slice/cartSlice";

const Login = () => {
  //useState section
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const loginUser = (event) => {
    event.preventDefault();

    setIsLoading(true);

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // const user = userCredential.user;
        setIsLoading(false);
        toast.success("Welcome back!");
        redirectUser();
      })
      .catch((error) => {
        setIsLoading(false);
        toast.error("ERROR! Check your credentials");
        console.log(error.message, error.code);
      });
  };

  const provider = new GoogleAuthProvider();

  const loginWithGoogle = () => {
    setIsLoading(true);
    signInWithPopup(auth, provider)
      .then((result) => {
        // const user = result.user;
        setIsLoading(false);
        toast.success("Welcome back!");
        toast.success("You are using a Google account");
        redirectUser();
      })
      .catch((error) => {
        setIsLoading(false);
        toast.error("ERROR! Something went wrong!");
        console.log(error.message, error.code);
      });
  };

  const previousURL = useSelector(selectPreviousURL);

  const redirectUser = () => {
    if (previousURL.includes("cart")) {
      return navigate("/cart");
    }
    navigate("/");
  };

  return (
    <>
      {isLoading && <Loader />}
      <section
        className={`${
          window.innerWidth < 700
            ? styles.background_mobile
            : styles.login_background
        } ${styles.auth}`}
      >
        <Card cardClass={styles.auth_card}>
          <div className={` ${styles.form}`}>
            <h2>Login</h2>
            <form onSubmit={loginUser}>
              <input
                type="text"
                placeholder="Email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                placeholder="Password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <div className={styles.primary_buttons}>
                <button type="submit" className="orange_button">
                  Login
                </button>
              </div>
              <div className={styles.links}>
                <Link to="/reset">Reset Password?</Link>
              </div>
              <div className={styles.line}>
                <div />
              </div>
            </form>
            <div className={styles.primary_buttons}>
              <button onClick={loginWithGoogle}>
                <FcGoogle />
                Login With Google
              </button>
            </div>
            <span className={styles.register}>
              <p>Don't have an account?</p>
              <Link to="/register">Register</Link>
            </span>
          </div>
        </Card>
      </section>
    </>
  );
};

export default Login;
