const mongoose = require("mongoose");
const schema = new mongoose.Schema({
  developer_name: { type: String, required: true },
});
module.exports = mongoose.model("Developer", schema);
