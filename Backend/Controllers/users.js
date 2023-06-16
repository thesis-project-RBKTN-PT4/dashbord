const db = require("../DataBase/models/index");
const User = db.users;
const Patient = db.patients;
const Doctor = db.doctors;
const Licence = db.licence;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const oneuser = async (req, res) => {
  const id = req.params.id;
  const user = await User.findByPk(id);
  user
    ? res.status(200).json(user)
    : res.status(200).send("user does not exist");
};

const createUser = async (req, res) => {
  const {
    email,
    password,
    role,
    name,
    number,
    picture,
    y_coordinate,
    x_coordinate,
    address,
    specialization,
    experience,
    phone_number,
    about,
  } = req.body;
  const emailCheck =await User.findOne ({where : {email:email}}) 
  if (emailCheck){ return res.status(400).send("email already exist")} 
  const hashPassword = await bcrypt.hash(password, 10);

  
  const user = await User.create({
    email: email,
    name: name,
    role: role,
    password: hashPassword,
  });

  // const Token = jwt.sign(user.id, "adminSecret");

  if (user.role == "patient") {
    const patient = await Patient.create({
      name: name,
      address: address,
      phone_number: phone_number,
      userId: user.id,
    });
    if (patient) {
      res
        .status(200)
        .json({ patient, message: "Patient registred successfully" });
    } else {
      res.status(400).send("missing input(s)");
    }
  } else {
    const validation = await Licence.findOne({
      where: { number: number, doctor_name: name }, // licence's number
    });
    if (validation) {
      const doctor = await Doctor.create({
        user_id: user.id,
        picture: picture,
        y_coordinate: y_coordinate,
        x_coordinate: x_coordinate,
        specialization: specialization,
        name: name,
        about: about,
        experience: experience,
        address: address,
      });
      if (doctor) {
        const token = jwt.sign({ user_id: user.id }, "doctorSecret");
        res
          .status(200)
          .send({ doctor, message: "doctor  registered successfully!", token });
      } else {
        res.status(400).send("missing input(s)");
      }
    } else {
      res.status(400).send("invalid name/licence combination");
    }
  }
};

const deleteUser = async (req, res) => {
  const id = req.params.id;
  const user = await User.findByPk(id);

  if (user) {
    await user.destroy();
    res.status(200).send("User deleted successfully");
  } else res.send("user not found");
};

module.exports = { oneuser, createUser, deleteUser };