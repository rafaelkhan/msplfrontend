// App.js

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AuthProvider from './AuthProvider';
import Homepage from './Components/Homepage';
import Login from './Components/Login';

function App() {
    return (
        <AuthProvider>
            <Router>
                <div className="App">
                    <Routes>
                        <Route path="/" element={<Homepage />} />
                        <Route path="/login" element={<Login />} />
                    </Routes>
                </div>
            </Router>
        </AuthProvider>
    );
}

export default App;
