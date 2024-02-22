import React from 'react';
import Sidebar from '../Components/Sidebar';
import '../CSS/General.css';
import Materiallager from "./img/Materiallager.jpg";
import Person from "./img/Person.jpg";
import '../CSS/UeberUns.css';


function Ueberuns() {
    return (
        <div className="pageContainer">
            <Sidebar/>
            <div className="content">
                <h1 className="titel">Über Uns</h1>
                <div className="frontend-container">
                    <img src={Materiallager} alt="Materiallager-img" className="img"/>
                    <div className="text-container">
                        <div className="text">
                            <p>Unser engagiertes Team besteht aus fünf Personen, die sich in der abschließenden Phase
                                ihrer
                                Schulausbildung im Bereich Betriebsinformatik und Wirtschaftsingenieurwesen befinden.
                                Gemeinsam haben wir uns die anspruchsvolle Aufgabe gestellt, im Rahmen unserer
                                Diplomarbeit
                                ein innovatives Inventursystem für das SZU zu konzipieren und zu programmieren.
                                Das von uns entwickelte System wird als unverzichtbares Instrument im
                                Materialverwaltungslager des MSPL (Material- und Servicezentrum für Projektlehre)
                                eingesetzt. Es ermöglicht die effiziente Erfassung und Verwaltung von Materialien, die
                                von
                                Schülern für unterschiedlichste Projekte genutzt werden. Unsere Zielsetzung ist es,
                                durch
                                die Implementierung dieses Systems einen bedeutenden Beitrag zur Optimierung der
                                Materialentnahme und -rückgabe zu leisten, und somit die Arbeitsabläufe für die
                                Schülerprojekte am SZU nachhaltig zu verbessern.</p>
                        </div>
                    </div>
                    <div className="person-pictures">
                        <div class="image-wrapper">
                            <img src={Person} alt="Person-img" class="person"/>
                            <div class="description">Rafael Khan</div>
                        </div>
                        <div class="image-wrapper">
                            <img src={Person} alt="Person-img" class="person"/>
                            <div class="description">Sameer Sufi</div>
                        </div>
                        <div className="image-wrapper">
                            <img src={Person} alt="Person-img" className="person"/>
                            <div className="description">Felix Hofer</div>
                        </div>
                        <div className="image-wrapper">
                            <img src={Person} alt="Person-img" className="person"/>
                            <div class="description">Sebastian Damm</div>
                        </div>
                        <div className="image-wrapper">
                            <img src={Person} alt="Person-img" className="person"/>
                            <div className="description">Mathias Muth</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );

}

export default Ueberuns;