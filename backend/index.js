const express = require('express');
const mysql = require('mysql');

const app = express();
const port = 5000;

// MySQL-Verbindung herstellen
const db = mysql.createConnection({
    host: 'mspl.cpg00wwyge82.eu-north-1.rds.amazonaws.com',
    user: 'admin',
    password: 'Mspl2024',
    database: 'mspl',
    port: 3306,
});

db.connect(err => {
    if (err) {
        console.error('Fehler beim Verbinden zur MySQL-Datenbank: ', err);
    } else {
        console.log('Verbunden mit der MySQL-Datenbank');
    }
});

// Beispiel-Endpunkt
app.get('/api/example', (req, res) => {
    db.query('SELECT * FROM beispiel_tabelle', (err, result) => {
        if (err) {
            console.error('Fehler beim Abrufen von Daten aus der Tabelle: ', err);
            res.status(500).send('Interner Serverfehler');
        } else {
            res.json(result);
        }
    });
});

app.listen(port, () => {
    console.log(`Server läuft auf http://localhost:${port}`);
});