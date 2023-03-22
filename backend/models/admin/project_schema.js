const mongoose = require("mongoose");
const schema = new mongoose.Schema({
  project_name: { type: String, required: true },
  developer: [
    {
      _id: false,
      developer_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "developers",
        default: null,
      },
    },
  ],
});
module.exports = mongoose.model("Project", schema);
