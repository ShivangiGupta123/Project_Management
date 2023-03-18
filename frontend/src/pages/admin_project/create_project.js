import axios from "axios";
import React, { useState } from "react";

function Create_project() {
  const [Project, setProject] = useState({ project_name: "" });

  const changevalue = (e) => {
    setProject({ ...Project, [e.target.name]: e.target.value });
  };
  const submit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3518/createproject", Project)
      .then((res) => {
        console.log("res", res);
        console.log("res.data", res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <form
        onSubmit={submit}
        style={{ border: "3px solid", padding: 30, margin: 30 }}
      >
        <h1>Create Project</h1>
        <label>Project name</label>
        <br></br>
        <br></br>
        <input
          type="text"
          name="project_name"
          value={Project.project_name}
          onChange={changevalue}
        />
        <br></br>
        <br></br>
        <button>Create</button>
        <br></br>
        <br></br>
      </form>
    </div>
  );
}

export default Create_project;
