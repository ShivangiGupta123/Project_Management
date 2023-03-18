import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function List_of_project() {
  const [list_project, setList_project] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:3518/listofproject")
      .then((res) => {
        console.log("res", res);
        console.log("res.data", res.data);

        setList_project(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      <h1>List of Projects </h1>
      {list_project.map((item) => {
        return (
          <div style={{ border: "2px solid ", padding: 5, margin: 5 }}>
            <Link to={`/project/${item._id}`}>{item.project_name}</Link>
          </div>
        );
      })}
    </div>
  );
}

export default List_of_project;
