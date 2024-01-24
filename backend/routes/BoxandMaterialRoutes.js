const express = require('express');

module.exports = function(db) {
    const router = express.Router();

    router.get('/boxes', (req, res) => {
        db.query('SELECT Box.BoxID, Box.Menge, Materialtyp.Bezeichnung, Materialtyp.MaterialtypID FROM Box INNER JOIN Materialtyp ON Box.MaterialtypID = Materialtyp.MaterialtypID', (err, results) => {
            if (err) {
                console.error('Fehler beim Abrufen der Box-Daten: ', err);
                res.status(500).send('Interner Serverfehler');
            } else {
                res.json(results);
            }
        });
    });
    router.get('/materialdaten/:BoxID', (req, res) => {
        const { BoxID } = req.params;
        db.query('SELECT Box.BoxID, Box.Menge, Materialtyp.Bezeichnung, Materialtyp.MaterialtypID FROM Box INNER JOIN Materialtyp ON Box.MaterialtypID = Materialtyp.MaterialtypID WHERE Box.BoxID= ?', [BoxID] , (err, results) => {
            if (err) {
                console.error('Fehler beim Abrufen der Box-Daten: ', err);
                res.status(500).send('Interner Serverfehler');
            } else {
                res.json(results);
            }
        });
    });
    router.get('/userRights/:email', (req, res) => {
        const { email } = req.params;
        db.query('SELECT Zugabe, EntnahmeLimit FROM Account WHERE Email = ?', [email], (err, results) => {
            if (err) {
                res.status(500).send('Interner Serverfehler');
            } else {
                res.json(results[0] || {});
            }
        });
    });

    // Neue Route für Materialattribute
    router.get('/materialAttributes/:MaterialtypID', (req, res) => {
        const { MaterialtypID } = req.params;
        db.query('SELECT * FROM Materialtyp_Materialattribute WHERE MaterialtypID = ?', [MaterialtypID], (err, results) => {
            if (err) {
                res.status(500).send('Interner Serverfehler');
            } else {
                res.json(results);
            }
        });
    });

    router.post('/updateMenge', (req, res) => {
        const { BoxID, Menge } = req.body;
        db.query('UPDATE Box SET Menge = ? WHERE BoxID = ?', [Menge, BoxID], (err, results) => {
            if (err) {
                console.error('Fehler beim Aktualisieren der Menge: ', err);
                res.status(500).send('Interner Serverfehler');
            } else {
                res.json({ message: 'Menge erfolgreich aktualisiert' });
            }
        });
    });

    return router;
};