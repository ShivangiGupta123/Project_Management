import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

function Verified_signin() {
  const [searchParams] = useSearchParams();
  const [verify_res, setVerify_res] = useState([]);
  const [verify_result, setVerify_result] = useState([]);
  const token = searchParams.get("token");
  const navigate = useNavigate();
  useEffect(() => {
    verify();
  }, []);
  const submit = (e) => {
    e.preventDefault();
    setTimeout(() => {
      navigate("/dashboard");
    }, 1000);
  };
  const verify = async () => {
    let res = await axios.get(
      `http://localhost:3518/verifiedsignin?token=${encodeURIComponent(token)}`
    );
    setVerify_res(res.data.message);
    setVerify_result(res.data.data);
    console.log("res", res);
    console.log("res.data", res.data);
    console.log("res.data.data", res.data.data);
    console.log("res.data.message", res.data.message);
    localStorage.setItem("token", token);
  };
  console.log("verify_res", verify_res);
  return (
    <div style={{ border: "3px solid", padding: 30, margin: 30 }}>
      <form onSubmit={submit}>
        <label>Email</label>
        <br></br>
        <br></br>
        <input type="email" value={verify_result.email} />
        <br></br>
        <br></br>
        <label>Password</label>
        <br></br>
        <br></br>
        <input type="password" value={verify_result.password} />
        <br></br>
        <br></br>
        <button>Login</button>
        <br></br>
        <br></br>
        <p style={{ color: "green" }}>{verify_res}</p>
        <br></br>
        <br></br>
      </form>
    </div>
  );
}

export default Verified_signin;
