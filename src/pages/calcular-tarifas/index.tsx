import React, { useEffect, useState } from "react";
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
  InputAdornment,
  Stack,
} from "@mui/material";
import { Calculate, Search } from "@mui/icons-material";
import {
  useGetTarifariosQuery,
  useGetProdutoByTarifarioQuery,
  useGetRegiaoQuery,
  useGetTarifarioDetailsQuery,
} from "../../features/tarifarios/tarifarios.API";

// Types
interface Tariff {
  Produto: string;
  Peso_min: number;
  Peso_max: number;
  Regiao: string;
  preco: number;
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

export const CalcularTarifas: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    tarifario: "",
    produto: "",
    regiao: "",
    peso: "",
  });

  const [tarifariosDetail, setTarifariosDetail] = useState<Tariff[]>([]);
  const [errors, setErrors] = useState<FormErrors>({});
  const [pesoToFetch, setPesoToFetch] = useState<number | null>(null);

  // Queries
  const { data: tarifariosData, isLoading: tarifariosLoading } =
    useGetTarifariosQuery();
  const { data: produtosData, isFetching: produtosFetching } =
    useGetProdutoByTarifarioQuery(formData.tarifario || "", {
      skip: !formData.tarifario,
    });
  const { data: regiaoData, isFetching: regiaoFetching } = useGetRegiaoQuery(
    undefined,
    {
      skip: !formData.produto,
    }
  );

  const { data: tarifarioDetailsData, isFetching: tarifarioDetailsFetching } =
    useGetTarifarioDetailsQuery(pesoToFetch as number, {
      skip: pesoToFetch === null,
    });

  useEffect(() => {
    if (tarifarioDetailsData) {
      setTarifariosDetail(tarifarioDetailsData);
    }
  }, [tarifarioDetailsData]);

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
    } else if (parseFloat(formData.peso) > 50) {
      newErrors.peso = "O peso máximo permitido é 50 kg";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!validateForm()) return;

    setPesoToFetch(parseFloat(formData.peso));
  };

  console.log("Tarifarios Details ", tarifariosDetail);

  return (
    <Box
      sx={{ py: 4, backgroundColor: "background.default", minHeight: "100vh" }}
    >
      <Container maxWidth="lg" sx={{ mt: 10 }}>
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
          <Box sx={{ width: { xs: "100%", md: "40%" } }}>
            <Card elevation={3}>
              <CardContent sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom sx={{ mb: 3 }}>
                  Calcular Tarifa
                </Typography>

                <form onSubmit={handleSubmit}>
                  <Stack spacing={3}>
                    {/* Tarifário */}
                    <TextField
                      select
                      fullWidth
                      label="Tarifário"
                      name="tarifario"
                      value={formData.tarifario}
                      onChange={handleInputChange}
                      variant="outlined"
                    >
                      {tarifariosLoading ? (
                        <MenuItem disabled>Carregando...</MenuItem>
                      ) : (
                        tarifariosData?.map((option: any) => (
                          <MenuItem
                            key={option.Descricao}
                            value={option.Descricao}
                          >
                            {option.Descricao}
                          </MenuItem>
                        ))
                      )}
                    </TextField>

                    {/* Produto */}
                    <TextField
                      select
                      fullWidth
                      label="Produto"
                      name="produto"
                      value={formData.produto}
                      onChange={handleInputChange}
                      disabled={!formData.tarifario}
                    >
                      {produtosFetching ? (
                        <MenuItem disabled>Carregando...</MenuItem>
                      ) : (
                        produtosData?.map((option: any) => (
                          <MenuItem
                            key={option.Descricao}
                            value={option.Descricao}
                          >
                            {option.Descricao}
                          </MenuItem>
                        ))
                      )}
                    </TextField>

                    {/* Região */}
                    <TextField
                      select
                      fullWidth
                      label="Região"
                      name="regiao"
                      value={formData.regiao}
                      onChange={handleInputChange}
                      disabled={!formData.produto}
                    >
                      {regiaoFetching ? (
                        <MenuItem disabled>Carregando...</MenuItem>
                      ) : (
                        regiaoData?.map((option: any) => (
                          <MenuItem
                            key={option.Descricao}
                            value={option.Descricao}
                          >
                            {option.Descricao}
                          </MenuItem>
                        ))
                      )}
                    </TextField>

                    {/* Peso */}
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
                        inputProps: { min: 0, step: 0.01, max: 50 },
                      }}
                      placeholder="0.00"
                    />

                    <Button
                      type="submit"
                      variant="contained"
                      size="large"
                      fullWidth
                      startIcon={<Calculate />}
                      sx={{
                        py: 1.5,
                        backgroundColor: "#e2211d",
                        "&:hover": { backgroundColor: "#bf1a18" },
                      }}
                    >
                      Calcular Tarifa
                    </Button>
                  </Stack>
                </form>
              </CardContent>
            </Card>
          </Box>

          {/* Result Table */}
          <Box sx={{ width: { xs: "100%", md: "60%" } }}>
            <Card elevation={3}>
              <CardContent sx={{ p: 3 }}>
                <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                  <Search sx={{ mr: 1, color: "primary.main" }} />
                  <Typography variant="h6">
                    Tabela de Tarifários –{" "}
                    {formData.regiao
                      ? formData.regiao.charAt(0).toUpperCase() +
                        formData.regiao.slice(1)
                      : "Selecione uma região"}
                  </Typography>
                </Box>

                <TableContainer
                  component={Paper}
                  variant="outlined"
                  sx={{ maxHeight: 400 }}
                >
                  <Table stickyHeader size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell>Produto</TableCell>
                        <TableCell>Peso Min (kg)</TableCell>
                        <TableCell>Peso Max (kg)</TableCell>
                        <TableCell>Região</TableCell>
                        <TableCell>Preço</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {tarifariosDetail?.length > 0 ? (
                        tarifariosDetail.map((tariff, index) => (
                          <TableRow key={index}>
                            <TableCell>{tariff.Produto}</TableCell>
                            <TableCell>{tariff.Peso_min}</TableCell>
                            <TableCell>{tariff.Peso_max}</TableCell>
                            <TableCell>{tariff.Regiao}</TableCell>
                            <TableCell sx={{ fontWeight: "bold" }}>
                              {tariff.preco} AKZ
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={5} align="center">
                            {tarifarioDetailsFetching
                              ? "Carregando..."
                              : "Nenhum tarifário encontrado."}
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>
            </Card>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
};
