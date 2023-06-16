const bcrypt = require("bcrypt");
const db = require("../DataBase/models/index");
const User = db.users;
const Doctor = db.doctors;

const Appointment = db.appointments;

const WorkingHours = db.workinghours;
const WorkingDays = db.workingdays;
const jwt = require("jsonwebtoken");

const loginDoctor = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ where: { email: email } });
  if (user) {
    if (bcrypt.compare(password, user.password)) {
      const doctor = await Doctor.findOne({ where: { user_id: user.id } });
      const token = jwt.sign({ user_id: user.id }, "doctorSecret");
      res
        .status(200)
        .json({ doctor, message: "Doctor logged in successfully!", token });
    }
  }
};

const updateDoctorProfile = async (req, res) => {
  const id = req.params.id; // doctor id
  const {
    picture,
    y_coordinate,
    x_coordinate,
    about,
    address,
    specialization,
    experience,
  } = req.body;
  const currentProfile = await Doctor.findByPk(id);
  if (currentProfile) {
    const newProfile = await currentProfile.update({
      picture,
      y_coordinate,
      x_coordinate,
      about,
      address,
      specialization,
      experience,
    });
    res
      .status(200)
      .json({ newProfile, message: "profile updated successfully" });
  } else res.status(400).send("something wrong!");
};
// workdays controllers functions

const getWorkingDaysByDoctorId = async (req, res) => {
  const id = req.params.id;
  const workdays = await WorkingDays.findAll({ where: { doctor_id: id } });
  if (workdays.length)
    res.status(200).json({ workdays, message: "here are your working days!" });
  else res.send("you did not add any working days  ");
};

const addWorkingDays = async (req, res) => {
  const { day, doctor_id } = req.body;
  const duplicate = await WorkingDays.findOne({
    where: { day_of_week: day, doctor_id: doctor_id },
  });
  if (duplicate) {
    res.status(400).send("day already exist!");
  } else {
    const workingday = await WorkingDays.create({
      day_of_week: day,
      doctor_id: doctor_id,
    });
    if (workingday) {
      res.status(200).json({ workingday, message: "workingdays added!" });
    } else {
      res.status(400).send("missing inputs");
    }
  }
};

const deleteWorkingDays = async (req, res) => {
  const id = req.params.id; //day id
  const day = await WorkingDays.findByPk(id);
  if (day) {
    await day.destroy();
    res
      .status(200)
      .json({ day, message: "day and related hours deleted successfully !" });
  } else res.status(400).send("target day does not exist");
};
//----------------------------------------------
//----------------------------------------------
// workinghours controllers functions
const getWorkingHoursByDoctorId = async (req, res) => {
  const id = req.params.id;
  const workhours = await WorkingHours.findAll({ where: { doctor_id: id } });
  if (workhours.length)
    res
      .status(200)
      .json({ workhours, message: "here are your working Hours!" });
  else res.send("you did not add any working hours schedule yet");
};

const addWorkingHours = async (req, res) => {
  const { end_time, start_time, day_id, doctor_id } = req.body;

  const duplicate = await WorkingHours.findOne({
    where: {
      day_id: day_id,
      doctor_id: doctor_id,
      end_time: end_time,
      start_time: start_time,
    },
  });
  if (duplicate) {
    res.status(400).send("hours already exist!");
  } else {
    const workinghours = await WorkingHours.create({
      day_id: day_id,
      doctor_id: doctor_id,
      end_time: end_time,
      start_time: start_time,
    });

    if (workinghours) {
      res
        .status(200)
        .json({ workinghours, message: "working hours added successfully!" });
    } else {
      res.status(400).send("Invalid or missing inputs!");
    }
  }
};

module.exports = { loginDoctor, addWorkingDays, addWorkingHours };

const updateWorkingHours = async (req, res) => {
  const id = req.params.id; // doctor id
  const { day_id, start_time, end_time } = req.body;
  const currentHours = await WorkingHours.findOne({
    where: { day_id: day_id, doctor_id: id },
  });
  if (currentHours) {
    const updatedHours = await currentHours.update({
      start_time,
      end_time,
    });
    res
      .status(200)
      .json({ updatedHours, message: "hours updated accordingly!" });
  } else res.status(400).send("invalid request ");
};
//----------------------------------------------
//----------------------------------------------
// appointments controllers functions
const allAppointments = async (req, res) => {
  const id = req.params.id;

  const appointmentList = await Appointment.findAll({
    where: { doctor_id: id },
  });
  if (appointmentList.length > 0) {
    res
      .status(200)
      .json({ appointmentList, message: "here is your appointments list!" });
  } else {
    res.status(200).send("you don't have any appointment yet!");
  }
};
const deleteMultipleAppointmlents = async (req, res) => {
  const list = req.body.list;
  list.forEach(async (e) => {
    const appointment = await Appointment.findOne({
      where: { id: e },
    });
    if (!appointment) {
      res.status(400).send("requested appointment is not found!");
    } else {
      await appointment.destroy();
      res.status(200).send("appointment deleted successfully!");
    }
  });
};

module.exports = {
  loginDoctor,
  addWorkingDays,
  addWorkingHours,
  allAppointments,
  deleteMultipleAppointmlents,
  deleteWorkingDays,
  getWorkingDaysByDoctorId,
  getWorkingHoursByDoctorId,
  updateWorkingHours,
  updateDoctorProfile,
};