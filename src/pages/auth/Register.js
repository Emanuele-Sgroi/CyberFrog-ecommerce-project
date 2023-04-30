import { useState } from "react";
import styles from "./auth.module.scss";
import { Link, useNavigate } from "react-router-dom";
import Card from "../../components/card/Card";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/config";
import Loader from "../../components/loader/Loader";
import { AiOutlineExclamationCircle } from "react-icons/ai";

const Register = () => {
  //useState section
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cPassword, setCPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const registerUser = (event) => {
    event.preventDefault();

    if (password !== cPassword) {
      toast.error("ERROR! Passwords do not match");
    } else {
      setIsLoading(true);

      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          console.log(user);
          setIsLoading(false);
          toast.success("Account created successfully");
          navigate("/login");
        })
        .catch((error) => {
          if (error.message.includes("auth/weak-password")) {
            toast.error("Password must be at least 6 characters long");
          } else if (error.message.includes("auth/invalid-email")) {
            toast.error("Invalid email address");
          } else {
            toast.error(
              "Sorry, the server is currently down. Please try again later."
            );
          }

          console.log(error.message);
          console.log(error.code);
          setIsLoading(false);
        });
    }
  };

  return (
    <>
      {isLoading && <Loader />}
      <section
        className={`${
          window.innerWidth < 700
            ? styles.background_mobile
            : styles.register_background
        } ${styles.auth}`}
      >
        <Card cardClass={styles.auth_card}>
          <div className={`background-auth ${styles.form}`}>
            <h2>Register</h2>
            <form onSubmit={registerUser}>
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
              <div className={styles.password_info}>
                <AiOutlineExclamationCircle />
                <p>Minimum 6 characters long.</p>
              </div>
              <input
                type="password"
                placeholder="Confirm Password"
                required
                value={cPassword}
                onChange={(e) => setCPassword(e.target.value)}
              />
              <div className={styles.primary_buttons}>
                <button type="submit">Sign Up</button>
              </div>
            </form>
            <span className={styles.register}>
              <p>Already have an account?</p>
              <Link to="/login">Login</Link>
            </span>
          </div>
        </Card>
      </section>
    </>
  );
};

export default Register;
