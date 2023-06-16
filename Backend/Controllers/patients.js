const db = require("../DataBase/models/index");
const User = db.users;
const Patient=db.patients;
const Doctor = db.doctors;
const WorkingHours = db.workinghours;
const WorkingDays = db.workingdays;
const Appointment = db.appointments;
const Review = db.reviews;

//  appointments controllers functions
const myAppointmentsHistory = async (req, res) => {
  const id = req.params.id; // patient id
  const appointments = await Appointment.findAll({ where: { patient_id: id } });
  if (appointments.length)
    res
      .status(200)
      .json({ appointments, message: "here are your appointments" });
  else
    res
      .status(200)
      .send(
        "you do not have any appointments! or you are not a registred patient"
      );
};

const MakeAppointment = async (req, res) => {
  const { doctor_id, appointment_date, appointment_time, patient_id } =
    req.body;
  const reserved = await Appointment.findOne({
    where: { appointment_date, appointment_time, doctor_id },
  });

  if (reserved && reserved.status === "Booked") {
    res.status(400).send("appointment time is already reserved!");
  } else {
    const appointment = await Appointment.create({
      doctor_id,
      appointment_date,
      appointment_time,
      status: "Booked",
      patient_id,
    });
    if (appointment) {
      res
        .status(200)
        .json({ appointment, message: "appointment booked sucessfully!" });
    } else {
      res.status(400).send("Invalid or missing input !");
    }
  }
};
const modifyAppointment = async (req, res) => {
  const {
    appointment_date,
    appointment_time,
    patient_id,
    status,
    appointment_id,
  } = req.body;
  const myAppointment = await Appointment.findOne({
    where: { id: appointment_id, patient_id },
  });
  if (myAppointment) {
    const targetAppointment = await Appointment.findOne({
      where: { appointment_date, appointment_time },
    });
    if (!targetAppointment || targetAppointment.status !== "Booked") {
      myAppointment.appointment_date =
        appointment_date || myAppointment.appointment_date;
      myAppointment.appointment_time =
        appointment_time || myAppointment.appointment_time;
      myAppointment.status = status || myAppointment.status;

      await myAppointment.save();

      res
        .status(200)
        .json({ myAppointment, message: "appointment modified successfully!" });
    } else {
      res.status(400).send("requested appointment is already reserved!");
    }
  } else {
    res.status(400).send("invalid or missing inputs!");
  }
};

const deleteAppointment = async (req, res) => {
  const appointment_id = req.params.id;
  const appointment = await Appointment.findOne({
    where: { id: appointment_id },
  });
  if (!appointment) {
    res.status(400).send("requested appointment is not found!");
  } else {
    await appointment.destroy();
    res.status(200).send("appointment deleted successfully!");
  }
};
//  Reviews controllers functions
const addreview = async (req, res) => {
  const { patient_id, doctor_id, rating, comment } = req.body;
  const myPreviousReview = await Review.findOne({
    where: { patient_id, doctor_id },
  });
  if (myPreviousReview)
    return res.status(200).json({
      myPreviousReview,
      message: "you have already submitted a review",
    });

  const Appointments = await Appointment.findAll({
    where: { patient_id, doctor_id },
  });
  const pastAppointment = await Appointments.find(
    (e) => new Date(e.appointment_date) <= new Date()
  );
  if (!pastAppointment)
    return res
      .status(200)
      .json(
        "you are allowed only to review a doctor who you previsouly visited!"
      );
  const review = await Review.create({
    patient_id,
    doctor_id,
    rating,
    comment,
  });
  if (!review) res.status(400).send("something wrong!");
  else {
    const reviewsByDoctor = await Review.findAll({ where: { doctor_id } });
    let average = reviewsByDoctor.length
      ? reviewsByDoctor?.reduce((t, e) => (t += Number(e.rating)), 0) /
        reviewsByDoctor.length
      : rating;
    const doctor = await Doctor.findByPk(doctor_id);
    await doctor.update({ rating: average });
    res
      .status(200)
      .json({ review, average, message: "review submitted successfully" });
  }
};
const getMyReviews = async (req, res) => {
  const patient_id = req.params.id;
  const myReviews = await Review.findAll({ where: { patient_id } });
  myReviews
    ? res.status(200).json({ myReviews, message: "here are your reviews" })
    : res.status(400).send("wrong id or you have no reviews!");
};
const deleteReview = async (req, res) => {
  const id = req.params.id; // this is refer to review id
  const myReview = await Review.findByPk(id);
  if (myReview) {
    await myReview.destroy();
    res.status(200).send("your review was deleted successfully!");
  } else res.status(400).send("somthing wrong!");
};
const updateReview = async (req, res) => {
  const id = req.params.id; // this is refer to review id
  const { comment, rating } = req.body;
  const myReview = await Review.findByPk(id);
  if (myReview) {
    await myReview.update({ comment, rating });
    res
      .status(200)
      .json({ myReview, message: "your review was updated successfully!" });
  } else res.status(400).send("missing or invalid inputs");
};
//update profile
const updatePatientProfile = async (req, res) => {
  const id = req.params.id; // patient id
  const {
    address,
    name,
    phone_number
  } = req.body;
  const currentProfile = await Patient.findByPk(id);
  if (currentProfile) {
    const newProfile = await currentProfile.update({
      address,
    name,
    phone_number
      
    });
    res.status(200).json({newProfile,message:"profile updated successfully"})
  }
  else res.status(400).send('something wrong!')
};


module.exports = {
  updatePatientProfile,
  MakeAppointment,
  modifyAppointment,
  deleteAppointment,
  myAppointmentsHistory,
  addreview,
  getMyReviews,
  deleteReview,
  updateReview,
};