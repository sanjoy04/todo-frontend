import { useEffect, useState } from "react";
import styles from "./SignIn.module.css";
import { Link, useNavigate } from "react-router-dom";
// require("dotenv").config();

const API_BASE = "https://todo-backend-woad.vercel.app/";

const Index = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
        if (data.status === "error") return navigate("/login");
        navigate("/todo");
      } catch (err) {
        console.log(err);
        alert("Error logging in user");
      }
    };
    checkUser();
  }, []);

  const userLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(API_BASE + "/user/login", {
        method: "POST",
        headers: {
          Accept: "*/*",
          "Content-Type": "application/json",
        },
        credentials: "include",
        // mode: "cors",
        body: JSON.stringify({
          email,
          password,
        }),
      });
      const data = await response.json();
      if (data.status === "error") return alert(data.message);
      navigate("/todo");
    } catch (err) {
      console.log(err);
      alert("Error logging in user");
    }
  };

  return (
    <div className={styles.outer}>
      <div className={styles.container}>
        <h2 className={styles.signin_title}>Sign In</h2>
        <form className={styles.signin_form} onSubmit={userLogin}>
          <div>
            <label htmlFor="email">Email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              id="email"
              type="email"
              placeholder="user@email.com"
              name="email"
              required={true}
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
              required={true}
            />
          </div>
          <button
            className={`${styles.btn} ${styles.btn_form}`}
            type="submit"
            value="Sign In"
          >
            Sign In
          </button>
          <p>
            Don't have an account? <Link to="/register ">Sign Up</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Index;
