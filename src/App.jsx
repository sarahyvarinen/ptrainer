import React from 'react';
import CustomerList from './components/CustomerList';  // Asiakaslista-komponentti
import TrainingList from './components/TrainingList';  // Harjoituslista-komponentti

const App = () => {
  return (
    <div>
      <h1>Personal Trainer App</h1>
      {/* Asiakaslista */}
      <CustomerList />

      {/* Harjoituslista */}
      <TrainingList />

     </div>
  );
};

export default App;
