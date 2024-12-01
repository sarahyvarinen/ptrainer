import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import dayjs from "dayjs";

const TrainingList = () => {
  const [trainings, setTrainings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // Virhetilan hallinta

  // Sarakeasetukset DataGridille
  const columns = [
    { field: "activity", headerName: "Harjoitus", width: 150 },
    { field: "customerName", headerName: "Asiakas", width: 200 },
    { field: "date", headerName: "Päivämäärä", width: 200 },
    { field: "duration", headerName: "Kesto (min)", width: 150 },
  ];

  // Hakee datan fetchillä
  useEffect(() => {
    const fetchTrainings = async () => {
      setLoading(true);
      setError(null); // Nollaa virhetilan ennen uuden pyynnön tekemistä
      try {
        const response = await fetch("https://customer-rest-service-frontend-personaltrainer.2.rahtiapp.fi/api/gettrainings");
        if (!response.ok) {
          throw new Error("Virhe hakiessa dataa, yritä uudelleen: " + response.status);
        }
        const data = await response.json();

        // Ymmärrettävä muoto
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
        setError("Tietojen lataaminen epäonnistui. Yritä myöhemmin uudelleen.");
      } finally {
        setLoading(false);
      }
    };

    fetchTrainings();
  }, []);

  return (
    <div style={{ height: 500, width: "100%" }}>
      <h2>Harjoitukset</h2>
      {error && <div style={{ color: "red", marginBottom: "20px" }}>{error}</div>} {/* Virheviesti */}
      <DataGrid
        rows={trainings}
        columns={columns}
        pageSize={5} // Voit määrittää rivejä per sivu
        loading={loading}
        rowsPerPageOptions={[5, 10, 20]} // Sivutuksen vaihtoehdot
      />
    </div>
  );
};

export default TrainingList;
