
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Homepage from './pages/Homepage';
import Dashboard from './pages/Dashboard';
import Materialverwaltung from './pages/Materialverwaltung';
import Benutzerverwaltung from './pages/Benutzerverwaltung';
import Ueberuns from './pages/Ueberuns';
import Help from './pages/Help';
import NewMaterial from './pages/NewMaterial';
import { isAuthenticated } from './services/authProvider';
import './App.css';


function App() {
    return (
        <Router>
            <div>
                <Routes>
                    <Route path="/" element={<Homepage/>} />
                    <Route path="/dashboard" element={isAuthenticated() ? <Dashboard /> : <Navigate replace to="/" />} />
                    <Route path="/materialverwaltung" element={isAuthenticated() ? <Materialverwaltung /> : <Navigate replace to="/" />} />
                    <Route path="/benutzerverwaltung" element={isAuthenticated() ? <Benutzerverwaltung /> : <Navigate replace to="/" />} />
                    <Route path="/ueberuns" element={<Ueberuns />} />
                    <Route path="/help" element={<Help />} />
                    <Route path="/newmaterial" element={isAuthenticated() ? <NewMaterial /> : <Navigate replace to="/" />} />
                    {/* Fügen Sie hier weitere Routen hinzu, falls benötigt */}
                </Routes>
            </div>
        </Router>
    );
}

export default App;
