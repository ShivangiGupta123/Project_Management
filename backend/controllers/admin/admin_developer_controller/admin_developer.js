const developer_schema = require("../../../models/admin/developer_schema");

const create_developer = async (req, res) => {
  const { developer_name } = req.body;
  try {
    const developer = new developer_schema(req.body);
    const created_developer = await developer.save();

    res.status(201).json({
      success: "true",
      data: created_developer,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "something went wrong", error: err });
  }
};
const list_of_developer = async (req, res) => {
  try {
    const result = await developer_schema.find();
    console.log(result);
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "some error is coming ", error: error });
  }
};
module.exports = { create_developer, list_of_developer };
