// MaterialChart.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
    ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip
} from 'recharts';
import axios from 'axios';

function MaterialChart() {
    const [materialData, setMaterialData] = useState([]);

    useEffect(() => {
        // Hier API-Aufruf für alle Materialien
        axios.get('/api/BoxMaterial/boxes')
            .then(response => {
                // Annahme: Sortiere die Materialien nach SollBestand und wähle die Top 5
                const sortedMaterialien = response.data.sort((a, b) => b.Menge - a.Menge);
                const top5 = sortedMaterialien.slice(0, 5);
                setMaterialData(top5.map(material => ({
                    name: material.Bezeichnung,
                    value: material.Menge,
                })));
            })
            .catch(error => console.error('Fehler beim Abrufen der Materialien:', error));
    }, []);

    return (
        <Link to="/Materialansicht">
            <ResponsiveContainer width="100%" height={300}>
            <BarChart
                data={materialData}
                margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
            >
                <XAxis dataKey="name"angle={-13} interval={0} tick={{ fontSize: 8 }} dy={8}/>
                <YAxis />
                <Tooltip formatter={(value, name, props) => ['sind noch Verfügbar', value]} />
                <Bar dataKey="value" fill="#5DADE2" radius={[5,5,0,0]}/>
            </BarChart>
            </ResponsiveContainer>
        </Link>
    );
}

export default MaterialChart;
