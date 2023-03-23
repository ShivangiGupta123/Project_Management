import axios from "axios";

import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

function Single_project_details() {
  const [isChecked, setIsChecked] = useState(false);
  const [count, setCount] = useState(0);
  const [projectData, setProjectData] = useState([]);
  const [viewProjectData, setViewProjectData] = useState([]);
  const [developerData, setDeveloperData] = useState([]);
  const [selectedDev, setSelectedDev] = useState([]);
  // const [unique, setUnique] = useState([]);
  // const [result, setResult] = useState([]);
  const { id } = useParams();
  console.log("id", id);

  const [isOpen, setIsOpen] = useState(false);

  //View List of Developer Data

  useEffect(() => {
    // console.log("!isOpen", !isOpen);
    if (isOpen) {
      //if isOpen is true then it show the developer list
      developer();
    }
  }, [isOpen]);
  const developer = () => {
    axios
      .get("http://localhost:3518/listofdeveloper")
      .then((res) => {
        console.log("res.........", res.data);

        setDeveloperData(res.data);
        setIsOpen(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //View  Single Project Data

  useEffect(() => {
    axios
      .get(`http://localhost:3518/listofproject/${id}`)
      .then((res) => {
        console.log("res view >>>", res);

        console.log("res.data view>>>", res.data);

        setViewProjectData(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [projectData]);

  /** Handle checkbox when marked or unmarked */

  const handle = (e, dev_id) => {
    if (e.target.checked) {
      console.log("checked value is", e.target.checked);
      setSelectedDev((p) => (p = [...p, { developer_id: dev_id }]));
      setIsChecked(true);
      setCount(count + 1);
      // const result = viewProjectData.map((element) => {
      //   return { developer_id: element.Developer_Details._id };
      // });
      // console.log("result >>", result);
      // console.log("...result >>", ...result);

      // Array.prototype.push.apply(result, selectedDev); //merge selected and database data
      // console.log("fdvjhwevdj", result);
      // const jsonObject = result.map(JSON.stringify);
      // console.log("jsonObject >>", jsonObject);
      // setUnique(Array.from(new Set(jsonObject)).map(JSON.parse));

      // setUnique([new Set([...result], [...selectedDev])]);

      console.log("selectedDev%%%", selectedDev);

      return { isChecked, count, selectedDev };
    } else {
      setIsChecked(false);
      console.log("unchecked >>>", isChecked);

      console.log("selectedDev", selectedDev);
      console.log("dev_id>>", dev_id);

      let index = selectedDev.findIndex(
        (element) => element.developer_id == { developer_id: dev_id }
      ); //ticket and then untick for that basis using this logics
      console.log("index", index);

      if (index > -1) {
        selectedDev.splice(index, 1);
        setSelectedDev(selectedDev);
      }
      console.log("selectedDev@@@@@@@", selectedDev);

      setCount(count - 1);
      console.log("unchecked", isChecked);
      return { isChecked, count };
    }
  };

  // addding developer when marked developer on that project

  const Adding_Developer = (e, id) => {
    if (isChecked === true || count !== 0) {
      console.log("id>>> checked", id);
      console.log("selectedId>>", selectedDev);
      console.log("viewProjectData", viewProjectData);

      // console.log("unique ##", unique);

      // const db = [...unique].map((element) => {
      //   console.log("element", element);
      //   return { developer_id: element };
      // });
      // console.log("db", db);
      axios
        .post(`http://localhost:3518/listofproject/${id}`, selectedDev)
        .then((res) => {
          setProjectData(res.data);
          console.log("res.data @@@", res.data);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      alert("please fill");
    }
  };
  // console.log("unique ##", unique);

  return (
    <div style={{ border: "3px solid", padding: 20, margin: 20 }}>
      <br></br>
      <button onClick={() => setIsOpen(!isOpen)}>Developer</button>
      <br></br>
      <br></br>

      {isOpen && (
        <div>
          {(developerData || []).map((item) => {
            return (
              <div className="row">
                <div className="col">
                  <input
                    type="checkbox"
                    value={
                      selectedDev.findIndex(
                        (ele) => ele.developer_id == item._id
                      ) > -1
                        ? true
                        : false
                    }
                    onChange={(e) => handle(e, item._id)}
                  />
                </div>
                <div className="col">
                  <p>{item.developer_name}</p>
                </div>
                <div className="col">
                  <p>{item._id}</p>
                </div>
              </div>
            );
          })}

          <button onClick={(e) => Adding_Developer(e, id)}>Add</button>
        </div>
      )}

      <h4>List of Added Developer in this Project</h4>
      {viewProjectData.map((element) => {
        return (
          <div className="row">
            <div className="col">
              <p>{element.Developer_Details._id}</p>
            </div>
            <div className="col">
              <p>{element.Developer_Details.developer_name}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Single_project_details;

// import axios from "axios";

// import React, { useEffect, useState } from "react";
// import { Link, useParams } from "react-router-dom";

// function Single_project_details() {
//   const [isChecked, setIsChecked] = useState(false);

//   const [developerId, setDeveloperId] = useState("");

//   const [count, setCount] = useState(0);
//   const [projectData, setProjectData] = useState([]);
//   const [developerData, setDeveloperData] = useState([]);
//   const [selectedDev, setSelectedDev] = useState([]);
//   const { id } = useParams();
//   console.log("id", id);

//   useEffect(() => {
//     axios
//       .get(`http://localhost:3518/listofproject/${id}`)
//       .then((res) => {
//         console.log("res.data >>>", res.data);
//         // console.log("res.data>>", res.data);
//         setProjectData(res.data);
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   }, []);
//   const handle = (e, dev_id) => {
//     if (e.target.checked) {
//       console.log("checked value is", e.target.checked);
//       setSelectedDev((p) => (p = [...p, { developer_id: dev_id }]));
//       setIsChecked(true);
//       setCount(count + 1);

//       // setDeveloperId(dev_id);

//       // console.log("checked", isChecked);
//       // console.log("count checked", count);
//       // console.log("developerId", developerId);
//       console.log("selectedDev%%%", selectedDev);

//       return { isChecked, count, selectedDev };
//     } else {
//       setIsChecked(false);
//       console.log("selectedDev", selectedDev);
//       console.log("dev_id>>", dev_id);

//       let index = selectedDev.findIndex((element) => element == dev_id); //ticket and then untick for that basis using this logics
//       console.log("index", index);

//       if (index > -1) {
//         selectedDev.splice(index, 1);
//         setSelectedDev(selectedDev);
//         console.log("selectedDev@@@@@@@", selectedDev);
//       }

//       setCount(count - 1);
//       console.log("unchecked", isChecked);
//       return { isChecked, count };
//     }
//   };
//   // console.log("id", id);
//   // console.log("developerId", developerId);

//   const Adding_Developer = (e, id) => {
//     if (isChecked === true || count !== 0) {
//       console.log("id>>> checked", id);
//       console.log("selectedId>>", selectedDev);

//       axios
//         .post(`http://localhost:3518/listofproject/${id}`, {
//           developer: selectedDev,
//         })
//         .then((res) => {
//           setProjectData(res.data);
//           console.log("res.data @@@", res.data);
//         })
//         .catch((error) => {
//           console.log(error);
//         });
//     } else {
//       alert("please fill");
//     }
//   };

//   const Developer = () => {
//     axios
//       .get("http://localhost:3518/listofdeveloper")
//       .then((res) => {
//         console.log("res.........", res.data);

//         setDeveloperData(res.data);
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   };

//   // console.log("get", developerData);

//   return (
//     <div style={{ border: "3px solid", padding: 20, margin: 20 }}>
//       <h1>{projectData.project_name}</h1>
//       <br></br>
//       <br></br>
//       <button onClick={Developer}>Developer</button>
//       <br></br>
//       <br></br>

//       {developerData.map((item) => {
//         return (
//           <div className="row">
//             <div className="col">
//               <input
//                 type="checkbox"
//                 value={item.name}
//                 onChange={(e) => handle(e, item._id)}
//               />
//             </div>
//             <div className="col">
//               <p>{item.developer_name}</p>
//             </div>
//             <div className="col">
//               <p>{item._id}</p>
//             </div>
//           </div>
//         );
//       })}

//       <button onClick={(e) => Adding_Developer(e, id)}>Add</button>
//     </div>
//   );
// }

// export default Single_project_details;
