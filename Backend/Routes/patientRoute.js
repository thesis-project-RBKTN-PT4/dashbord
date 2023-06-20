const express = require("express");
const router = express.Router();
const patient = require("../Controllers/patients");

router.get("/booking/:id", patient.myAppointmentsHistory);
router
  .route("/booking")
  .post(patient.MakeAppointment)
  .put(patient.modifyAppointment)
  .delete(patient.deleteAppointment);
router.post("/review", patient.addreview);
router
  .route("/review/:id")
  .get(patient.getMyReviews)
  .put(patient.updateReview)
  .delete(patient.deleteReview);
router.put("/:id",patient.updatePatientProfile)
module.exports = router;