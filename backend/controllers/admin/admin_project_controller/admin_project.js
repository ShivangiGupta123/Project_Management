const project_schema = require("../../../models/admin/project_schema");
const mongoose = require("mongoose");
const create_project = async (req, res) => {
  const { project_name } = req.body;
  try {
    const project = new project_schema(req.body);
    const created_project = await project.save();

    res.status(201).json({
      message: "project is created successfully",
      data: created_project,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "something went wrong", error: err });
  }
};
const list_of_project = async (req, res) => {
  try {
    const result = await project_schema.find();
    console.log(result);
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "some error is coming ", error: error });
  }
};
const adding_developer_in_project = async (req, res) => {
  console.log("id-----", req.params.id);
  try {
    const id = req.params.id;

    const req_body_developer = req.body.developer;

    const project_details = await project_schema.findById(id);

    console.log("project_details", project_details);
    // console.log("project_details.developer", project_details.developer);
    // console.log("...project_details.developer", ...project_details.developer);

    // console.log("req_body_developer", req_body_developer);
    console.log("...req_body_developer", ...req_body_developer);

    await project_details.developer.push(...req_body_developer);

    // console.log("updated project.developer", project_details.developer);

    await project_schema.findByIdAndUpdate(id, project_details);
    console.log("updated project_details", project_details);

    res.status(200).json(project_details);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "some error is coming ", error: error });
  }
};

const view_developer_in_project = async (req, res) => {
  try {
    const id = req.params.id;

    const response = await project_schema.aggregate([
      {
        $match: {
          _id: new mongoose.Types.ObjectId(id),
        },
      },
      { $unwind: "$developer" },
      {
        $lookup: {
          from: "developers",
          localField: "developer.developer_id",
          foreignField: "_id",
          as: "Developer_Details",
        },
      },
      { $unwind: "$Developer_Details" },
      {
        $project: {
          _id: 0,
          "Developer_Details.developer_name": 1,
          "Developer_Details._id": 1,
          project_name: 1,
        },
      },
    ]);

    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "some error is coming ", error: error });
  }
};

module.exports = {
  create_project,
  list_of_project,
  adding_developer_in_project,
  view_developer_in_project,
};

// project.aggregate(
//   [
//     {
//       $lookup: {
//         from: "developers",
//         localField: "developer.developer_id",
//         foreignField: "_id",
//         as: "Developer_Details",
//       },
//     },
//     { $unwind: "$Developer_Details" },
//     {
//       $project: {
//         _id: 0,
//         "Developer_Details.developer_name": 1,
//         "Developer_Details._id": 1,
//       },
//     },
//   ],
//   (err, result) => {
//     if (err) {
//       res.send(err);
//     } else {
//       console.log(result);
//     }
//   }
//   );
