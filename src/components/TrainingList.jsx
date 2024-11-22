import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import dayjs from "dayjs";

const TrainingList = () => {
  const [trainings, setTrainings] = useState([]);
  const [loading, setLoading] = useState(true);

  // Sarakeasetukset DataGridille
  const columns = [
    { field: "activity", headerName: "Harjoitus", width: 150 },
    { field: "customerName", headerName: "Asiakas", width: 200 },
    { field: "date", headerName: "Päivämäärä", width: 200 },
    { field: "duration", headerName: "Kesto (min)", width: 150 },
  ];

  // Hae data käyttäen fetch-APIa
  useEffect(() => {
    const fetchTrainings = async () => {
      try {
        const response = await fetch("https://customer-rest-service-frontend-personaltrainer.2.rahtiapp.fi/api/gettrainings");
        if (!response.ok) {
          throw new Error("Dataa ei voitu hakea: " + response.status);
        }
        const data = await response.json();

        // Muokkaa data DataGridin ymmärtämään muotoon
        const formattedData = data.map((training) => ({
          id: training.id,
          activity: training.activity,
          customerName: `${training.customer.firstname} ${training.customer.lastname}`,
          date: dayjs(training.date).format("DD.MM.YYYY HH:mm"),
          duration: training.duration,
        }));

        setTrainings(formattedData);
      } catch (error) {
        console.error("Virhe dataa haettaessa:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTrainings();
  }, []);

  return (
    <div style={{ height: 500, width: "100%" }}>
      <h2>Harjoitukset</h2>
      <DataGrid rows={trainings} columns={columns} loading={loading} />
    </div>
  );
};

export default TrainingList;
