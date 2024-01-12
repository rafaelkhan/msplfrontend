const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
const port = 3100;

const db = mysql.createConnection({
    host: 'mspl.cpg00wwyge82.eu-north-1.rds.amazonaws.com',
    user: 'admin',
    password: 'Mspl2024',
    database: 'mspl',
    port: 3306,
});

db.connect((err) => {
    if (err) {
        console.error('Fehler beim Verbinden zur MySQL-Datenbank: ', err);
    } else {
        console.log('Verbunden mit der MySQL-Datenbank');
    }
});

app.use(express.json());
app.use(cors());


app.post('/api/user/login', (req, res) => {
    const { email, firstName, lastName } = req.body;

    // Überprüfen, ob der Benutzer bereits in der Account-Tabelle existiert
    db.query('SELECT NutzerID FROM Account WHERE Email = ?', [email], (err, result) => {
        if (err) {
            console.error('Fehler bei der Datenbankabfrage: ', err);
            res.status(500).send('Interner Serverfehler');
            return;
        }

        if (result.length === 0) {
            // Neuen Nutzer in Nutzer-Tabelle einfügen
            const insertNutzerQuery = 'INSERT INTO Nutzer (Vorname, Nachname) VALUES (?, ?)';
            db.query(insertNutzerQuery, [firstName, lastName], (err, result) => {
                if (err) {
                    console.error('Fehler beim Einfügen des Nutzers: ', err);
                    res.status(500).send('Interner Serverfehler');
                    return;
                }

                const nutzerID = result.insertId;

                // Neuen Account für den Nutzer in Account-Tabelle einfügen
                const insertAccountQuery = 'INSERT INTO Account (Email, NutzerID, Zugabe, EntnahmeLimit) VALUES (?, ?, ?, ?)';
                db.query(insertAccountQuery, [email, nutzerID, 0, 0], (err, result) => {
                    if (err) {
                        console.error('Fehler beim Einfügen des Accounts: ', err);
                        res.status(500).send('Interner Serverfehler');
                        return;
                    }
                    res.status(201).send('Neuer Benutzer und Account erfolgreich erstellt');
                });
            });
        } else {
            // Benutzer existiert bereits in Account-Tabelle
            res.status(200).send('Benutzer bereits vorhanden');
        }
    });
});
app.get('/api/user/class', async (req, res) => {
    const { email } = req.query;

    // Verbindung zur Datenbank herstellen
    // Hier wird angenommen, dass `db` Ihre Datenbankverbindung ist
    db.query('SELECT Nutzer.Schulklasse FROM Nutzer INNER JOIN Account ON Nutzer.NutzerID = Account.NutzerID WHERE Account.Email = ?', [email], (err, result) => {
        if (err) {
            console.error('Fehler bei der Datenbankabfrage: ', err);
            res.status(500).send('Interner Serverfehler');
            return;
        }

        if (result.length > 0) {
            res.json({ Schulklasse: result[0].Schulklasse });
        } else {
            res.status(404).send('Nutzer nicht gefunden');
        }
    });
});

app.get('/api/Materialtyp', (req, res) => {
    db.query('SELECT MaterialtypID, Bezeichnung, SollBestand FROM Materialtyp', (err, result) => {
        if (err) {
            console.error('Fehler beim Abrufen von Daten aus der Tabelle: ', err);
            res.status(500).send('Interner Serverfehler');
        } else {
            res.json(result);
        }
    });
});

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

app.post('/api/Materialtyp/create', (req, res) => {
    const newMaterial = { ...req.body, Kontingent: 0 };

    db.query(
        'INSERT INTO Materialtyp (MaterialtypID, Bezeichnung, SollBestand, Kontingent) VALUES (?, ?, ?, ?)',
        [newMaterial.MaterialtypID, newMaterial.Bezeichnung, newMaterial.SollBestand, newMaterial.Kontingent],
        (err, result) => {
            if (err) {
                console.error('Fehler beim Einfügen von neuem Material: ', err);
                res.status(500).send('Interner Serverfehler');
            } else {
                res.status(201).send('Material erfolgreich hinzugefügt');
            }
        }
    );
});

app.get('/api/Materialtyp/check-duplicate', (req, res) => {
    const { MaterialtypID, Bezeichnung } = req.query;

    db.query(
        'SELECT COUNT(*) AS count FROM Materialtyp WHERE MaterialtypID = ? OR Bezeichnung = ?',
        [MaterialtypID, Bezeichnung],
        (err, result) => {
            if (err) {
                console.error('Fehler beim Überprüfen von Duplikaten: ', err);
                res.status(500).send('Interner Serverfehler');
            } else {
                const duplicate = result[0].count > 0;
                res.json({ duplicate });
            }
        }
    );
});
app.delete('/api/Materialtyp/delete/:id', (req, res) => {
    const { id } = req.params;

    db.query('DELETE FROM Box AND Materialtyp WHERE MaterialtypID = ?', [id], (err, result) => {
        if (err) {
            console.error('Fehler beim Löschen des Materials: ', err);
            res.status(500).send('Interner Serverfehler');
        } else {
            res.status(200).send('Material erfolgreich gelöscht');
        }
    });
});
app.use((req, res) => {
    res.status(404).send('Not Found');
});

app.listen(port, () => {
    console.log(`Server läuft auf http://localhost:${port}`);
});
