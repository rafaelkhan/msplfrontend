import React from 'react';
import Sidebar from '../Components/Sidebar';
import '../CSS/General.css';

function Help() {
    return (
        <div style={{ display: 'flex' }}>
            <Sidebar/>
            <div className="content">
                <h1 className="Titel">Help</h1>
            </div>
        </div>
    );
}

export default Help;