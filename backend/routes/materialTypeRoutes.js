const express = require('express');

module.exports = function(db) {
    const router = express.Router();

    router.get('/', (req, res) => {
        db.query('SELECT MaterialtypID, Bezeichnung, SollBestand FROM Materialtyp', (err, result) => {
            if (err) {
                console.error('Fehler beim Abrufen von Daten aus der Tabelle: ', err);
                res.status(500).send('Interner Serverfehler');
            } else {
                res.json(result);
            }
        });
    });

    router.post('/create', (req, res) => {
        const newMaterial = { ...req.body, Kontingent: 0 };

        db.query('ALTER TABLE Materialtyp AUTO_INCREMENT = 1');
        // Einfügen in Materialtyp
        db.query(
            'INSERT INTO Materialtyp (Bezeichnung, SollBestand, Kontingent) VALUES (?, ?, ?)',
            [newMaterial.Bezeichnung, newMaterial.SollBestand, newMaterial.Kontingent],
            (err, insertResult) => {
                if (err) {
                    console.error('Fehler beim Einfügen in Materialtyp: ', err);
                    return res.status(500).send('Interner Serverfehler');
                }

                // Abrufen der MaterialtypID
                db.query(
                    'SELECT MaterialtypID FROM Materialtyp WHERE Bezeichnung= ?',
                    [newMaterial.Bezeichnung],
                    (err, materialResults) => {
                        if (err) {
                            console.error('Fehler beim Abrufen der MaterialtypID: ', err);
                            return res.status(500).send('Interner Serverfehler');
                        }

                        const MaterialtypID = materialResults[0].MaterialtypID;
                        const attributes = ['Durchmesser', 'Kraft', 'Länge', 'Stärke'];

                        let completedQueries = 0;
                        attributes.forEach((attribute) => {
                            if (newMaterial[attribute] !== '' && newMaterial[attribute] !== undefined) {
                                db.query(
                                    'INSERT INTO Materialtyp_Materialattribute (MaterialtypID, AttributName, Quantitaet) VALUES (?, ?, ?)',
                                    [MaterialtypID, attribute, newMaterial[attribute]],
                                    (err, result) => {
                                        if (err) {
                                            console.error(`Fehler beim Einfügen des Attributs ${attribute}: `, err);
                                            return res.status(500).send('Interner Serverfehler');
                                        }
                                        completedQueries++;
                                        if (completedQueries === attributes.length) {
                                            res.status(201).send('Material und seine Attribute erfolgreich hinzugefügt');
                                        }
                                    }
                                );
                            } else {
                                completedQueries++;
                                if (completedQueries === attributes.length) {
                                    res.status(201).send('Material und seine Attribute erfolgreich hinzugefügt');
                                }
                            }
                        });
                    }
                );
            }
        );
    });



    router.get('/check-duplicate', (req, res) => {
        const { Bezeichnung } = req.query;
        db.query(
            'SELECT COUNT(*) AS count FROM Materialtyp WHERE  Bezeichnung = ?',
            [Bezeichnung],
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

    router.put('/:id/increase', (req, res) => {
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
    router.put('/:id/decrease', (req, res) => {
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

    router.delete('/delete/:id', (req, res) => {
        const { id } = req.params;

        // Zuerst löschen aus MaterialEntnahmeRecht
        db.query('DELETE FROM MaterialEntnahmeRecht WHERE MaterialtypID = ?', [id], (err, result) => {
            if (err) {
                console.error('Fehler beim Löschen in MaterialEntnahmeRecht: ', err);
                res.status(500).send('Interner Serverfehler');
                return;
            }

            // Dann löschen aus Box
            db.query('DELETE FROM Box WHERE MaterialtypID = ?', [id], (err, result) => {
                if (err) {
                    console.error('Fehler beim Löschen in Box: ', err);
                    res.status(500).send('Interner Serverfehler');
                    return;
                }

                // Dann löschen aus Materialtyp_Materialattribute
                db.query('DELETE FROM Materialtyp_Materialattribute WHERE MaterialtypID = ?', [id], (err, result) => {
                    if (err) {
                        console.error('Fehler beim Löschen in Materialtyp_Materialattribute: ', err);
                        res.status(500).send('Interner Serverfehler');
                        return;
                    }

                    // Schließlich löschen aus Materialtyp
                    db.query('DELETE FROM Materialtyp WHERE MaterialtypID = ?', [id], (err, result) => {
                        if (err) {
                            console.error('Fehler beim Löschen des Materials: ', err);
                            res.status(500).send('Interner Serverfehler');
                        } else {
                            res.status(200).send('Material erfolgreich gelöscht');
                        }
                    });
                });
            });
        });
    });


    return router;
};