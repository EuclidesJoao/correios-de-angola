import { NavLink } from "react-router-dom";
import CorreiosLogo from "../../assets/img/CorreiosLogo.png";
import CorreiosLogoWhite from "../../assets/img/Logo-Branco.png";

export const LogoBrand = () => {
  return (
    <>
      <NavLink to="/" className="logo">
        <img
          src={CorreiosLogo}
          alt="Logotipo dos correios de Angola"
          className="img-fluid"
          style={{width: '10rem'}}
        />
      </NavLink>
    </>
  );
};

export const LogoBrandWhite = () => {
  return (
    <>
      <NavLink to="/" className="logo">
        <img
          src={CorreiosLogoWhite}
          alt="Logotipo dos correios de Angola"
          className="img-fluid"
        />
      </NavLink>
    </>
  );
};
