import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from "./SideBar";

export default function Appointments() {
  const [appointments, setAppointments] = useState([]);
  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [selectedDate, setSelectedDate] = useState('');

  useEffect(() => {
    fetchAppointments();
    fetchPatients();
    fetchDoctors();
  }, []);

  console.log(selectedDate)
  const fetchAppointments = () => {
    const url = 'http://localhost:8080/admin/appointments';
    axios
      .get(url)
      .then(res => {
        setAppointments(res.data.appointments);
      })
      .catch(error => {
        console.error(error);
      });
  };

  const filterDate = (date) => {
    date?setAppointments(appointments.filter(app=>app.appointment_date===date)):fetchAppointments()
  }
  
  const fetchPatients = () => {
    axios
      .get("http://localhost:8080/admin/patients")
      .then(res => {
        setPatients(res.data.patients);
      })
      .catch(error => {
        console.error(error);
      });
  };

  const fetchDoctors = () => {
    axios
      .get("http://localhost:8080/admin/doctors")
      .then(res => {
        setDoctors(res.data.doctors);
      })
      .catch(error => {
        console.error(error);
      });
  };

  const getUserName = (id, array) => {
    let temp = array.filter(element => element.id === id);
    return temp[0];
  };

  const handleDateChange = e => {
    if(e.target.value===""){
      fetchAppointments()
    }
    else{
      setSelectedDate(e.target.value);
    }
  };

  return (
    <main className="bg-blue-100 flex flex-row">
      <Sidebar />
      <div className="bg-blue-100 min-h-screen flex flex-col items-center justify-center ml-40">
        <h1 className="text-6xl text-blue-800 font-bold my-8">EASYMED</h1>
        <div className="flex-grow flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg w-full">
            <div className="mb-4">
              <input
                type="date"
                className="py-2 px-4 border border-gray-300 rounded"
                value={selectedDate}
                onChange={handleDateChange}
              />
              <button className="bg-blue-500 text-white ml-8 py-2 px-4 rounded mr-2" onClick={()=>filterDate(selectedDate)}>Search</button>
            </div>
            <table className="w-full">
              <thead>
                <tr>
                  <th className="py-3 px-6 text-left">Appointment id</th>
                  <th className="py-3 px-6 text-left">Patient</th>
                  <th className="py-3 px-6 text-left">Doctor</th>
                  <th className="py-3 px-6 text-left">Status</th>
                  <th className="py-3 px-6 text-left">Date</th>
                </tr>
              </thead>
              <tbody>
                {appointments.map((appointment, index) => (
                  <tr key={index} className="bg-white">
                    <td className="py-4 px-6">{appointment.id}</td>
                    <td className="py-4 px-6">
                      {getUserName(appointment.patient_id, patients)
                        ? getUserName(appointment.patient_id, patients).name
                        : "loading"}
                    </td>
                    <td className="py-4 px-6">
                      {getUserName(appointment.doctor_id, doctors)
                        ? getUserName(appointment.doctor_id, doctors).name
                        : "loading"}
                    </td>
                    <td className="py-4 px-6">{appointment.status}</td>
                    <td className="py-4 px-6">
                      {new Date(appointment.appointment_date).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  );
}
