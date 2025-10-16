import './index.css';
import { services } from "../data";

export const Services = () => {   
    return (
        <div className="container mb-5">
            <ul className="services">
                {services.map((service, index) => (
                    <li className="service" key={index}>
                        <div className="service-icon">
                            <img src={service.icon} alt={service.name} className="img-fluid"/>
                        </div>
                        <div className="service-content">
                            <h3>{service.name}</h3>
                            <p>{service.description}</p>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};
