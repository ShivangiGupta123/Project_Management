import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function Single_project_details() {
  const [projectData, setProjectData] = useState([]);
  const [developerData, setDeveloperData] = useState([]);
  const { id } = useParams();
  console.log("id", id);
  useEffect(() => {
    axios
      .get(`http://localhost:3518/listofproject/${id}`)
      .then((res) => {
        console.log("res.data >>>", res.data);
        // console.log("res.data>>", res.data);
        setProjectData(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  useEffect(() => {
    axios
      .get("http://localhost:3518/listofdeveloper")
      .then((res) => {
        console.log("res.........", res.data);

        // console.log("res.data>>", res.data);
        setDeveloperData(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  console.log("get", developerData);

  return (
    <div style={{ border: "3px solid", padding: 20, margin: 20 }}>
      <h1>{projectData.project_name}</h1>

      {developerData.map((item) => {
        return (
          <div>
            <input type="checkbox" />
            <p>{item.developer_name}</p>
            <button>Add</button>
          </div>
        );
      })}
    </div>
  );
}

export default Single_project_details;
