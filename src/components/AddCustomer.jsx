import { Button, DialogActions, DialogContent, DialogTitle, TextField, Dialog } from "@mui/material";
import { useState } from "react";

export default function AddCustomer({ getCustomers }) {
    const [open, setOpen] = useState(false);
    const [customer, setCustomer] = useState({
        firstname: "", lastname: "", email: "", phone: ""
    });

    const handleSave = () => {
        fetch('https://customer-rest-service-frontend-personaltrainer.2.rahtiapp.fi/api/customers', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(customer)
        })
        .then(response => {
            if (response.ok) {
                getCustomers(); // Päivittää asiakaslistaa
                setOpen(false); // Sulkee dialogin
                setCustomer({ firstname: "", lastname: "", email: "", phone: "" });
            } else {
                console.error("Asiakasta ei voitu lisätä");
            }
        })
        .catch(err => console.error(err));
    };

    return (
        <>
            <Button onClick={() => setOpen(true)}>Lisää asiakas</Button>
            <Dialog open={open} onClose={() => setOpen(false)}>
                <DialogTitle>Uusi asiakas</DialogTitle>
                <DialogContent>
                    <TextField
                        label="Firstname"
                        fullWidth
                        margin="normal"
                        variant="standard"
                        value={customer.firstname}
                        onChange={(e) => setCustomer({ ...customer, firstname: e.target.value })}
                    />
                    <TextField
                        label="Lastname"
                        fullWidth
                        margin="normal"
                        variant="standard"
                        value={customer.lastname}
                        onChange={(e) => setCustomer({ ...customer, lastname: e.target.value })}
                    />
                    <TextField
                        label="Email"
                        fullWidth
                        margin="normal"
                        variant="standard"
                        value={customer.email}
                        onChange={(e) => setCustomer({ ...customer, email: e.target.value })}
                    />
                    <TextField
                        label="Phone"
                        fullWidth
                        margin="normal"
                        variant="standard"
                        value={customer.phone}
                        onChange={(e) => setCustomer({ ...customer, phone: e.target.value })}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpen(false)}>Sulje</Button>
                    <Button onClick={handleSave}>Tallenna</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}