const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const db = require("../DataBase/models/index");
const User = db.users;
const Doctor = db.doctors;
const Patient = db.patients;
const Appointment = db.appointments;
const WorkingHours = db.workinghours;
const WorkingDays = db.workingdays;
const Review = db.reviews;

const loginAdmin = async (req, res) => {
  const { email, password } = req.body;
  const admin = await User.findOne({
    where: { email: email, isAdmin: "true" },
  });
  if (await bcrypt.compare(password, admin.password)) {
    if (admin) {
      const adminToken = jwt.sign(admin.id, "adminSecret");
      res
        .status(200)
        .json({ admin, message: "Admin logged in successfully!", adminToken });
    } else res.status(400).send("Bad request!");
  } else {
    res.status(400).send("bad request!");
  }
};

const allusers = async (req, res) => {
  const users = await User.findAll();
  res.status(200).json(users);
};

const doctorsList = async (req, res) => {
  const doctors = await Doctor.findAll();
  doctors.length
    ? res.status(200).json({ doctors, message: "here is the list of doctors" })
    : res.status(400).send("bad request or no registred doctors yet");
};
const patientsList = async (req, res) => {
  const patients = await Patient.findAll();
  patients.length
    ? res
        .status(200)
        .json({ patients, message: "here is the list of patients" })
    : res.status(400).send("bad request or no registred patients yet");
};
const allReviews = async (req, res) => {
  const reviews = await Review.findAll();
  reviews.length
    ? res.status(200).json({ reviews, message: "here are all the reviews" })
    : res.status(400).json({ message: "bad request or no reviews yet " });
};
const allAppointments = async (req, res) => {
  const appointments = await Appointment.findAll();
  appointments.length
    ? res
        .status(200)
        .json({ appointments, message: "here are all the appointments" })
    : res.status(400).json({ message: "bad request or no appointments yet " });
};
module.exports = {
  doctorsList,
  allusers,
  patientsList,
  allReviews,
  allAppointments,
  loginAdmin,
};