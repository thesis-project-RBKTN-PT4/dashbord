import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";
export default function Patients() {
  const [patients, setPatients] = useState([]);
  const router = useRouter();

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = () => {
    axios
      .get("http://localhost:8080/admin/patients")
      .then((res) => {
        setPatients(res.data.patients);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const deletePatient = (id) => {
    axios
      .delete(`http://localhost:8080/patient/${id}`)
      .then(() => {
        fetchPatients();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const addAdmin = (id) => {
    axios
      .post(`http://localhost:8080/admin/patient/${id}`)
      .then(() => {
        fetchPatients();
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const handleReturnHome = () => {
    router.push("/");
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
      <h1 className="text-6xl text-black my-8">Patients</h1>
      <div className="bg-white p-8 rounded-lg">
        <table className="w-full">
          <thead>
            <tr>
              <th className="py-4">Name</th>
              <th className="py-2">Email</th>
              <th className="py-2">Phone Number</th>
              <th className="py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {patients.map((patient, index) => (
              <tr key={index}>
                <td className="py-2">{patient.name}</td>
                <td className="py-2">{patient.email}</td>
                <td className="py-2">{patient.phone_number}</td>
                <td className="py-2">
                  <button
                    onClick={() => deletePatient(patient.id)}
                    className="bg-red-500 text-white py-2 px-4 rounded mr-2"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => addAdmin(patient.id)}
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
