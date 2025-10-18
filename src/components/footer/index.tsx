import React from "react";
import {
  Box,
  Container,
  Typography,
  Link,
  IconButton,
  Stack,
  useTheme,
  useMediaQuery,
  Divider,
} from "@mui/material";
import {
  FacebookOutlined,
  Instagram,
  YouTube,
  LinkedIn,
  LocationOn,
  Email,
  LocalPhone,
} from "@mui/icons-material";
import { LogoBrandWhite } from "../logoBrand";

export const Footer = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const socialMedias = [
    {
      icon: <FacebookOutlined />,
      path: "https://web.facebook.com/correiosdeangolaep?locale=vi_VN",
      label: "Facebook",
    },
    {
      icon: <Instagram />,
      path: "https://www.instagram.com/oficial_correiosdeangola",
      label: "Instagram",
    },
    {
      icon: <YouTube />,
      path: "https://youtube.com/@CorreiosDeAngolaCA",
      label: "YouTube",
    },
    {
      icon: <LinkedIn />,
      path: "https://www.linkedin.com/company/correios-de-angola-encta-e-p/",
      label: "LinkedIn",
    },
  ];

  const quickLinks = [
    {
      text: "PORTAL OFICIAL DO GOVERNO DA REPÚBLICA DE ANGOLA",
      path: "https://governo.gov.ao/",
    },
    {
      text: "MIN. DAS TELECOMUNICAÇÕES TECNOLOGIAS DE INF. E COMUNICAÇÃO SOCIAL",
      path: "https://minttics.gov.ao/ao/",
    },
    {
      text: "UNIÃO POSTAL UNIVERSAL (UPU)",
      path: "https://www.upu.int/en/home",
    },
    {
      text: "EXPRESS MAIL SERVICE (EMS)",
      path: "https://ems.post/en",
    },
  ];

  const contactInfo = [
    {
      icon: <LocationOn />,
      text: "Largo Fernando Coelho Da Cruz, Nº 12 - 1º, Luanda",
    },
    {
      icon: <Email />,
      text: "comercial@correiosdeangola.ao",
    },
    {
      icon: <LocalPhone />,
      text: "(+244) 928 679 000 - Apoio Comercial",
    },
  ];

  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "rgba(226, 33, 29, 1)", // Updated background color
        color: "white",
        py: 6,
        mt: "auto",
      }}
    >
      <Container maxWidth="lg">
        {/* Main Content */}
        <Box
          sx={{
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            gap: 4,
            mb: 4,
          }}
        >
          {/* Company Info Section */}
          <Box
            sx={{
              flex: 1,
              minWidth: isMobile ? "100%" : "50%",
            }}
          >
            <Stack spacing={3}>
              {/* Logo with reduced size */}
              <Box
                sx={{
                  mb: 2,
                  "& .logo img": {
                    maxWidth: "180px", // Reduced from default size
                    height: "auto",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      transform: "scale(1.05)",
                    },
                  },
                }}
              >
                <LogoBrandWhite />
              </Box>

              {/* Description */}
              <Typography
                variant="body1"
                sx={{
                  opacity: 0.95,
                  lineHeight: 1.6,
                  maxWidth: "400px",
                  fontWeight: 300,
                }}
              >
                224 Anos De Experiência Em Serviços Postais.
              </Typography>

              {/* Contact Information */}
              <Stack spacing={2}>
                {contactInfo.map((item, index) => (
                  <Box
                    key={index}
                    sx={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: 2,
                    }}
                  >
                    <Box
                      sx={{
                        color: "white",
                        display: "flex",
                        alignItems: "center",
                        minWidth: "24px",
                        opacity: 0.9,
                      }}
                    >
                      {item.icon}
                    </Box>
                    <Typography
                      variant="body2"
                      sx={{
                        opacity: 0.95,
                        lineHeight: 1.5,
                        fontWeight: 300,
                      }}
                    >
                      {item.text}
                    </Typography>
                  </Box>
                ))}
              </Stack>
            </Stack>
          </Box>

          {/* Links Section */}
          <Box
            sx={{
              flex: 1,
              minWidth: isMobile ? "100%" : "50%",
            }}
          >
            <Stack spacing={4}>
              {/* Social Media Links */}
              <Box>
                <Stack
                  direction="row"
                  spacing={1}
                  sx={{ mb: 3 }}
                  flexWrap="wrap"
                >
                  {socialMedias.map((media, index) => (
                    <IconButton
                      key={index}
                      component="a"
                      href={media.path}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={media.label}
                      sx={{
                        color: "white",
                        backgroundColor: "rgba(255, 255, 255, 0.15)",
                        "&:hover": {
                          backgroundColor: "rgba(255, 255, 255, 0.25)",
                          transform: "translateY(-2px)",
                        },
                        transition: "all 0.3s ease",
                      }}
                    >
                      {media.icon}
                    </IconButton>
                  ))}
                </Stack>
              </Box>

              {/* Quick Links */}
              <Box>
                <Typography
                  variant="h6"
                  component="h3"
                  sx={{
                    fontWeight: 600,
                    mb: 2,
                    fontSize: isMobile ? "1.1rem" : "1.25rem",
                    color: "white",
                    opacity: 0.95,
                  }}
                >
                  Links Rápidos
                </Typography>
                <Stack spacing={1.5}>
                  {quickLinks.map((link, index) => (
                    <Link
                      key={index}
                      href={link.path}
                      target="_blank"
                      rel="noopener noreferrer"
                      sx={{
                        color: "white",
                        opacity: 0.9,
                        textDecoration: "none",
                        "&:hover": {
                          opacity: 1,
                          textDecoration: "underline",
                          color: "rgba(255, 255, 255, 1)",
                        },
                        transition: "all 0.2s ease",
                        fontSize: isMobile ? "0.875rem" : "0.9rem",
                        lineHeight: 1.4,
                        display: "block",
                        fontWeight: 300,
                      }}
                    >
                      {link.text}
                    </Link>
                  ))}
                </Stack>
              </Box>
            </Stack>
          </Box>
        </Box>

        {/* Divider */}
        <Divider sx={{ borderColor: "rgba(255, 255, 255, 0.2)", my: 3 }} />

        {/* Copyright */}
        <Box>
          <Typography
            variant="body2"
            align="center"
            sx={{
              opacity: 0.8,
              fontWeight: 300,
            }}
          >
            © {new Date().getFullYear()} Correios de Angola. Todos os direitos
            reservados.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};
