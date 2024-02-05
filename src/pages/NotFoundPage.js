import React from 'react';
import { Link } from 'react-router-dom';

function NotFoundPage() {
    return (
        <div>
            <h1>Seite nicht gefunden</h1>
            <p>Entschuldigung, die Seite, die Sie suchen, existiert nicht oder Sie haben nicht die nötigen Rechte.</p>
            <Link to="/Dashboard">Zurück zur Startseite</Link>
        </div>
    );
}

export default NotFoundPage;