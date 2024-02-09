const express = require('express');

module.exports = function(db) {
    const router = express.Router();

    router.get('/benutzer', (req, res) => {
        db.query('SELECT * FROM Account JOIN Nutzer ON Account.NutzerID = Nutzer.NutzerID', (err, results) => {
            if (err) {
                console.error('Fehler bei der Datenbankabfrage: ', err);
                res.status(500).send('Interner Serverfehler');
            } else {
                res.json(results);
            }
        });
    });

    // Alle Schulklassen abrufen
    router.get('/schulklassen', (req, res) => {
        db.query('SELECT * FROM Schulklasse', (err, results) => {
            if (err) {
                console.error('Fehler bei der Datenbankabfrage: ', err);
                res.status(500).send('Interner Serverfehler');
            } else {
                res.json(results);
            }
        });
    });

    // Neue Schulklasse hinzufügen
    router.post('/schulklassen', (req, res) => {
        const { Schulklasse } = req.body;
        const query = 'INSERT INTO Schulklasse (Schulklasse) VALUES (?)';
        db.query(query, [Schulklasse], (err, result) => {
            if (err) res.status(500).send(err);
            res.status(201).send(`Schulklasse ${Schulklasse} erfolgreich hinzugefügt.`);
        });
    });

    // Schulklasse löschen
    router.delete('/schulklassen/:Schulklasse', (req, res) => {
        const { Schulklasse } = req.params;

        const deleteMaterialEntnahmeRecht = 'DELETE FROM MaterialEntnahmeRecht WHERE Schulklasse = ?';
        const updateNutzerSchulklasse = 'UPDATE Nutzer SET Schulklasse = NULL WHERE Schulklasse = ?';

        db.query(deleteMaterialEntnahmeRecht, [Schulklasse], (err, result) => {
            if (err) {
                console.error('Fehler beim Löschen in MaterialEntnahmeRecht: ', err);
                return res.status(500).send('Interner Serverfehler beim Löschen in MaterialEntnahmeRecht');
            }
            db.query(updateNutzerSchulklasse, [Schulklasse], (err, result) => {
                if (err) {
                    console.error('Fehler beim Aktualisieren der Nutzer: ', err);
                    return res.status(500).send('Interner Serverfehler beim Aktualisieren der Nutzer');
                }
                const query = 'DELETE FROM Schulklasse WHERE Schulklasse = ?';
                db.query(query, [Schulklasse], (err, result) => {
                    if (err) {
                        console.error('Fehler beim Löschen der Schulklasse: ', err);
                        return res.status(500).send('Interner Serverfehler beim Löschen der Schulklasse');
                    }
                    res.send(`Schulklasse ${Schulklasse} erfolgreich gelöscht und zugehörige Nutzer aktualisiert.`);
                });
            });
        });
    });



    router.put('/benutzer/:id', (req, res) => {
        const { id } = req.params;
        const { schulklasse } = req.body;
        db.query('UPDATE Nutzer SET Schulklasse = ? WHERE NutzerID = ?', [schulklasse, id], (err, results) => {
            if (err) {
                console.error('Fehler bei der Datenbankabfrage: ', err);
                res.status(500).send('Interner Serverfehler');
            } else {
                res.json(results);
            }
        });
    });

    router.put('/account/:id', (req, res) => {
        const { id } = req.params;
        const { zugabe, entnahmeLimit } = req.body;

        db.query('UPDATE Account SET Zugabe = ?, EntnahmeLimit = ? WHERE NutzerID = ?',
            [zugabe, entnahmeLimit, id], (err, results) => {
                if (err) {
                    console.error('Fehler bei der Datenbankaktualisierung: ', err);
                    res.status(500).send('Interner Serverfehler');
                } else {
                    res.status(200).send('Account erfolgreich aktualisiert');
                }
            });
    });

    return router;
};
