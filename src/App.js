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
import Accessed from './pages/Accessed';
import NotFoundPage from './pages/NotFoundPage';
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

    const handlePrivateRoute = (Component) => {
        if (!isAuthenticated()) {
            const currentPath = window.location.pathname;
            if(currentPath=='/'){
                localStorage.setItem('preAuthPath', '/dashboard');
            }
            else {
                localStorage.setItem('preAuthPath', currentPath);
            }
            return <Navigate replace to="/" />;
        }
        return <Component />;
    };

    return (
        <Router>
            <div>
                <Routes>
                    <Route path="/" element={<Homepage />} />
                    <Route path="/dashboard" element={handlePrivateRoute(Dashboard)} />
                    <Route path="/materialansicht" element={handlePrivateRoute(Materialansicht)} />
                    <Route path="/material-detail/:BoxID" element={handlePrivateRoute(Materialdetails)} />
                    {userClass === 'LEHRER' && <Route path="/materialverwaltung" element={handlePrivateRoute(Materialverwaltung)} />}
                    {userClass === 'LEHRER' && <Route path="/benutzerverwaltung" element={handlePrivateRoute(Benutzerverwaltung)} />}
                    {userClass === 'LEHRER' && <Route path="/accessed" element={handlePrivateRoute(Accessed)} />}
                    <Route path="/ueberuns" element={<Ueberuns />} />
                    <Route path="/help" element={<Help />} />
                    <Route path="/newmaterial" element={handlePrivateRoute(NewMaterial)} />
                    <Route path="*" element={<NotFoundPage />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
