import { NavLink } from 'react-router-dom';
import NewVisualImage from '../../assets/img/11.png';
import './index.css';

export const NewVisual = () => {
    const links = [
        { title: 'Redes sociais', path: '' },
        { title: 'Localizador de encomenda', path: '' },
        { title: 'Consultar tarifários e EMS postal', path: '' },
        { title: 'Selos', path: '' },
        { title: 'Calcular frete', path: '' },
        { title: 'Selos', path: '' }
    ];

    return (
        <div className="container new-visual mb-5">
            <div className="new-visual-content">
                <div className="image-container">
                    <img src={NewVisualImage} alt="Novo visual" className="img-fluid" />
                </div>
                <ul className="links">
                    {links.map((link, index) => (
                        <li className="link-item" key={index}>
                            <NavLink to={link.path} className="link">
                                {link.title}
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};
