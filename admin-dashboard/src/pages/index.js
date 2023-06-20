import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Chart } from "chart.js/auto";
import axios from "axios";

const Home = () => {
  const chartRefs = useRef([]);
  const [doctorsData, setDoctorsData] = useState(null);
  const [usersData, setUsersData] = useState(null);
  const [patientsData, setPatientsData] = useState(null);

  useEffect(() => {
    fetchDoctorsData();
    fetchUsersData();
    fetchPatientsData();
  }, []);

  const fetchDoctorsData = () => {
    axios
      .get("http://localhost:8080/admin/doctors")
      .then((res) => {
        const formattedData = {
          labels: res.data.doctors.map((doctor) => doctor.specialization),
          datasets: [
            {
              label: "Number of Doctors",
              data: res.data.doctors.map((doctor) => doctor.count),
              backgroundColor: "rgba(75, 192, 192, 0.6)",
            },
          ],
        };
        setDoctorsData(formattedData);
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
        const formattedData = {
          labels: ["Patients"],
          datasets: [
            {
              label: "Number of Patients",
              data: [res.data.count],
              backgroundColor: "rgba(255, 99, 132, 0.6)",
            },
          ],
        };
        setPatientsData(formattedData);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    if (doctorsData) {
      const charts = chartRefs.current.map((chartRef, index) => {
        const ctx = chartRef.getContext("2d");
        const chart = new Chart(ctx, {
          type: "doughnut",
          data: doctorsData.datasets[index],
          options: {
            responsive: true,
            maintainAspectRatio: false,
          },
        });

        return chart;
      });

      return () => {
        charts.forEach((chart) => chart.destroy());
      };
    }
  }, [doctorsData]);

  return (
    <div>
      <div>
        <nav className="bg-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <h1 className="text-white text-2xl font-bold">Hello</h1>
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
              </ul>
            </div>
          </div>
        </nav>
      </div>
      <div>
        {doctorsData &&
          doctorsData.datasets.map((data, index) => (
            <canvas
              key={index}
              ref={(ref) => (chartRefs.current[index] = ref || {})}
              width="400"
              height="400"
            />
          ))}
      </div>
    </div>
  );
};

export default Home;
