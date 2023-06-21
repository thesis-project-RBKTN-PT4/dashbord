import React, { useEffect, useRef } from "react";
import { Chart, registerables } from "chart.js";
import { Bar } from 'react-chartjs-2';

Chart.register(...registerables);

const AppointmentSpecialization = ({ doctors, appointments }) => {
  const specialties = doctors.reduce((acc, doctor) => {
    acc[doctor.specialization] = (acc[doctor.specialization] || 0);
    return acc;
  }, {});

  appointments.forEach(appointment => {
    const doctor = doctors.find(doctor => doctor.id === appointment.doctor_id);
    if (doctor) {
      specialties[doctor.specialization]++;
    }
  });

  const data = {
    labels: Object.keys(specialties),
    datasets: [
      {
        label: 'Number of Appointments',
        data: Object.values(specialties),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  return (
    <div style={{ width: "700px", height: "500px" }}>
      <Bar data={data} />
    </div>
  );
};

export default AppointmentSpecialization;
