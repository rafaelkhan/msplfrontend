// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Homepage from './Components/Homepage';
import Dashboard from './Components/Dashboard';
import Sidebar from './Components/Sidebar';
import './App.css';

function App() {

    return (
        <Router>
            <div>
                <Routes>
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/" element={<Homepage />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
