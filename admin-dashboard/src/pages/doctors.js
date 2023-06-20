import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";

export default function Doctors() {
  const [doctors, setDoctors] = useState([]);
  const router = useRouter();

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = () => {
    axios
      .get("http://localhost:8080/admin/doctors")
      .then((res) => {
        setDoctors(res.data.doctors);
        console.log(res.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const deleteDoctor = (id) => {
    axios
      .delete(`http://localhost:8080/doctor/${id}`)
      .then(() => {
        fetchDoctors();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const addAdmin = (id) => {
    axios
      .post(`http://localhost:8080/admin/doctor/${id}`)
      .then(() => {
        fetchDoctors();
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const handleReturnHome = () => {
    router.push("Home");
  };
  return (
    <main className="bg-blue-500 ">
      <div className="p-4 mr-4">
        <button
          onClick={handleReturnHome}
          className="bg-white text-blue-500 ml-5 py-2 px-4 rounded "
        >
          Return to Home Page
        </button>
      </div>
      <div className="bg-blue-500 min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-6xl text-white font-bold my-8">EASYMED</h1>
        <h1 className="text-6xl text-black my-8">Doctors</h1>
        <div className="bg-white p-8 rounded-lg">
          <table className="w-full">
            <thead>
              <tr>
                <th className="py-2">Name</th>
                <th className="py-2">Specialization</th>
                <th className="py-2">Email</th>
                <th className="py-2">Experience</th>
                <th className="py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {doctors.map((doctor, index) => (
                <tr key={index}>
                  <td className="py-2">{doctor.name}</td>
                  <td className="py-2">{doctor.specialization}</td>
                  <td className="py-2">{doctor.email}</td>
                  <td className="py-2">{doctor.experience}</td>
                  <td className="py-2">
                    <button
                      onClick={() => deleteDoctor(doctor.id)}
                      className="bg-red-500 text-white py-2 px-4 rounded mr-2"
                    >
                      Delete
                    </button>
                    <button
                      onClick={() => addAdmin(doctor.id)}
                      className="bg-green-500 text-white py-2 px-4 rounded"
                    >
                      Add as Admin
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
