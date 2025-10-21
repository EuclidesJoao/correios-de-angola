import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { useGetPageContentBySlugQuery } from "../../features/pageContent";
import { CircularProgress, Box, Alert } from "@mui/material";
import GetPageContent from "../../components/getPageContent";


const PageContent: React.FC = () => {
  const slug = useSelector((state: RootState) => state.page.selectedSlug);
  const { data: pageContent, isLoading, error } = useGetPageContentBySlugQuery(slug!, { skip: !slug });

  if (!slug) {
    return <Alert severity="info" sx={{display: 'flex', justifyContent: 'center'}}>Selecione uma página para visualizar seu conteúdo.</Alert>;
  }

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return <Alert severity="error">Erro ao carregar conteúdo{JSON.stringify(error)}</Alert>;
  }

  if (!pageContent) {
    return <Alert severity="warning">No content found for slug: {slug}</Alert>;
  }

  return (
    <Box sx={{ p: 3 }}>
      <GetPageContent content={pageContent.rendered} />
    </Box>
  );
};

export default PageContent;
