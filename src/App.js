// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Homepage from './pages/Homepage';
import Dashboard from './pages/Dashboard';
import Materialverwaltung from './pages/Materialverwaltung';
import Ueberuns from './pages/Ueberuns';
import Help from './pages/Help';
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
                    <Route path="/ueberuns" element={<Ueberuns />} />
                    <Route path="/Help" element={<Help />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
