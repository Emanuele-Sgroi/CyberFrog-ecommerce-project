import { useRef } from "react";
import Card from "../../components/card/Card";
import styles from "./Contact.module.scss";
import emailjs from "@emailjs/browser";
import { toast } from "react-toastify";
import { images } from "../../constants";

const Contact = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();
    console.log(form.current);

    emailjs
      .sendForm(
        process.env.REACT_APP_EMAILJS_SERVICE_ID,
        "template_5457ixk",
        form.current,
        "02NEV85HSeVMzUTzB"
      )
      .then(
        (result) => {
          toast.success("Message sent successfully");
        },
        (error) => {
          toast.error("ERROR! Something went wrong");
        }
      );
    e.target.reset();
  };

  return (
    <section className={styles.contact_main_container}>
      <Card cardClass={styles.contact_container}>
        <h2>Contact Us</h2>
        <p>Fill the form below or contact us via other channels listed below</p>
        <div className={styles.channels_container}>
          <div className={styles.contact_social}>
            <a
              href="https://en-gb.facebook.com/"
              rel="noreferrer"
              target="_blank"
            >
              <img src={images.facebook} alt="facebook" />
            </a>
            <a
              href="https://www.instagram.com/"
              rel="noreferrer"
              target="_blank"
            >
              <img src={images.instagram} alt="instagram" />
            </a>
            <a href="https://www.tiktok.com/" rel="noreferrer" target="_blank">
              <img src={images.tiktok} alt="tiktok" />
            </a>
          </div>
          <div className={styles.contact_info}>
            <p>+44 077 34667182</p>
            <p>cyberfrog.contact@gmail.com</p>
          </div>
        </div>
        <div className={styles.contact_line} />

        <form ref={form} onSubmit={sendEmail}>
          <label>Name</label>
          <input
            type="text"
            name="user_name"
            placeholder="Full Name"
            required
          />
          <label>Email</label>
          <input
            type="email"
            name="user_email"
            placeholder="Your active email"
            required
          />
          <label>Subject</label>
          <input type="text" name="subject" placeholder="Subject" required />
          <label>Message</label>
          <textarea name="message" cols="30" rows="10"></textarea>
          <div>
            <button type="submit" className={styles.contact_submit_btn}>
              Send Message
            </button>
          </div>
        </form>
      </Card>
    </section>
  );
};

export default Contact;
