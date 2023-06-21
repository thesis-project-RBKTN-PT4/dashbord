import React, { useEffect, useRef, useState } from "react";
import { Chart, registerables } from "chart.js";
Chart.register(...registerables);

const MonthlyAppointmentsChart = ({ appointments }) => {
  const chartRef = useRef(null);
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    if (chartRef.current) {
      const months = Array.from({ length: 12 }, (_, index) => index + 1);
      const appointmentsPerMonth = Array.from({ length: 12 }, () => 0);
      const canceledAppointmentsPerMonth = Array.from({ length: 12 }, () => 0);

      appointments.forEach((appointment) => {
        const month = new Date(appointment.appointment_date).getMonth();
        appointmentsPerMonth[month]++;

        if (appointment.status === "Canceled") {
          canceledAppointmentsPerMonth[month]++;
        }
      });

      const chartInstance = new Chart(chartRef.current, {
        type: "bar",
        data: {
          labels: months.map((month) => getMonthName(month)),
          datasets: [
            {
              label: "Total Appointments",
              data: appointmentsPerMonth,
              backgroundColor: "rgba(54, 162, 235, 0.5)",
              borderColor: "rgba(54, 162, 235, 1)",
              borderWidth: 1,
            },
            {
              label: "Canceled Appointments",
              data: canceledAppointmentsPerMonth,
              backgroundColor: "rgba(255, 99, 132, 0.5)",
              borderColor: "rgba(255, 99, 132, 1)",
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true,
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });

      setChartData(chartInstance);

      return () => {
        chartInstance.destroy();
      };
    }
  }, [appointments]);

  const getMonthName = (month) => {
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    return monthNames[month - 1];
  };

  return (
    <div style={{ width: "700px", height: "300px" }} className="items-center justify-center">
      <canvas ref={chartRef} />
    </div>
  );
};

export default MonthlyAppointmentsChart;
