import React from 'react';
import Sidebar from '../Components/Sidebar';
import Faq from "react-faq-component";

function Help() {

    const data = {
        title: "FAQ",
        rows: [
            {
                title: "Erklärung der Webaplikation.",
                content: `Die Website ist mit einer Datenbank im backend verbunden. In der Datenbank sind Materialien des SPL 
                des SZU gespeichert. Wenn Sie ein Material entnehmen, dann kennzeichnen Sie dies bitte in der Materialverwaltung.`,
            },
            {
                title: "Wie ist die Webaplikation anzuwenden.",
                content: `Sie melden sich mit Ihrem Schul-Microsoft Account ein und gehen zur Materialübersicht. Dort suchen 
                Sie dann die ID oder den Namen des Materiales, welches Sie genommen haben und kennzeichnen das mit einem 
                klick auf das "-".`,
            },
            {
                title: "Was mache ich, wenn ich vergessen habe ein Produkt, welches ich genommen habe einzutragen.",
                content: `Besprechen Sie näheres mit der Lehrperson. Im Notfall tragen Sie es einfach im nachhinein ein. `,
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
        arrowIcon: "^",
        tabFocus: true
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center' }}> {/* Fan-Bereich in die Mitte verschieben */}
            <Sidebar />
            <div className="content">
                <h1 className="Titel">Help</h1>
                <div className="content" style={{ textAlign: 'center' }}>
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
