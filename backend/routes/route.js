const express = require("express");
const router = express.Router();
const {
  admin_signup,
  verified_signup,
} = require("../controllers/admin/admin_signup_controller/admin_signup");
const {
  admin_signin,
  verified_signin,
} = require("../controllers/admin/admin_signin_controller/admin_signin");
const admin_dashboard = require("../controllers/admin/admin_dashboard_controller/admin_dashboard");
const {
  list_of_project,
  create_project,
  adding_developer_in_project,
  view_developer_in_project,
} = require("../controllers/admin/admin_project_controller/admin_project");
const {
  create_developer,
  list_of_developer,
} = require("../controllers/admin/admin_developer_controller/admin_developer");
router.post("/adminsignup", admin_signup);
router.get("/verifiedsignup", verified_signup);
router.post("/adminsignin", admin_signin);
router.get("/verifiedsignin", verified_signin);
router.get("/dashboard", admin_dashboard);
router.post("/createproject", create_project);
router.get("/listofproject", list_of_project);
router.post("/listofproject/:id", adding_developer_in_project);
router.get("/listofproject/:id", view_developer_in_project);
router.post("/createdeveloper", create_developer);
router.get("/listofdeveloper", list_of_developer);

module.exports = router;
