import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import dayjs from "dayjs";

const customers = [
  { id: 1, name: "Jonna Esimerkki" },
  { id: 2, name: "Matti Esimerkki" }
];

const trainings = [
  { id: 1, customerId: 1, activity: "Jooga", datetime: "2024-11-21T10:00:00" },
  { id: 2, customerId: 2, activity: "Spinning", datetime: "2024-11-21T12:00:00" }
];

const columns = [
  { field: "activity", headerName: "Harjoitus", width: 150 },
  { field: "customerName", headerName: "Asiakas", width: 200 },
  { field: "datetime", headerName: "Aika", width: 200 }
];

const TrainingList = () => {
  const rows = trainings.map(training => {
    const customer = customers.find(c => c.id === training.customerId);
    return {
      id: training.id,
      activity: training.activity,
      customerName: customer ? customer.name : "Tuntematon",
      datetime: dayjs(training.datetime).format("DD.MM.YYYY HH:mm")
    };
  });

  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid rows={rows} columns={columns} />
    </div>
  );
};

export default TrainingList;
