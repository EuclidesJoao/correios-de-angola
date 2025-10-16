import './index.css';
import { LogoBrandWhite } from '../logoBrand';
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import { NavLink } from 'react-router-dom';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EmailIcon from '@mui/icons-material/Email';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';

export const Footer = () => {
    const socialMedias = [
        { icon: <FacebookOutlinedIcon />, path: '' },
        { icon: <WhatsAppIcon />, path: '' },
        { icon: <InstagramIcon />, path: '' },
        { icon: <YouTubeIcon />, path: '' },
    ];

    return (
        <footer className="container-fluid footer">
            <div className="container footer-content">
                <div className="footer-section info-section">
                    <LogoBrandWhite />
                    <p className='my-3'>224 Anos De Experiência Em Serviços Postais.</p>

                    <ul className="contact-info">
                        <li className="contact-item mb-1">
                            <LocationOnIcon className="icon" />
                            <p>Largo Fernando Coelho Da Cruz, Nº 12 - 1º, Luanda</p>
                        </li>
                        <li className="contact-item">
                            <EmailIcon className="icon mb-1" />
                            <p>comercial@correiosdeangola.ao</p>
                        </li>
                        <li className="contact-item mb-1">
                            <LocalPhoneIcon className="icon" />
                            <p>(+244) 928 679 000 - Apoio Comercial</p>
                        </li>
                    </ul>
                </div>

                <div className="footer-section links-section">

                    <ul className="social-media mb-4">
                        {socialMedias.map((media, index) => (
                            <li key={index}>
                                <NavLink to={media.path} className="social-link">
                                    {media.icon}
                                </NavLink>
                            </li>
                        ))}
                    </ul>

                    <h3>Links Rápidos</h3>
                    <ul className="quick-links">
                        <li>PORTAL OFICIAL DO GOVERNO DA REPÚBLICA DE ANGOLA</li>
                        <li>MIN. DAS TELECOMUNICAÇÕES TECNOLOGIAS DE INF. E COMUNICAÇÃO SOCIAL</li>
                        <li>UNIÃO POSTAL UNIVERSAL (UPU)</li>
                        <li>EXPRESS MAIL SERVICE (EMS)</li>
                    </ul>

                </div>
            </div>
        </footer>
    );
};
