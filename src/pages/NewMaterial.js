import React, { useState, useEffect } from 'react';
import Sidebar from '../Components/Sidebar';
import '../CSS/General.css';

const NewMaterial = () => {
    const [newMateria, setNewMaterial] = useState({
        MaterialTypId:"",
        Bezeichnung:"",
        SollBestand:"",
    })
    return (
        <div style={{ display: 'flex' }} className='form'>
            
        </div>
    );
};

export default NewMaterial;