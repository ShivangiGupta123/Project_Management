import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { Link } from "react-router-dom";

function Signup() {
  const [signup_data, setSignup_data] = useState({
    name: "",
    email: "",
    password: "",
    mobile: "",
    company_name: "",
    website_url: "",
  });

  const change_value = (e) => {
    setSignup_data({ ...signup_data, [e.target.name]: e.target.value });
  };

  const handle_submit = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:3518/adminsignup", signup_data)
      .then((res) => {
        console.log("res.data", res.data);
        toast.success("check mail message send in your mail", {
          position: toast.POSITION.TOP_CENTER,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <form
        onSubmit={handle_submit}
        style={{ border: "3px solid black", padding: 10, margin: 50 }}
      >
        <label>Name</label>
        <br></br>
        <input
          type="text"
          name="name"
          value={signup_data.name}
          onChange={change_value}
          required
        />
        <br></br>
        <br></br>
        <label>Email</label>
        <br></br>
        <input
          type="email"
          name="email"
          value={signup_data.email}
          onChange={change_value}
          required
        />
        <br></br>
        <br></br>
        <label>Password</label>
        <br></br>
        <input
          type="password"
          name="password"
          value={signup_data.password}
          onChange={change_value}
          required
        />
        <br></br>
        <br></br>
        <label>Mobile</label>
        <br></br>
        <input
          type="text"
          name="mobile"
          value={signup_data.mobile}
          onChange={change_value}
          required
        />
        <br></br>
        <br></br>
        <label>Company Name</label>
        <br></br>
        <input
          type="text"
          name="company_name"
          value={signup_data.company_name}
          onChange={change_value}
          required
        />
        <br></br>
        <br></br>
        <label>Website Url</label>
        <br></br>
        <input
          type="text"
          name="website_url"
          value={signup_data.website_url}
          onChange={change_value}
          required
        />
        <br></br>
        <br></br>
        <button>Signup</button>
        <ToastContainer autoClose={10000} />
        <br></br>
        <br></br>
        <Link to="/signin">Signin</Link>
      </form>
    </div>
  );
}

export default Signup;
