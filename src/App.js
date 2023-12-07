// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Homepage from './Components/Homepage';
import Dashboard from './Components/Dashboard';
import Materialverwaltung from './Components/Materialverwaltung'
import Benutzerverwaltung from './Components/Benutzerverwaltung'
import Sidebar from './Components/Sidebar';
import './App.css';

function App() {

    return (
        <Router>
            <div>
                <Routes>
                    <Route path="/" element={<Homepage />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/materialverwaltung" element={<Materialverwaltung />} />
                    <Route path="/benutzerverwaltung" element={<Benutzerverwaltung />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
