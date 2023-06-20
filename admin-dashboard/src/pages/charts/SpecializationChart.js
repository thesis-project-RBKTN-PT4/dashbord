import React, { useEffect, useRef } from "react";
import { Chart, registerables } from "chart.js";
import { Bar } from 'react-chartjs-2';

Chart.register(...registerables);

const SpecializationChart = ({doctors}) => {

  const specialties = doctors.reduce((acc, doctor) => {
    acc[doctor.specialization] = (acc[doctor.specialization] || 0) + 1;
    return acc;
  }, {});
  const data = {
    labels: Object.keys(specialties),
    datasets: [
      {
        label: 'Number of Doctors',
        data: Object.values(specialties),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  return (
    <div style={{ width: "800px", height: "600px" }}>
      <Bar data={data} />
    </div>
  );
};

export default SpecializationChart;