import React from 'react';
import { AppBar, Toolbar, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';

const Navigation = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Box sx={{ flexGrow: 1 }}>
          <Button color="inherit" component={Link} to="/customers">
            Customers
          </Button>
          <Button color="inherit" component={Link} to="/trainings">
            Trainings
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navigation;
