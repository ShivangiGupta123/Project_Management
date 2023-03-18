const mongoose = require("mongoose");
const schema = new mongoose.Schema({
  project_name: { type: String, required: true },
});
module.exports = mongoose.model("Project", schema);
