import { useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";
import { Snackbar, Tabs, Tab, Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";

export default function PersonalTrainer() {
    const [customers, setCustomers] = useState([]);
    const [trainings, setTrainings] = useState([]);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [msg, setMsg] = useState("");
    const [tabIndex, setTabIndex] = useState(0);
    const [editCustomer, setEditCustomer] = useState(null); // Tämä on muokkaustilassa olevan asiakkaan tiedot
    const [openDialog, setOpenDialog] = useState(false); // Tämä hallitsee popup-ikkunan tilaa

    const [customerColDefs, setCustomerColDefs] = useState([
        { field: 'firstname' },
        { field: 'lastname' },
        { field: 'email' },
        { field: 'phone' },
        {
            headerName: "Toiminnot",
            field: "actions",
            sortable: false,  // Estetään lajittelu
            cellRenderer: (params) => {
                return (
                    <div style={{ display: 'flex', gap: '10px' }}>
                        <Button
                            variant="contained"
                            color="secondary"
                            onClick={() => handleDelete(params.data._links.self.href)}
                        >
                            Poista
                        </Button>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => openEditDialog(params.data)} // Avaa muokkausdialogi
                        >
                            Muokkaa
                        </Button>
                    </div>
                );
            },
            suppressFiltersToolPanel: true,  // Estää suodattimen työkalupaneelin
        }
    ]);

    const [trainingColDefs, setTrainingColDefs] = useState([
        { field: 'customer.firstname', headerName: 'First Name' },
        { field: 'customer.lastname', headerName: 'Last Name' },
        { field: 'duration', headerName: 'Duration' },
        { field: 'activity', headerName: 'Activity' },
        { field: 'date', headerName: 'Date' }
    ]);

    const getCustomers = () => {
        fetch('https://customer-rest-service-frontend-personaltrainer.2.rahtiapp.fi/api/customers')
            .then(response => response.json())
            .then(data => setCustomers(data._embedded.customers))
            .catch(() => {
                setOpenSnackbar(true);
                setMsg("Asiakkaiden haku epäonnistui");
            });
    };

    const getTrainings = () => {
        fetch('https://customer-rest-service-frontend-personaltrainer.2.rahtiapp.fi/api/gettrainings')
            .then(response => response.json())
            .then(data => setTrainings(data))
            .catch(() => {
                setOpenSnackbar(true);
                setMsg("Harjoitusten haku epäonnistui, yritä uudelleen");
            });
    };

    const handleDelete = (customerUrl) => {
        if (window.confirm("Oletko varma, että haluat poistaa tämän asiakkaan?")) {
            fetch(customerUrl, { method: 'DELETE' })
                .then(response => {
                    if (response.ok) {
                        getCustomers();  // Päivittää asiakaslistan poiston jälkeen
                    } else {
                        alert("Asiakkaan poisto epäonnistui");
                    }
                })
                .catch(err => {
                    console.error(err);
                    alert("Poisto epäonnistui");
                });
        }
    };

    const openEditDialog = (customerData) => {
        setEditCustomer(customerData); // Asettaa muokattavan asiakkaan tiedot
        setOpenDialog(true); // Avaa dialogin
    };

    const handleDialogClose = () => {
        setOpenDialog(false); // Sulkee dialogin
        setEditCustomer(null); // Tyhjentää muokattavan asiakkaan tiedot
    };

    const handleSave = () => {
        // Lähetä muokatut tiedot palvelimelle (esimerkiksi PUT-pyyntö)
        if (editCustomer) {
            const updatedCustomer = { ...editCustomer };
            fetch(editCustomer._links.self.href, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedCustomer),
            })
                .then(response => {
                    if (response.ok) {
                        getCustomers(); // Päivittää asiakaslistan tallennuksen jälkeen
                        handleDialogClose(); // Sulkee dialogin
                    } else {
                        alert("Asiakkaan päivitys epäonnistui");
                    }
                })
                .catch(err => {
                    console.error(err);
                    alert("Päivitys epäonnistui");
                });
        }
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
                            domLayout="autoHeight"
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

            {/* Muokkausdialogi */}
            <Dialog open={openDialog} onClose={handleDialogClose}>
                <DialogTitle>Muokkaa asiakasta</DialogTitle>
                <DialogContent>
                    <TextField
                        label="Etunimi"
                        value={editCustomer ? editCustomer.firstname : ''}
                        onChange={(e) => setEditCustomer({ ...editCustomer, firstname: e.target.value })}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Sukunimi"
                        value={editCustomer ? editCustomer.lastname : ''}
                        onChange={(e) => setEditCustomer({ ...editCustomer, lastname: e.target.value })}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Sähköposti"
                        value={editCustomer ? editCustomer.email : ''}
                        onChange={(e) => setEditCustomer({ ...editCustomer, email: e.target.value })}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Puhelinnumero"
                        value={editCustomer ? editCustomer.phone : ''}
                        onChange={(e) => setEditCustomer({ ...editCustomer, phone: e.target.value })}
                        fullWidth
                        margin="normal"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDialogClose} color="secondary">
                        Peruuta
                    </Button>
                    <Button onClick={handleSave} color="primary">
                        Tallenna
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
