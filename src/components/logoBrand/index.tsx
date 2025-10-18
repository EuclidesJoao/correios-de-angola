import { NavLink } from "react-router-dom";
import CorreiosLogo from "../../assets/img/CorreiosLogo.png";
import CorreiosLogoWhite from "../../assets/img/Logo-Branco.png";
import { Box } from "@mui/material";

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
    <Box
      sx={{
        '& .logo': {
          display: 'inline-block',
          '& img': {
            maxWidth: '180px', // Reduced size for elegance
            height: 'auto',
            transition: 'all 0.3s ease',
            '&:hover': {
              opacity: 0.9,
            }
          }
        }
      }}
    >
      <NavLink to="/" className="logo">
        <img
          src={CorreiosLogoWhite}
          alt="Logotipo dos correios de Angola"
        />
      </NavLink>
    </Box>
  );
};