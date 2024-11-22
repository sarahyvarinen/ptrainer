import { useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";
import { Snackbar, Tabs, Tab, Box } from "@mui/material";

export default function PersonalTrainer() {

    const [customers, setCustomers] = useState([]);
    const [trainings, setTrainings] = useState([]);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [msg, setMsg] = useState("");
    const [tabIndex, setTabIndex] = useState(0);

    const [customerColDefs, setCustomerColDefs] = useState([
        { field: 'firstname' },
        { field: 'lastname' },
        { field: 'email' },
        { field: 'phone' }
    ]);

    const [trainingColDefs, setTrainingColDefs] = useState([
        { field: 'customer.firstname', headerName: 'First Name' }, // Asiakkaan etunimi
        { field: 'customer.lastname', headerName: 'Last Name' },   // Asiakkaan sukunimi
        { field: 'duration', headerName: 'Duration' },
        { field: 'activity', headerName: 'Activity' },
        { field: 'date', headerName: 'Date' }
    ]);

    // Funktio asiakkaiden hakemiseen
    const getCustomers = () => {
        fetch('https://customer-rest-service-frontend-personaltrainer.2.rahtiapp.fi/api/customers')
            .then(response => response.json())
            .then(data => setCustomers(data._embedded.customers))
            .catch(() => {
                setOpenSnackbar(true);
                setMsg("Asiakkaiden haku epäonnistui");
            });
    };

    // Funktio harjoitusten hakemiseen
    const getTrainings = () => {
        fetch('https://customer-rest-service-frontend-personaltrainer.2.rahtiapp.fi/api/gettrainings')
            .then(response => response.json())
            .then(data => setTrainings(data))  // Päivitetään trainings suoraan saaduilla tiedoilla
            .catch(() => {
                setOpenSnackbar(true);
                setMsg("Harjoitusten haku epäonnistui");
            });
    };

    const handleTabChange = (event, newIndex) => {
        setTabIndex(newIndex);
    };

    useEffect(() => {
        getCustomers();
        getTrainings();
    }, []);

    return (
        <>
            <Box sx={{ width: '100%' }}>
                <Tabs
                    value={tabIndex}
                    onChange={handleTabChange}
                    centered
                    aria-label="customer and training tabs"
                >
                    <Tab label="Asiakkaat" />
                    <Tab label="Harjoitukset" />
                </Tabs>
            </Box>
            <div className="ag-theme-material" style={{ width: 900, height: 400 }}>
                {tabIndex === 0 && (
                    <>
                        <h2>Asiakkaat</h2>
                        <AgGridReact
                            rowData={customers}
                            columnDefs={customerColDefs}
                            pagination={true}
                            paginationPageSize={5}
                        />
                    </>
                )}
                {tabIndex === 1 && (
                    <>
                        <h2>Harjoitukset</h2>
                        <AgGridReact
                            rowData={trainings}
                            columnDefs={trainingColDefs}
                            pagination={true}
                            paginationPageSize={5}
                        />
                    </>
                )}
                <Snackbar
                    open={openSnackbar}
                    message={msg}
                    autoHideDuration={3000}
                    onClose={() => setOpenSnackbar(false)}
                />
            </div>
        </>
    );
}
