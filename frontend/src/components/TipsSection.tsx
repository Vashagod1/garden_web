import '../styles/TipsSection.css';
import {useEffect, useState} from "react";
import {fetchTips, type Tip} from "../api/tipsApi.ts";

export function TipsSection() {
    const [tips, setTips] = useState<Tip[]>([]);

    useEffect(() => {
        fetchTips().then(setTips);
    }, [])

    return (
        <div className="tips">
            <div className="tips__section">
                <div className="tips__title">
                    Наши советы по началу:
                </div>
                <div className="tips__grid">
                    {tips.map((tip) => (
                        <li key={tip.id}>
                            <div className="tips__grid-item">
                                <h2 className="tips__grid-title">{tip.title}</h2>
                                <p className="tips__grid-desc">{tip.text}</p>
                            </div>
                        </li>
                    ))}
                </div>
            </div>
        </div>
    );
}
