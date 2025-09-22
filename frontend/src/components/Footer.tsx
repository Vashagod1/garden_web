import '../styles/Footer.css'
import {FaTelegram} from "react-icons/fa";
import {links} from "../data/Links.ts";
import {NavLink} from "react-router-dom";

function Footer() {
    return (
        <footer className="footer">
            <div className="footer__content">
                <div className="footer__copyright">
                    <span>&copy; {new Date().getFullYear()} GardenWeb. Все права защищены</span>
                </div>
                <nav className="footer__nav">
                    <ul className="footer__list">
                        {links.map((link) => (
                            <li key={link.id}>
                                <NavLink
                                    className="footer__nav-link"
                                    to={link.link}
                                >
                                    {link.label}
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                </nav>
                <div className="footer__socials">
                    <a href="https://t.me/ya_danya_52" target="_blank" rel="noopener noreferrer"><FaTelegram/></a>
                </div>
            </div>
            <div className="footer__disclaimer">
                Советы и рекомендации на сайте не являются профессиональной агрономической консультацией.<br/>
                Перед применением учитывайте индивидуальные особенности вашего участка и климата.
            </div>
        </footer>
    )
}

export default Footer;