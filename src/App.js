// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Homepage from './Components/Homepage'; // Pfade entsprechend der Dateistruktur anpassen
import Login from './Components/Login'; // Pfade entsprechend der Dateistruktur anpassen
import './App.css';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/Login" element={<Login />} />
                <Route path="/" element={<Homepage />} />
            </Routes>
        </Router>
    );
}

export default App;
