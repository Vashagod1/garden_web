import '../styles/components/Header.css'
import {NavLink} from "react-router-dom";
import {FaUser} from "react-icons/fa";

const links = [
    {id: 1, label: 'Памятка', link: '/guide'},
    {id: 2, label: 'Календарь', link: '/calendar'},
    {id: 3, label: 'Культуры', link: '/plants'},
];

function Header() {
    return (
        <div className='header'>
            <div className="header__container">
                <div className='header__logo'>
                    <NavLink to='/' className='header__logo__link'>
                        GardenWeb
                    </NavLink>
                </div>
                <nav className='header__nav'>
                    <ul className="header__list">
                        {links.map(link =>(
                            <li key={link.id}>
                                <NavLink
                                    className="header__nav-link"
                                    to={link.link}
                                >
                                    {link.label}
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                </nav>
                <div className="header__profile">
                    <button className="header__profile-btn">
                        <FaUser />
                    </button>
                </div>
            </div>
        </div>
    )
}
export default Header;