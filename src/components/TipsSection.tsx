
import '../styles/TipsSection.css';
import { tipsData } from "../data/TipsSection.ts";
import {NavLink} from "react-router-dom";

function TipsSection() {
    const firstFourTips = tipsData.slice(0, 4);

    return (
        <div className="tips">
            <div className="tips__section">
                <div className="tips__title">
                    Наши советы по началу:
                </div>
                <div className="tips__grid">
                    {firstFourTips.map((tip) => (
                        <div className="tips__grid-item" key={tip.id}>
                            <img className="tips__grid-img" src={tip.image} alt={tip.title} />
                            <h2 className="tips__grid-title">{tip.title}</h2>
                            <p className="tips__grid-desc">{tip.short}</p>
                            <NavLink to="/guide" className="tips__grid-link">Подробнее</NavLink>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default TipsSection;