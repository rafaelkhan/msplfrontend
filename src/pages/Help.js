import React from 'react';
import Sidebar from '../Components/Sidebar';
import Faq from "react-faq-component";
import '../CSS/Help.css'

function Help() {

    const data = {
        title: "Häufige Fragen",
        rows: [
            {
                title: "Wie ist die Webanwendung anzuwenden?",
                content: `Beginnen Sie mit der Anmeldung über Ihren Edu-Microsoft Account. 
                Anschließend gelangen Sie zum Dashboard, von wo aus Sie auf verschiedene Seiten zugreifen können. 
                Bei Fragen besuchen Sie bitte unseren FAQ Bereich, und wenn Sie mehr über unsere Entwickler erfahren möchten, finden Sie weitere Informationen auf der Seite "Über Uns". 
                Zum Zugriff auf Materialien navigieren Sie zum Lager und klicken Sie auf die visuelle Box, die jene Box repräsentiert, in der das Material gelagert ist. 
                Die folgenden Schritte sollten intuitiv verständlich sein.`,
            },
            {
                title: "Was soll ich tun, wenn ich vergesse, ein entnommenes Produkt zu erfassen?",
                content: `Besprechen Sie näheres mit der Lehrperson. Im Notfall tragen Sie die Materialien einfach nachträglich ein. `,
            },
            {
                title: "Warum muss ich die entnommenen Materialien eintragen?",
                content: `Die Materialien im MSPL sind für schulspezifische Projekte bestimmt. 
                Um sicherzustellen, dass stets ausreichend Materialien vorhanden sind, ist es wichtig, rechtzeitig neue Bestellungen aufzugeben. 
                Das Lehrpersonal erhält regelmäßig Einblick in den aktuellen Materialbestand, um rechtzeitig Nachbestellungen zu tätigen. `,
                },
            {
                title: "Wie viele Materialien darf ich entnehmen?",
                content: `Die Anzahl ist mit dem entsprechenden Lehrpersonal zu klären. `,
            },
            {
                title: "Kann ich die Webanwendung auf mobilen Geräten verwenden?",
                content: `Ja, Sie können auch mithilfe eines QR-Codes das Material scannenn und werden sofort 
                zum richtigen Material weitergeleitet. `,
            },
            {
                title: "Wie soll ich es kennzeichnen, wenn ich für eine andere Person ein Material entnehmen muss?",
                content: `Kennzeichnen Sie bitte, wie viele Produkte Sie entnommen haben und geben Sie dem Lehrpersonal 
                bescheid.`,
            },

        ],
    };

    const styles = {
        titleTextColor: "black",
        rowTitleColor: "black",
        rowContentColor: 'grey',
    };

    const config = {
        animate: true,
        arrowIcon: "-",
        tabFocus: true
    };

    return (
        <div className="container">
            <Sidebar />
            <div className="content">
                    <h1 className="Titel">FAQ</h1>
                <div className="faq-section">
                    <Faq
                        data={data}
                        styles={styles}
                        config={config}
                    />
            </div>
                </div>
        </div>
    );
}

export default Help;
