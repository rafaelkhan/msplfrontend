const express = require('express');
const mysql = require('mysql');
const cors = require('cors')

const app = express();
const port = 3100;

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
app.use(cors());
// Beispiel-Endpunkt
app.get('/api/Materialtyp', (req, res) => {
    db.query('SELECT MaterialtypID,Bezeichnung,SollBestand FROM Materialtyp', (err, result) => {
        if (err) {
            console.error('Fehler beim Abrufen von Daten aus der Tabelle: ', err);
            res.status(500).send('Interner Serverfehler');
        } else {
            res.json(result);
        }
    });
});
// ...

// Beispiel-Endpunkt für Aktualisierung der Verfügbarkeit
app.put('/api/Materialtyp/:id/increase', (req, res) => {
    const { id } = req.params;

    db.query('UPDATE Materialtyp SET SollBestand = SollBestand + 1 WHERE MaterialtypID = ?', [id], (err, result) => {
        if (err) {
            console.error('Fehler beim Aktualisieren des Bestands: ', err);
            res.status(500).send('Interner Serverfehler');
        } else {
            res.status(200).send('Bestand erfolgreich erhöht');
        }
    });
});

app.put('/api/Materialtyp/:id/decrease', (req, res) => {
    const { id } = req.params;

    db.query('UPDATE Materialtyp SET SollBestand = SollBestand - 1 WHERE MaterialtypID = ?', [id], (err, result) => {
        if (err) {
            console.error('Fehler beim Aktualisieren des Bestands: ', err);
            res.status(500).send('Interner Serverfehler');
        } else {
            res.status(200).send('Bestand erfolgreich verringert');
        }
    });
});

// ...

app.listen(port, () => {
    console.log(`Server läuft auf http://localhost:${port}`);
});