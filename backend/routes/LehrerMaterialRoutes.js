const express = require('express');

module.exports = function(db) {
    const router = express.Router();
//--------------------------------------------------------------------------------------------------------------------------------
    router.put('/update/:id', (req, res) => {
        const { id } = req.params;
        const updatedMaterial = req.body; // Enthält die Werte für Durchmesser, Kraft, Länge, Stärke

        const attributes = ['Durchmesser', 'Kraft', 'Länge', 'Stärke'];
        let completedQueries = 0;
        let errorsOccurred = false;

        attributes.forEach((attribute) => {
            if (updatedMaterial[attribute] !== undefined) {
                // Überprüft ob das Attribut exisiert
                db.query('SELECT COUNT(*) AS count FROM Materialtyp_Materialattribute WHERE MaterialtypID = ? AND AttributName = ?',
                    [id, attribute],
                    (err, result) => {
                        if (err) {
                            console.error(`Fehler beim Überprüfen des Attributs ${attribute}: `, err);
                            errorsOccurred = true;
                            return;
                        }

                        if (result[0].count > 0) {
                            // Attribut existiert, wird nur aktualisiert
                            db.query('UPDATE Materialtyp_Materialattribute SET Quantitaet = ? WHERE MaterialtypID = ? AND AttributName = ?',
                                [updatedMaterial[attribute], id, attribute],
                                (err, updateResult) => {
                                    handleQueryCompletion(err, attribute);
                                }
                            );
                        } else {
                            // Attribut existiert nicht, wird hinzugefügt
                            db.query('INSERT INTO Materialtyp_Materialattribute (MaterialtypID, AttributName, Quantitaet) VALUES (?, ?, ?)',
                                [id, attribute, updatedMaterial[attribute]],
                                (err, insertResult) => {
                                    handleQueryCompletion(err, attribute);
                                }
                            );
                        }
                    }
                );
            } else {
                completedQueries++;
                if (completedQueries === attributes.length && !errorsOccurred) {
                    res.status(200).send('Materialattribute erfolgreich aktualisiert');
                }
            }
        });

        function handleQueryCompletion(err, attribute) {
            if (err) {
                console.error(`Fehler beim Verarbeiten des Attributs ${attribute}: `, err);
                errorsOccurred = true;
                if (completedQueries === attributes.length - 1) {
                    res.status(500).send('Fehler beim Aktualisieren der Materialattribute');
                }
            }
            completedQueries++;
            if (!errorsOccurred && completedQueries === attributes.length) {
                res.status(200).send('Materialattribute erfolgreich aktualisiert');
            }
        }
    });
//--------------------------------------------------------------------------------------------------------------------------------

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
        db.query('INSERT INTO Materialtyp (Bezeichnung, SollBestand, Kontingent) VALUES (?, ?, ?)', [newMaterial.Bezeichnung, newMaterial.SollBestand, newMaterial.Kontingent], (err, insertResult) => {
                if (err) {
                    console.error('Fehler beim Einfügen in Materialtyp: ', err);
                    return res.status(500).send('Interner Serverfehler');
                }
                db.query('SELECT MaterialtypID FROM Materialtyp WHERE Bezeichnung= ?', [newMaterial.Bezeichnung], (err, materialResults) => {
                        if (err) {
                            console.error('Fehler beim Abrufen der MaterialtypID: ', err);
                            return res.status(500).send('Interner Serverfehler');
                        }
                        const MaterialtypID = materialResults[0].MaterialtypID;
                        const { BoxID, Menge } = newMaterial;
                        if (BoxID !== undefined && Menge !== undefined) {
                            db.query('INSERT INTO Box (BoxID, Menge, MaterialtypID) VALUES (?, ?, ?)', [BoxID, Menge, MaterialtypID], (err, result) => {
                                if (err) {
                                    console.error('Fehler beim Einfügen der Box: ', err);
                                }
                            });
                        }
                        const attributes = ['Durchmesser', 'Kraft', 'Länge', 'Stärke'];
                        let completedQueries = 0;
                        attributes.forEach((attribute) => {
                            if (newMaterial[attribute] !== '' && newMaterial[attribute] !== undefined) {
                                db.query('INSERT INTO Materialtyp_Materialattribute (MaterialtypID, AttributName, Quantitaet) VALUES (?, ?, ?)', [MaterialtypID, attribute, newMaterial[attribute]], (err, result) => {
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

    router.get('/occupiedBoxes', (req, res) => {
        db.query('SELECT BoxID FROM Box WHERE MaterialtypID IS NOT NULL', (err, results) => {
            if (err) {
                console.error('Fehler beim Abrufen besetzter Boxen: ', err);
                res.status(500).send('Interner Serverfehler');
            } else {
                res.json(results.map(result => result.BoxID));
            }
        });
    });

    router.put('/:id/updateTargetStock', (req, res) => {
        const { id } = req.params;
        const { newTargetStock } = req.body;
        db.query('UPDATE Materialtyp SET SollBestand = ? WHERE MaterialtypID = ?', [newTargetStock, id], (err, result) => {
            if (err) {
                console.error('Fehler beim Aktualisieren des Soll-Bestands: ', err);
                res.status(500).send('Interner Serverfehler');
            } else {
                res.status(200).send('Soll-Bestand erfolgreich aktualisiert');
            }
        });
    });

    router.get('/check-duplicate', (req, res) => {
        const { Bezeichnung } = req.query;
        db.query('SELECT COUNT(*) AS count FROM Materialtyp WHERE  Bezeichnung = ?', [Bezeichnung], (err, result) => {
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

    router.get('/Box', (req, res) => {
        db.query('SELECT BoxID, Menge, MaterialtypID FROM Box', (err, result) => {
            if (err) {
                console.error('Fehler beim Abrufen der Box-Daten: ', err);
                res.status(500).send('Interner Serverfehler');
            } else {
                res.json(result);
            }
        });
    });

    router.put('/Box/updateStock', (req, res) => {
        const { materialtypId, newStock } = req.body;
        db.query('UPDATE Box SET Menge = ? WHERE MaterialtypID = ?', [newStock, materialtypId], (err, result) => {
            if (err) {
                console.error('Fehler beim Aktualisieren des Box-Bestands: ', err);
                res.status(500).send('Interner Serverfehler');
            } else {
                res.status(200).send('Box-Bestand erfolgreich aktualisiert');
            }
        });
    });

    router.put('/updateBoxAssignment', async (req, res) => {
        const { materialtypId, boxId } = req.body;

        try {
            await db.beginTransaction();

            await db.query('DELETE FROM Accessed WHERE BoxID IN (SELECT BoxID FROM Box WHERE MaterialtypID = ?)', [materialtypId]);

            await db.query('UPDATE Box SET BoxID = ? WHERE MaterialtypID = ?', [boxId, materialtypId]);

            await db.commit();
            res.status(200).send('Box-Zuweisung und zugehörige Accessed-Einträge erfolgreich aktualisiert');
        } catch (error) {
            await db.rollback();
            console.error('Fehler beim Aktualisieren der Box-Zuweisung: ', error);
            res.status(500).send('Interner Serverfehler');
        }
    });

    router.delete('/delete/:id', (req, res) => {
        const { id } = req.params;
        db.query('DELETE FROM MaterialEntnahmeRecht WHERE MaterialtypID = ?', [id], (err, result) => {
            if (err) {
                console.error('Fehler beim Löschen in MaterialEntnahmeRecht: ', err);
                res.status(500).send('Interner Serverfehler');
                return;
            }
            db.query('DELETE FROM Box WHERE MaterialtypID = ?', [id], (err, result) => {
                if (err) {
                    console.error('Fehler beim Löschen in Box: ', err);
                    res.status(500).send('Interner Serverfehler');
                    return;
                }
                db.query('DELETE FROM Materialtyp_Materialattribute WHERE MaterialtypID = ?', [id], (err, result) => {
                    if (err) {
                        console.error('Fehler beim Löschen in Materialtyp_Materialattribute: ', err);
                        res.status(500).send('Interner Serverfehler');
                        return;
                    }
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

    router.get('/access/:materialId', (req, res) => {
        const { materialId } = req.params;
        db.query('SELECT Schulklasse FROM MaterialEntnahmeRecht WHERE MaterialtypID = ?', [materialId], (err, results) => {
            if (err) {
                console.error('Fehler beim Abrufen der Zugriffsrechte: ', err);
                res.status(500).send('Interner Serverfehler');
            } else {
                res.json(results);
            }
        });
    });

    router.post('/access/:materialId', (req, res) => {
        const { materialId } = req.params;
        const { schulklassen } = req.body; // Array von Schulklasse-IDs

        schulklassen.forEach(schulklasse => {
            db.query('SELECT COUNT(*) AS count FROM MaterialEntnahmeRecht WHERE MaterialtypID = ? AND Schulklasse = ?',
                [materialId, schulklasse], (err, results) => {
                    if (err) {
                        console.error('Fehler beim Überprüfen der Zugriffsrechte: ', err);
                        return res.status(500).send('Interner Serverfehler');
                    } else {
                        if (results[0].count === 0) {
                            db.query('INSERT INTO MaterialEntnahmeRecht (MaterialtypID, Schulklasse) VALUES (?, ?)',
                                [materialId, schulklasse], (err, result) => {
                                    if (err) {
                                        console.error('Fehler beim Hinzufügen der Zugriffsrechte: ', err);
                                        return res.status(500).send('Interner Serverfehler');
                                    }
                                });
                        }
                    }
                });
        });

        res.status(201).send('Zugriffsrechte überprüft und aktualisiert');
    });

    // Endpunkt zum Entfernen von Zugriffsrechten
    router.delete('/access/:materialId', (req, res) => {
        const { materialId } = req.params;
        const { schulklassen } = req.body; // Array von Schulklasse-IDs

        schulklassen.forEach(schulklasse => {
            db.query('DELETE FROM MaterialEntnahmeRecht WHERE MaterialtypID = ? AND Schulklasse = ?',
                [materialId, schulklasse], (err, result) => {
                    if (err) {
                        console.error('Fehler beim Entfernen der Zugriffsrechte: ', err);
                        return res.status(500).send('Interner Serverfehler');
                    }
                });
        });

        res.status(200).send('Zugriffsrechte erfolgreich entfernt');
    });

    return router;
};
