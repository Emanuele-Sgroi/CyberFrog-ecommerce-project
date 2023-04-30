import { useState } from "react";
import styles from "./auth.module.scss";
import { Link, useNavigate } from "react-router-dom";
import Card from "../../components/card/Card";
import { toast } from "react-toastify";
import { auth } from "../../firebase/config";
import { sendPasswordResetEmail } from "firebase/auth";
import Loader from "../../components/loader/Loader";

const Reset = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const resetPassword = (e) => {
    e.preventDefault();
    setIsLoading(true);

    sendPasswordResetEmail(auth, email)
      .then(() => {
        setIsLoading(false);
        toast.success("The reset password link has been sent to " + email);
        navigate("/login");
      })
      .catch((error) => {
        setIsLoading(false);
        toast.error("ERROR! We could not find this email address");
        console.log(error.message, error.code);
      });
  };

  return (
    <>
      {isLoading && <Loader />}
      <section
        className={`${
          window.innerWidth < 700
            ? styles.background_mobile
            : styles.forgot_background
        } ${styles.auth}`}
      >
        <Card cardClass={styles.auth_card}>
          <div className={`background-auth ${styles.form}`}>
            <h2>Reset Password</h2>
            <form onSubmit={resetPassword}>
              <input
                type="text"
                placeholder="Email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <div className={styles.primary_buttons}>
                <button type="submit">Reset Password</button>
              </div>
            </form>
            <div className={styles.reset_bottom_links}>
              <Link to="/login">
                <button>Login</button>
              </Link>
              <Link to="/register">
                <button>Register</button>
              </Link>
            </div>
          </div>
        </Card>
      </section>
    </>
  );
};

export default Reset;
