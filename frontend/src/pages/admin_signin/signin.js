import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Signin() {
  const [signin_data, setSignin_data] = useState({ email: "", password: "" });
  const change_value = (e) => {
    setSignin_data({ ...signin_data, [e.target.name]: e.target.value });
  };
  const submit = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:3518/adminsignin", signin_data)
      .then((res) => {
        console.log("res.data", res.data);
        toast.success("check mail message send in your mail", {
          position: toast.POSITION.TOP_CENTER,
        });
      })
      .catch((error) => {
        console.log(error);
        console.log(error.response.data.message);
        toast.success(JSON.stringify(error.response.data.message), {
          position: toast.POSITION.TOP_CENTER,
        });
      });
  };
  return (
    <div>
      <form
        onSubmit={submit}
        style={{ border: "3px solid", padding: 30, margin: 30 }}
      >
        <label>Email</label>
        <br></br>
        <input
          type="email"
          name="email"
          value={signin_data.email}
          onChange={change_value}
        />
        <br></br>
        <br></br>
        <label>Password</label>
        <br></br>
        <input
          type="password"
          name="password"
          value={signin_data.password}
          onChange={change_value}
        />
        <br></br>
        <br></br>
        <button>Login</button>
        <ToastContainer autoClose={10000} />

        <br></br>
        <br></br>
        <Link to="/">Signup</Link>
      </form>
    </div>
  );
}

export default Signin;
