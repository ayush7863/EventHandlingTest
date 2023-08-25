import React, { useState } from "react";
import styles from "./Login.module.css";
import logo from "./logo.png";
import { useNavigate } from "react-router-dom";

const initialState = {
  email: "",
  name: "",
};

const Login = () => {
  const [login, setLogin] = useState(initialState);
  const navigate = useNavigate();

  let name, value;
  const handleInputs = (e) => {
    name = e.target.name;
    value = e.target.value;
    setLogin({ ...login, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:8080/user/login", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(login),
    })
      .then((res) => res.json())
      .then((res) => {
        localStorage.setItem("token", res.token);
      })
      .catch((err) => console.log(err));
    setLogin(initialState);
  };
  const handleNewAccount = () => {
    navigate("/register");
  };
  return (
    <div className={styles.container}>
      <div className={styles.logoDiv}>
        <img src={logo} alt="logo" />
      </div>
      <form className={styles.form_data} onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter Your Name"
          name="name"
          value={login.name}
          onChange={handleInputs}
        />
        <br />
        <input
          type="email"
          placeholder="Enter Email"
          name="email"
          value={login.email}
          onChange={handleInputs}
        />
        <br />
        <input type="submit" value="Login" />
      </form>
      <div className={styles.third_Div}>
        <p>OR</p>
        <button onClick={handleNewAccount}>Create New Account</button>
      </div>
    </div>
  );
};

export default Login;
