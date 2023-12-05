// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Homepage from './Components/Homepage'; // Pfade entsprechend der Dateistruktur anpassen
import Dashboard from './Components/Dashboard';
import './App.css';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/Dashboard" element={<Dashboard/>} />
                <Route path="/" element={<Homepage />} />
            </Routes>
        </Router>
    );
}

export default App;
