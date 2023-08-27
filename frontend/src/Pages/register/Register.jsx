import React, { useState } from "react";
import styles from "./register.module.css";
import logo from "../log/logo.png";
import { useNavigate } from "react-router-dom";
const initialState = {
  email: "",
  name: "",
};

const Register = () => {
  const [register, setRegister] = useState(initialState);
  const navigate = useNavigate();
  let name, value;
  const handleInputs = (e) => {
    name = e.target.name;
    value = e.target.value;
    setRegister({ ...register, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("https://event-handling.onrender.com/user/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(register),
    })
      .then((res) => {
        if (res.status === 200) {
          alert("Registration Successful !");
          navigate("/");
        }
      })
      .catch((error) => console.log(error));
  };
  const AllReadyHaveAccount = () => {
    navigate("/");
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
          value={register.name}
          onChange={handleInputs}
        />
        <br />
        <input type="text" placeholder="Enter Your Last Name" />
        <br />
        <input
          type="email"
          placeholder="Enter Email"
          name="email"
          value={register.email}
          onChange={handleInputs}
        />
        <br />
        <input type="submit" value="Register" />
      </form>
      <div className={styles.third_Div}>
        <p>OR</p>
        <button onClick={AllReadyHaveAccount}>All Ready Have Account ?</button>
      </div>
    </div>
  );
};

export default Register;
