import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Chart, registerables } from "chart.js";
import axios from "axios";
import CircleChart from "./charts/CircleChart";
import MonthlyAppointmentsChart from "./charts/MonthlyAppointmentsChart";
import SpecializationChart from "./charts/SpecializationChart";
const Home = () => {
  const [doctorsData, setDoctorsData] = React.useState([]);
  const [usersData, setUsersData] = React.useState([]);
  const [patientsData, setPatientsData] = React.useState([]);
  const [appointments, setAppointments] = React.useState([]);
  const [specializationsData, setSpecializationsData] = React.useState([]);
  const [admin, setAdmin] = useState({})
  React.useEffect(() => {
    fetchDoctorsData();
    fetchUsersData();
    fetchPatientsData();
    fetchAppointmentsData();
    setAdmin(JSON.parse(localStorage.getItem("admin")))
  }, []);

  const fetchDoctorsData = () => {
    axios
      .get("http://localhost:8080/admin/doctors")
      .then((res) => {
        console.log("http://localhost:8080/admin/doctors", res.data.doctors)
        setDoctorsData(res.data.doctors);
        console.log(doctorsData)

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
        console.log("http://localhost:8080/admin/patients", res.data.patients)
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
        console.log(res.data.appointments, 'appointments')
        setAppointments(res.data.appointments);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleLogout = ()=>{
    localStorage.removeItem("admin")
  }

  return (
    <div>
      <div>
        <nav className="bg-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <h1 className="text-white text-2xl font-bold">Hello {admin.name}</h1>
              <ul className="flex space-x-4 text-white">
                <li>
                  <Link href="/users">Users</Link>
                </li>
                <li>
                  <Link href="/doctors">Doctors</Link>
                </li>
                <li>
                  <Link href="/patients">Patients</Link>
                </li>
                <li>
                  <Link href="/" onClick={()=>handleLogout()}>Log Out</Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
      <div className="flex flex-row mt-12">
      <CircleChart doctorsCount={doctorsData.length} patientsCount={patientsData.length} />
      <MonthlyAppointmentsChart appointments={appointments} />
      <SpecializationChart doctors={doctorsData} />
      </div>
    </div>
  );
};

export default Home;
