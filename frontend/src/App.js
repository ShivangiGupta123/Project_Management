import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Dashboard from "./pages/components/admin/Dashboard";
// import Signin from "./pages/components/admin/Signin";
// import Signup from "./pages/components/admin/Signup";
// import VerifySignup from "./pages/verifiedsignup";
import Signup from "./pages/admin_signup/signup";
import Verify_signup from "./pages/admin_signup/verified_signup";
import Dashboard from "./pages/admin_dashboard/dashboard";
import Signin from "./pages/admin_signin/signin";
import Verified_signin from "./pages/admin_signin/verified_signin";
import Create_project from "./pages/admin_project/create_project";
import List_of_project from "./pages/admin_project/list_of_project";
import Create_developer from "./pages/admin_developer/create_developer";
import Single_project_details from "./pages/admin_project/single_project_details";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/verifiedsignin" element={<Verified_signin />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/verifiedsignup" element={<Verify_signup />} />
          <Route path="/createproject" element={<Create_project />} />
          <Route path="/createdeveloper" element={<Create_developer />} />
          <Route path="/listofproject" element={<List_of_project />} />
          <Route path="/project/:id" element={<Single_project_details />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
