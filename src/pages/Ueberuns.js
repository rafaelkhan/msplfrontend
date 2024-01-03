import React from 'react';
import Sidebar from '../Components/Sidebar';
import '../CSS/General.css';
import Materiallager from "./img/Materiallager.jpg";
import Person from "./img/Person.jpg";


function Ueberuns() {
    return (
        <div style={{ display: 'flex' }}>
            <Sidebar/>
            <div className="content">
                <h1 className="Titel">Über Uns</h1>
                <img
                    src={Materiallager}
                    alt="Materiallager-img"
                    style={{ width: '95%' }}
                />
                <div className="about-us-container">
                    <div>
                        <p>Unser engagiertes Team besteht aus fünf Personen, die sich in der abschließenden Phase ihrer Schulausbildung im Bereich Betriebsinformatik und Wirtschaftsingenieurwesen befinden. Gemeinsam haben wir uns die anspruchsvolle Aufgabe gestellt, im Rahmen unserer Diplomarbeit ein innovatives Inventursystem für das SZU zu konzipieren und zu programmieren.</p>

                        <p>Das von uns entwickelte System wird als unverzichtbares Instrument im Materialverwaltungslager des MSPL (Material- und Servicezentrum für Projektlehre) eingesetzt. Es ermöglicht die effiziente Erfassung und Verwaltung von Materialien, die von Schülern für unterschiedlichste Projekte genutzt werden. Unsere Zielsetzung ist es, durch die Implementierung dieses Systems einen bedeutenden Beitrag zur Optimierung der Materialentnahme und -rückgabe zu leisten, und somit die Arbeitsabläufe für die Schülerprojekte am SZU nachhaltig zu verbessern.</p>
                    </div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '20px', marginBottom: '50px' }}>
                    <img
                        src={Person}
                        alt="Person-img"
                        style={{ width: '10%', height: '10%', borderRadius: '50%' }}
                    />
                    <img
                        src={Person}
                        alt="Person-img"
                        style={{ width: '10%', height: '10%', borderRadius: '50%' }}
                    />
                    <img
                        src={Person}
                        alt="Person-img"
                        style={{ width: '10%', height: '10%', borderRadius: '50%' }}
                    />
                    <img
                        src={Person}
                        alt="Person-img"
                        style={{ width: '10%', height: '10%', borderRadius: '50%' }}
                    />
                    <img
                        src={Person}
                        alt="Person-img"
                        style={{ width: '10%', height: '10%', borderRadius: '50%' }}
                    />
                </div>
            </div>
        </div>
    );

}

export default Ueberuns;