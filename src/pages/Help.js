import React from 'react';
import Sidebar from '../Components/Sidebar';
import Faq from "react-faq-component";
import '../CSS/Help.css'

function Help() {

    const data = {
        title: "FAQ",
        rows: [
            {
                title: "Wie funktioniert die Webapplikation?",
                content: `Die Website ist mit einer Datenbank im Backend verbunden. In der Datenbank sind Materialien des SPL 
                des SZU gespeichert. Wenn Sie ein Material entnehmen, dann kennzeichnen Sie dies bitte in der Materialverwaltung.`,
            },
            {
                title: "Wie ist die Webanwendung anzuwenden.",
                content: `Sie melden sich mit Ihrem Schul-Microsoft Account an und gehen zur Materialübersicht. Dort suchen 
                Sie dann die ID oder den Namen des Materials, welches Sie genommen haben, und kennzeichnen das mit einem 
                Klick auf das "-".`,
            },
            {
                title: "Was tun, wenn ich vergesse, ein genommenes Produkt zu erfassen?",
                content: `Besprechen Sie Näheres mit der Lehrperson. Im Notfall tragen Sie es einfach nachträglich ein. `,
            },
            {
                title: "Warum muss ich die entnommenen Produkte kennzeichnen?",
                content: `Die Produkte im MSPL sind für Projekte gedacht. Dass immer Produkte zur verfügung stehen,
                 muss rechtzeitig nachbestellt werden. Anhand der Datenbank sieht man dann wie viele Produkte noch zur Verfügung
                  stehen und wann nachbestellt werden muss.`,
            },
            {
                title: "Wie viele Materialien darf ich entnehmen?",
                content: `Die Anzahl ist mit dem entsprechenden Lehrpersonal zu klären. `,
            },
            {
                title: "Kann ich die Webanwendung auf mobilen Geräten verwenden?",
                content: `Ja, Sie können auch mithilfe eines QR-Codes das Material scannenn und werden sofort 
                zur Materialverwaltung weitergeleitet. `,
            },
            {
                title: "Was tun, wenn ich für eine andere Person ein Produkt entnehmen muss?",
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
