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
    router.get('/entnahmeRecht/:MaterialtypID', (req, res) => {
        const { MaterialtypID } = req.params;
        db.query('SELECT Schulklasse FROM MaterialEntnahmeRecht WHERE MaterialtypID=?', [MaterialtypID], (err, results) => {
            if (err) {
                res.status(500).send('Interner Serverfehler');
            } else {
                // Gib das gesamte Ergebnisarray zurück, statt nur das erste Element
                res.json(results);
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

    router.post('/submitChanges', (req, res) => {
        const { BoxID, change } = req.body; // Annahme: `change` enthält die Gesamtänderung

        // SQL-Query zum Aktualisieren der Menge basierend auf BoxID und change
        const updateQuery = 'UPDATE Box SET Menge = Menge + ? WHERE BoxID = ?';

        db.query(updateQuery, [change, BoxID], (err, result) => {
            if (err) {
                console.error('Fehler beim Aktualisieren der Materialmenge:', err);
                return res.status(500).send('Interner Serverfehler');
            }
            res.send('Änderungen erfolgreich gespeichert');
        });
    });

    return router;
};