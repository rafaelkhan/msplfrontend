const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const jwt = require('jsonwebtoken');
require('dotenv').config({ path: 'token.env' });

const userRoutes = require('./routes/userRoutes');
const classRoutes = require('./routes/classRoutes');
const materialTypeRoutes = require('./routes/materialTypeRoutes');

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

app.use('/api/user', userRoutes(db));
app.use('/api', classRoutes(db));
app.use('/api/Materialtyp', materialTypeRoutes(db));

app.use((req, res) => {
    res.status(404).send('Not Found');
});

app.listen(port, () => {
    console.log(`Server läuft auf http://localhost:${port}`);
});
