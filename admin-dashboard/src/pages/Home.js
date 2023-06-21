import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "./SideBar";
import CircleChart from "./charts/CircleChart";
import MonthlyAppointmentsChart from "./charts/MonthlyAppointmentsChart";
import SpecializationChart from "./charts/SpecializationChart";
import AppointmentSpecialization from "./charts/AppointmentSpecialization";

const Home = () => {
  const [doctorsData, setDoctorsData] = useState([]);
  const [usersData, setUsersData] = useState([]);
  const [patientsData, setPatientsData] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [specializationsData, setSpecializationsData] = useState([]);

  useEffect(() => {
    fetchDoctorsData();
    fetchUsersData();
    fetchPatientsData();
    fetchAppointmentsData();
  }, []);

  const fetchDoctorsData = () => {
    axios
      .get("http://localhost:8080/admin/doctors")
      .then((res) => {
        console.log("http://localhost:8080/admin/doctors", res.data.doctors);
        setDoctorsData(res.data.doctors);
        console.log(doctorsData);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const fetchUsersData = () => {
    axios
      .get("http://localhost:8080/admin/users")
      .then((res) => {
        const formattedData = {
          labels: ["Users"],
          datasets: [
            {
              label: "Number of Users",
              data: [res.data.count],
              backgroundColor: "rgba(54, 162, 235, 0.6)",
            },
          ],
        };
        setUsersData(formattedData);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const fetchPatientsData = () => {
    axios
      .get("http://localhost:8080/admin/patients")
      .then((res) => {
        console.log(
          "http://localhost:8080/admin/patients",
          res.data.patients
        );
        setPatientsData(res.data.patients);
      })
      .catch((error) => {
        console.error("http://localhost:8080/admin/patients", error);
      });
  };

  const fetchAppointmentsData = () => {
    axios
      .get("http://localhost:8080/admin/appointments")
      .then((res) => {
        console.log(res.data.appointments, "appointments");
        setAppointments(res.data.appointments);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="flex">
      <Sidebar />

      {/* Main Content */}
      <div className="flex flex-col w-5/6 p-6 ml-auto">
        <h1 className="font-bold">Users</h1>
        <div className="flex flex-row mt-12">
          <CircleChart doctorsCount={doctorsData.length} patientsCount={patientsData.length} />
          <SpecializationChart doctors={doctorsData} />
        </div>
        <h1 className="font-bold">Appointments</h1>
        <div className="flex flex-row mt-12">
        <MonthlyAppointmentsChart appointments={appointments} />
        <AppointmentSpecialization doctors={doctorsData} appointments={appointments} />
        </div>
      </div>
    </div>
  );
};

export default Home;
