import { useEffect, useState } from "react";
import styles from "./SignUp.module.css";
import { Link, useNavigate } from "react-router-dom";
// require("dotenv").config();

const API_BASE = process.env.API_BASE || 8000;

const Index = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassowrd, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const checkUser = async () => {
      try {
        const response = await fetch(API_BASE + "/user/verify", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          mode: "cors",
        });
        const data = await response.json();
        if (data.status === "error") return navigate("/register");
        navigate("/todo");
      } catch (err) {
        console.log(err);
        alert("Error logging in user");
      }
    };
    checkUser();
  }, []);

  const registerUser = async (event) => {
    event.preventDefault();
    if (password !== confirmPassowrd) {
      alert("Passwords do not match");
      return;
    }
    try {
      const response = await fetch(API_BASE + "/user/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
          confirmPassowrd,
        }),
      });
      const data = await response.json();
      if (data.status === "error") return alert(data.message);
      navigate("/todo");
    } catch (err) {
      console.log(err);
      alert("Error registering user");
    }
  };

  return (
    <div className={styles.outer}>
      <div className={styles.container}>
        <h2 className={styles.signup_title}>Sign Up</h2>
        <form className={styles.signup_form} onSubmit={registerUser}>
          <div>
            <label htmlFor="name">Name</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              id="name"
              type="text"
              placeholder="John Deo"
              required="true"
            />
          </div>
          <div>
            <label htmlFor="email">Email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              id="email"
              type="email"
              placeholder="user@email.com"
              required="true"
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              id="password"
              type="password"
              placeholder="password"
              name="password"
              required="true"
            />
          </div>
          <div>
            <label htmlFor="password">Confirm Password</label>
            <input
              value={confirmPassowrd}
              onChange={(e) => setConfirmPassword(e.target.value)}
              id="password"
              type="password"
              placeholder="password"
              name="password"
              required="true"
            />
          </div>
          <button
            className={`${styles.btn} ${styles.btn_form}`}
            type="submit"
            value="Sign Up"
          >
            Create account
          </button>
          <p>
            Already have an account? <Link to="/login ">Sign In</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Index;
