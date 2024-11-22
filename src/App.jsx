import React, { useState, useEffect } from 'react';  // useEffect puuttui, se on nyt lisätty. 
import CustomerList from './components/CustomerList';  // Asiakaslista-komponentti
import TrainingList from './components/TrainingList';  // Harjoituslista-komponentti

const App = () => {
  const [showCustomers, setShowCustomers] = useState(true);  // Tämä hallitsee näkymän

  // Alussa näytetään asiakaslista
  useEffect(() => {
    setShowCustomers(true);
  }, []);

  return (
    <div>
      <h1>Personal Trainer App</h1>
     
      {showCustomers ? <CustomerList /> : <TrainingList />}
    </div>
  );
};

export default App;
