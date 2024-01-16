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
    return router;
};
