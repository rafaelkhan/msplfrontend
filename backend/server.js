const express = require('express');
const mysql = require('mysql');

const app = express();
const port = 3001;

// MySQL-Verbindung herstellen
const db = mysql.createConnection({
    host: 'localhost:ewrwjl',
    user: 'dein_mysql_benutzername',
    password: 'dein_mysql_passwort',
    database: 'deine_datenbank',
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