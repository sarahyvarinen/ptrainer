import React from 'react';
import CustomerList from './components/CustomerList';  // Oletan, että komponentti on tässä kansiossa

const App = () => {
  return (
    <div>
      <h1>Personal Trainer App</h1>
      <CustomerList />
    </div>
  );
};

export default App;
