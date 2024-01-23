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
