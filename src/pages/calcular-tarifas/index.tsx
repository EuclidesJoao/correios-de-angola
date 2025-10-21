import React, { useState } from "react";
import {
  Box,
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  TextField,
  MenuItem,
  Button,
  Card,
  CardContent,
  Alert,
  InputAdornment,
  Stack,
} from "@mui/material";
import { Calculate, Search } from "@mui/icons-material";

// Types
interface Tariff {
  id: number;
  produto: string;
  pesoMin: number;
  pesoMax: number;
  regiao: string;
  preco: number;
  moeda: string;
}

interface FormData {
  tarifario: string;
  produto: string;
  regiao: string;
  peso: string;
}

interface FormErrors {
  peso?: string;
}

const TARIFF_DATA: Tariff[] = [
  {
    id: 1,
    produto: "Carta",
    pesoMin: 0,
    pesoMax: 0.5,
    regiao: "Local",
    preco: 100,
    moeda: "AOA",
  },
  {
    id: 2,
    produto: "Carta",
    pesoMin: 0.5,
    pesoMax: 1.0,
    regiao: "Local",
    preco: 150,
    moeda: "AOA",
  },
  {
    id: 3,
    produto: "Encomenda",
    pesoMin: 0.5,
    pesoMax: 2.0,
    regiao: "Nacional",
    preco: 500,
    moeda: "AOA",
  },
  {
    id: 4,
    produto: "Encomenda",
    pesoMin: 2.0,
    pesoMax: 5.0,
    regiao: "Nacional",
    preco: 800,
    moeda: "AOA",
  },
  {
    id: 5,
    produto: "Carta",
    pesoMin: 0,
    pesoMax: 0.1,
    regiao: "Internacional",
    preco: 1500,
    moeda: "AOA",
  },
  {
    id: 6,
    produto: "Encomenda",
    pesoMin: 0.1,
    pesoMax: 2.0,
    regiao: "Internacional",
    preco: 3500,
    moeda: "AOA",
  },
];

const TARIFF_TYPES = [
  { value: "nacional", label: "Nacional" },
  { value: "internacional", label: "Internacional" },
];

const PRODUCT_TYPES = [
  { value: "carta", label: "Carta" },
  { value: "encomenda", label: "Encomenda" },
];

const REGION_TYPES = [
  { value: "local", label: "Local" },
  { value: "nacional", label: "Nacional" },
  { value: "internacional", label: "Internacional" },
];

export const CalcularTarifas: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    tarifario: "nacional",
    produto: "carta",
    regiao: "local",
    peso: "",
  });
  const [calculatedTariff, setCalculatedTariff] = useState<Tariff | null>(null);
  const [errors, setErrors] = useState<FormErrors>({});

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.peso || parseFloat(formData.peso) <= 0) {
      newErrors.peso = "Por favor, insira um peso válido maior que 0";
    }

    if (parseFloat(formData.peso) > 50) {
      newErrors.peso = "O peso máximo permitido é 50 kg";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    const weight = parseFloat(formData.peso);
    const matchingTariff = TARIFF_DATA.find(
      (tariff) =>
        tariff.produto.toLowerCase() === formData.produto &&
        tariff.regiao.toLowerCase() === formData.regiao &&
        weight >= tariff.pesoMin &&
        weight < tariff.pesoMax
    );

    setCalculatedTariff(matchingTariff || null);
  };

  const filteredTariffs = TARIFF_DATA.filter(
    (tariff) => tariff.regiao.toLowerCase() === formData.regiao
  );

  return (
    <Box
      sx={{ py: 4, backgroundColor: "background.default", minHeight: "100vh", }}
    >
      <Container maxWidth="lg" sx={{mt: 10}}>
        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          sx={{
            fontWeight: "bold",
            color: "InfoText",
            mb: 4,
            textAlign: "center",
          }}
        >
          Consultar Tarifários e EMS Postal
        </Typography>

        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={4}
          alignItems="flex-start"
        >
          {/* Form Section */}
          <Box sx={{ width: { xs: "100%", md: "50%" } }}>
            <Card elevation={3}>
              <CardContent sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom sx={{ mb: 3 }}>
                  Calcular Tarifa
                </Typography>

                <form onSubmit={handleSubmit}>
                  <Stack spacing={3}>
                    <TextField
                      select
                      fullWidth
                      label="Tarifário"
                      name="tarifario"
                      value={formData.tarifario}
                      onChange={handleInputChange}
                      variant="outlined"
                    >
                      {TARIFF_TYPES.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </TextField>

                    <TextField
                      select
                      fullWidth
                      label="Produto"
                      name="produto"
                      value={formData.produto}
                      onChange={handleInputChange}
                      variant="outlined"
                    >
                      {PRODUCT_TYPES.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </TextField>

                    <TextField
                      select
                      fullWidth
                      label="Região"
                      name="regiao"
                      value={formData.regiao}
                      onChange={handleInputChange}
                      variant="outlined"
                    >
                      {REGION_TYPES.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </TextField>

                    <TextField
                      fullWidth
                      label="Peso"
                      name="peso"
                      type="number"
                      value={formData.peso}
                      onChange={handleInputChange}
                      error={!!errors.peso}
                      helperText={errors.peso}
                      variant="outlined"
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">kg</InputAdornment>
                        ),
                        inputProps: {
                          min: 0,
                          step: 0.01,
                          max: 50,
                        },
                      }}
                      placeholder="0.00"
                    />

                    <Button
                      type="submit"
                      variant="contained"
                      size="large"
                     
                      fullWidth
                      startIcon={<Calculate />}
                      sx={{ py: 1.5, backgroundColor: "#e2211d", '&:hover': { backgroundColor: '#bf1a18' } }}
                    >
                      Calcular Tarifa
                    </Button>
                  </Stack>
                </form>

                {calculatedTariff && (
                  <Alert severity="success" sx={{ mt: 3 }}>
                    <Typography variant="h6">
                      Tarifa Calculada: {calculatedTariff.preco}{" "}
                      {calculatedTariff.moeda}
                    </Typography>
                    <Typography variant="body2" sx={{ mt: 1 }}>
                      {calculatedTariff.produto} • {calculatedTariff.pesoMin}-
                      {calculatedTariff.pesoMax}kg • {calculatedTariff.regiao}
                    </Typography>
                  </Alert>
                )}

                {calculatedTariff === null && formData.peso && (
                  <Alert severity="warning" sx={{ mt: 3 }}>
                    Nenhuma tarifa encontrada para os critérios selecionados.
                  </Alert>
                )}
              </CardContent>
            </Card>
          </Box>

          <Box sx={{ width: { xs: "100%", md: "50%" } }}>
            <Card elevation={3}>
              <CardContent sx={{ p: 3 }}>
                <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                  <Search sx={{ mr: 1, color: "primary.main" }} />
                  <Typography variant="h6">
                    Tabela de Tarifários -{" "}
                    {formData.regiao.charAt(0).toUpperCase() +
                      formData.regiao.slice(1)}
                  </Typography>
                </Box>

                <TableContainer
                  component={Paper}
                  variant="outlined"
                  sx={{ maxHeight: 400 }}
                >
                  <Table stickyHeader size="small">
                    <TableHead sx={{backgroundColor: '#e2211d !important'}}>
                      <TableRow>
                        <TableCell
                          sx={{
                            fontWeight: "bold",
                            backgroundColor: '#e2211d !important',
                            color: "white",
                          }}
                        >
                          Produto
                        </TableCell>
                        <TableCell
                          sx={{
                            fontWeight: "bold",
                             backgroundColor: '#e2211d !important',
                            color: "white",
                          }}
                        >
                          Peso Min (kg)
                        </TableCell>
                        <TableCell
                          sx={{
                            fontWeight: "bold",
                             backgroundColor: '#e2211d !important',
                            color: "white",
                          }}
                        >
                          Peso Max (kg)
                        </TableCell>
                        <TableCell
                          sx={{
                            fontWeight: "bold",
                             backgroundColor: '#e2211d !important',
                            color: "white",
                          }}
                        >
                          Região
                        </TableCell>
                        <TableCell
                          sx={{
                            fontWeight: "bold",
                             backgroundColor: '#e2211d !important',
                            color: "white",
                          }}
                        >
                          Preço
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {filteredTariffs.map((tariff) => (
                        <TableRow
                          key={tariff.id}
                          hover
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                            backgroundColor:
                              calculatedTariff?.id === tariff.id
                                ? "action.selected"
                                : "inherit",
                          }}
                        >
                          <TableCell>{tariff.produto}</TableCell>
                          <TableCell>{tariff.pesoMin}</TableCell>
                          <TableCell>{tariff.pesoMax}</TableCell>
                          <TableCell>{tariff.regiao}</TableCell>
                          <TableCell sx={{ fontWeight: "bold" }}>
                            {tariff.preco} {tariff.moeda}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>

                {filteredTariffs.length === 0 && (
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mt: 2, textAlign: "center" }}
                  >
                    Nenhum tarifário encontrado para esta região.
                  </Typography>
                )}
              </CardContent>
            </Card>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
};
