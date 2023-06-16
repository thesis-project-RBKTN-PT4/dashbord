const express = require("express");
const router = express.Router();
const doctor = require("../Controllers/doctors");
const patient = require("../Controllers/patients");
const user = require("../Controllers/users");
const admin = require("../Controllers/admin");

router.post("/login", admin.loginAdmin);
router.get("/users", admin.allusers);
router.get("/doctors", admin.doctorsList);
router.get("/doctorsList", admin.doctorsList);

router.get("/patients", admin.patientsList);
router.delete("/user/:id", user.deleteUser);
router
  .route("/reviews")
  .get(admin.allReviews)
  // .delete(patient.deleteReview);
router.get("/appointments", admin.allAppointments);
module.exports = router;