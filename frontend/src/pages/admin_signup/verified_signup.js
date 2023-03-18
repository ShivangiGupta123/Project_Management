import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

function Verify_signup() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  // const [res, setRes] = useState(null);
  const [verifyResult, setVerifyResult] = useState([]);
  const [verifyRes, setVerifyRes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      verify();
    }
  }, [token]);
  const submit = (e) => {
    e.preventDefault();
    setTimeout(() => {
      navigate("/dashboard");
    }, 1000);
  };

  const verify = async () => {
    let res = await axios.get(
      `http://localhost:3518/verifiedsignup?token=${encodeURIComponent(token)}`
    );

    console.log("res ", res);
    console.log("res.data ", res.data);
    console.log("res.data.message ", res.data);

    setVerifyResult(res.data.response_body);
    setVerifyRes(res.data.message);
    localStorage.setItem("token", token);

    // if (res?.data?.message) {
    //   console.log("res.data.response_body", res.data.response_body);
    //   setVerifyResult(res.data);
    //   localStorage.setItem("token", token);
    //   navigate("/dash");
    // }
  };
  console.log("verify_result 1", verifyResult);

  return (
    <div>
      <div style={{ border: "3px solid", padding: 30, margin: 30 }}>
        <form onSubmit={submit}>
          <label>Email</label>
          <br></br>
          <br></br>
          <input type="email" value={verifyResult.email} />
          <br></br>
          <br></br>
          <label>Password</label>
          <br></br>
          <br></br>
          <input type="password" value={verifyResult.password} />

          <br></br>
          <br></br>
          <button>Login</button>
          <br></br>
          <br></br>
          <p style={{ color: "green" }}>{verifyRes}</p>
        </form>
      </div>
    </div>
  );
}

export default Verify_signup;

// {console.log("verify_result >>>>>>", verify_result)}
//       VerifySignup Email : {verify_result && verify_result.response_body.email}
//       {console.log(
//         "verify_result && verify_result.response_body.email",
//         verify_result && verify_result.response_body.email
//       )}
//       Account : {verify_result && verify_result.message}

// axios.get(`http://localhost:3518/verifiedsignup?token=${encodeURIComponent(token)}`).then((resp)=>{
//     if(token){
//         setRes(resp.data)
//     console.log("resp.data" , resp.data)
//     localStorage.setItem("token",resp.data?.response_body?.token)
//     navigate("/")
//     }

// }).catch((err)=>{
//     console.log("error >>" , err)
// })

// import axios from 'axios';
// import React, { useEffect, useState } from 'react';
// import { useNavigate, useSearchParams } from 'react-router-dom';

// function VerifySignup() {
//     const [searchParams] = useSearchParams();
// const token = searchParams.get('token');
// const [res,setRes]=useState(null)
// const navigate=useNavigate();
//     useEffect(()=>{
//         (async()=>{
//             let res=await axios.get(`http://localhost:3518/verifiedsignup?token=${encodeURIComponent(token)}`)
//             console.log(res)
//             if(res?.data){
//                 setRes(res.data)
//                 localStorage.setItem("token",res.data?.response_body?.token)
//                 navigate("/")
//             }
//         })()
//     },[token])
//     return (
//         <div>
//         VerifySignup
//         Email : { res && res.response_body.email}
//         Account : {res && res.message}
//         </div>
//     );
// }

// export default VerifySignup;
