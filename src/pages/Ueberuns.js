import React from 'react';
import Sidebar from '../Components/Sidebar';
import '../CSS/General.css';

function Ueberuns() {
    return (
        <div style={{ display: 'flex' }}>
            <Sidebar/>
            <div className="content">
                <h1 className="Titel">Über Uns</h1>
                <div className="about-us-container">
                <p>
                Willkommen auf der Website unseres Schülerteams der HTL SZU Ungargasse! Wir sind eine Gruppe von engagierten Schülern in unserer Abschlussklasse, die sich leidenschaftlich der Materialverwaltung im Bereich Smart Production Lap widmet.</p>
                <p>
                Die HTL SZU Ungargasse hat uns nicht nur eine herausragende technische Ausbildung ermöglicht, sondern auch die Gelegenheit geboten, unser erworbenes Wissen in praxisnahen Projekten anzuwenden. In unserer Abschlussklasse setzen wir nun unser gesammeltes Know-how ein, um an unserer Diplomarbeit über die Materialverwaltung im Kontext der Smarten Produktion zu arbeiten.</p>
                <p>
                    Unser Fokus liegt darauf, effiziente und innovative Methoden zur Materialverwaltung zu erforschen und zu entwickeln, um den Anforderungen im Bereich Smart Production Lap gerecht zu werden. Durch die Integration modernster Technologien und praxisnaher Ansätze streben wir nach Lösungen, die nicht nur den aktuellen Standards entsprechen, sondern auch die zukünftigen Bedürfnisse dieser aufstrebenden Industrie antizipieren.</p>
                <p>
                    Unser Team setzt sich aus individuellen Talenten, kreativen Ideen und verschiedenen Perspektiven zusammen, um ein umfassendes und leistungsstarkes Projekt zu gestalten. Wir sind stolz darauf, gemeinsam an dieser herausfordernden Aufgabe zu arbeiten und einen Beitrag zur Entwicklung der Smarten Produktion zu leisten.</p>

                </div>
            </div>
        </div>
    );

}

export default Ueberuns;