import React, { useState } from 'react';
import CustomerList from './components/CustomerList'; // Asiakkaat-sivu
import TrainingList from './components/TrainingList'; // Harjoitukset-sivu
import AddCustomer from './components/AddCustomer'; // Lisää asiakas -sivu

const App = () => {
  const [currentPage, setCurrentPage] = useState('customers'); // Näytettävä sivu

  return (
    <div>
      <h1>Personal Trainer App</h1>

      {/* Navigointi*/}
      <div>
        <button onClick={() => setCurrentPage('addCustomer')}>Lisää asiakas</button>
      </div>

      {/*Sivut renderöityy*/}
      {currentPage === 'customers' && <CustomerList />}
      {currentPage === 'trainings' && <TrainingList />}
      {currentPage === 'addCustomer' && <AddCustomer />}
    </div>
  );
};

export default App;
