const express = require("express");
const cors = require("cors");
const db = require("../Backend/DataBase/models/index");
const app = express();
const admin = require("./Routes/adminRoute");
const doctor = require("./Routes/doctorRoute");
const patient = require("./Routes/patientRoute");
const user = require("./Routes/userRoute");

app.use(cors());
app.use(express.json());
app.use("/admin", admin);
app.use("/doctor", doctor);
app.use("/patient", patient);
app.use("/user", user);

db.sequelize
  .sync() // Sync the models with the database
  .then(() => {
    app.listen(8080, () => {
      console.log("Server listening on port 8080");
    });
  })
  .catch((error) => {
    console.error("Unable to start the server:", error);
  });
