import axios from "axios";
import React, { useState } from "react";

function Create_developer() {
  const [Developer, setDeveloper] = useState({ developer_name: "" });

  const changevalue = (e) => {
    setDeveloper({ ...Developer, [e.target.name]: e.target.value });
  };
  const submit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3518/createdeveloper", Developer)
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
        <label>Developer name</label>
        <br></br>
        <br></br>
        <input
          type="text"
          name="developer_name"
          value={Developer.developer_name}
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

export default Create_developer;
