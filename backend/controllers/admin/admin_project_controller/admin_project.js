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
const single_project_by_id = async (req, res) => {
  console.log("id-----", req.params.id);
  try {
    const id = req.params.id;
    // const result = await project_schema.findOne({
    //   _id: id,
    // });
    const result = await project_schema.findById(id);
    console.log(result);
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "some error is coming ", error: error });
  }
};
module.exports = { create_project, list_of_project, single_project_by_id };
