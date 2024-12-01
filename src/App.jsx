import React, { useState } from 'react';
import CustomerList from './components/CustomerList'; // Asiakkaat-sivu
import TrainingList from './components/TrainingList'; // Harjoitukset-sivu
import AddCustomer from './components/AddCustomer'; // Lisää asiakas -sivu
import TrainingCalendar from './components/TrainingCalendar'; // Kalenteri-sivu

const App = () => {
    const [currentPage, setCurrentPage] = useState('customers'); // Näytettävä sivu

    const getCustomers = () => {
        // Asiakaslistan hakulogiikka
    };

    return (
        <div>
            <h1>Personal Trainer App</h1>

            {/* Navigointi */}
            <div>
                <button onClick={() => setCurrentPage('customers')}>Asiakkaat</button>
                <button onClick={() => setCurrentPage('trainings')}>Harjoitukset</button>
                <button onClick={() => setCurrentPage('addCustomer')}>Lisää asiakas</button>
                <button onClick={() => setCurrentPage('calendar')}>Kalenteri</button>
            </div>

            {/* Sivujen renderöinti */}
            {currentPage === 'customers' && <CustomerList />}
            {currentPage === 'trainings' && <TrainingList />}
            {currentPage === 'addCustomer' && (
                <AddCustomer 
                    getCustomers={getCustomers} 
                    navigateToCustomers={() => setCurrentPage('customers')} 
                />
            )}
            {currentPage === 'calendar' && <TrainingCalendar />} {/* Kalenteri renderöidään */}
        </div>
    );
};

export default App;
