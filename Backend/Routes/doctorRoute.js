const express = require("express");
const router = express.Router();
const doctor = require("../Controllers/doctors");
const patient = require("../Controllers/patients");
const admin = require("../Controllers/admin");

router.post("/", doctor.loginDoctor);
router
  .route("/workdays/:id")
  .get(doctor.getWorkingDaysByDoctorId)
  .delete(doctor.deleteWorkingDays);
router.put("/:id",doctor.updateDoctorProfile);
router.post("/workdays",  doctor.addWorkingDays);
router.post("/workhours",  doctor.addWorkingHours);

router
  .route("/workhours/:id")
  .get(doctor.getWorkingHoursByDoctorId)
  .put(doctor.updateWorkingHours);
router.post("/appointment", patient.MakeAppointment);
router
  .route("/appointments/:id")
  .get(doctor.allAppointments)
  .delete(patient.deleteAppointment);
// router.delete(
//   "/appointments",
//   doctor.deleteMultipleAppointmlents
// );
router.get("/all", admin.doctorsList);

module.exports = router;