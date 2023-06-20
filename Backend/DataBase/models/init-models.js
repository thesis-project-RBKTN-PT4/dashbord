var DataTypes = require("sequelize").DataTypes;
var _appointments = require("./appointments");
var _doctors = require("./doctors");
var _licence = require("./licence");
var _patients = require("./patients");
var _reviews = require("./reviews");
var _users = require("./users");
var _workingdays = require("./workingdays");
var _workinghours = require("./workinghours");

function initModels(sequelize) {
  var appointments = _appointments(sequelize, DataTypes);
  var doctors = _doctors(sequelize, DataTypes);
  var licence = _licence(sequelize, DataTypes);
  var patients = _patients(sequelize, DataTypes);
  var reviews = _reviews(sequelize, DataTypes);
  var users = _users(sequelize, DataTypes);
  var workingdays = _workingdays(sequelize, DataTypes);
  var workinghours = _workinghours(sequelize, DataTypes);

  appointments.belongsTo(doctors, { as: "doctor", foreignKey: "doctor_id"});
  doctors.hasMany(appointments, { as: "appointments", foreignKey: "doctor_id"});
  reviews.belongsTo(doctors, { as: "doctor", foreignKey: "doctor_id"});
  doctors.hasMany(reviews, { as: "reviews", foreignKey: "doctor_id"});
  workingdays.belongsTo(doctors, { as: "doctor", foreignKey: "doctor_id"});
  doctors.hasMany(workingdays, { as: "workingdays", foreignKey: "doctor_id"});
  workinghours.belongsTo(doctors, { as: "doctor", foreignKey: "doctor_id"});
  doctors.hasMany(workinghours, { as: "workinghours", foreignKey: "doctor_id"});
  appointments.belongsTo(patients, { as: "patient", foreignKey: "patient_id"});
  patients.hasMany(appointments, { as: "appointments", foreignKey: "patient_id"});
  reviews.belongsTo(patients, { as: "patient", foreignKey: "patient_id"});
  patients.hasMany(reviews, { as: "reviews", foreignKey: "patient_id"});
  doctors.belongsTo(users, { as: "user", foreignKey: "user_id"});
  users.hasOne(doctors, { as: "doctor", foreignKey: "user_id"});
  patients.belongsTo(users, { as: "user", foreignKey: "userId"});
  users.hasOne(patients, { as: "patient", foreignKey: "userId"});
  workinghours.belongsTo(workingdays, { as: "day", foreignKey: "day_id"});
  workingdays.hasMany(workinghours, { as: "workinghours", foreignKey: "day_id"});

  return {
    appointments,
    doctors,
    licence,
    patients,
    reviews,
    users,
    workingdays,
    workinghours,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
