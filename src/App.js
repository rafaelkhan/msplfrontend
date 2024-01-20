
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Homepage from './pages/Homepage';
import Dashboard from './pages/Dashboard';
import Materialansicht from './pages/Materialansicht';
import Materialdetails from './pages/Materialdetails';
import Materialverwaltung from './pages/Materialverwaltung';
import Benutzerverwaltung from './pages/Benutzerverwaltung';
import Ueberuns from './pages/Ueberuns';
import Help from './pages/Help';
import NewMaterial from './pages/NewMaterial';
import { isAuthenticated } from './services/authProvider';
import { jwtDecode } from 'jwt-decode';
import './App.css';


function App() {
    let userClass = null;
    const token = localStorage.getItem('accessToken');
    if (token) {
        const decodedToken = jwtDecode(token);
        userClass = decodedToken.userClass;
    }

    return (
        <Router>
            <div>
                <Routes>
                    <Route path="/" element={<Homepage/>} />
                    <Route path="/dashboard" element={isAuthenticated() ? <Dashboard /> : <Navigate replace to="/" />} />
                    <Route path="/materialansicht" element={isAuthenticated() ? <Materialansicht /> : <Navigate replace to="/" />} />
                    <Route path="/material-detail/:BoxID" element={isAuthenticated() ? <Materialdetails /> : <Navigate replace to="/" />} />
                    {userClass === 'LEHRER' && <Route path="/materialverwaltung" element={isAuthenticated() ? <Materialverwaltung /> : <Navigate replace to="/" />} />}
                    {userClass === 'LEHRER' && <Route path="/benutzerverwaltung" element={isAuthenticated() ? <Benutzerverwaltung /> : <Navigate replace to="/" />} />}
                    <Route path="/ueberuns" element={<Ueberuns />} />
                    <Route path="/help" element={<Help />} />
                    <Route path="/newmaterial" element={isAuthenticated() ? <NewMaterial /> : <Navigate replace to="/" />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
