import { Box, Container, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useLoginMutation } from "../../features/auth/authAPI";
import LinearWithValueLabel from "../linearProgress";
import { useAuth } from "../../context/authContext";
import { useNavigate } from "react-router-dom";

const payload = {
  username: "wordpress",
  password: "wordpress",
};

export const Login = () => {
  const navigate = useNavigate();
  const { isAuthenticated, login: authLogin } = useAuth();
  const [shouldRedirect, setShouldRedirect] = useState(false);
  const [login, { isLoading, isError, isSuccess, data }] = useLoginMutation();
  

  useEffect(() => {
    if (!isAuthenticated) {
      login(payload);
    }
  }, [isAuthenticated, login]);

  useEffect(() => {
    if (isSuccess && data?.access_token) {
      authLogin(data.access_token);
      setShouldRedirect(true);
    }
  }, [isSuccess, data, authLogin]);

  useEffect(() => {
    if (shouldRedirect && isAuthenticated) {
      const redirectTimer = setTimeout(() => {
        navigate("/");
      }, 2000);

      return () => clearTimeout(redirectTimer);
    }
  }, [shouldRedirect, isAuthenticated, navigate]);

  if (isAuthenticated && !shouldRedirect) {
    navigate("/");
    return null;
  }

  if (isLoading || shouldRedirect) {
    return (
      <Box sx={{ padding: 4 }}>
        <Container
          maxWidth="md"
          sx={{
            height: "100vh",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <LinearWithValueLabel />
        </Container>
      </Box>
    );
  }

  if (isError) {
    return (
      <Box sx={{ padding: 4 }}>
        <Container maxWidth="md">
          <Typography color="error">
            Falha no login. Tente novamente.
          </Typography>
        </Container>
      </Box>
    );
  }

  return null;
};
