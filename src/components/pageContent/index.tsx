// components/PageContent/index.tsx
import React from 'react';
import { useGetPageContentBySlugQuery } from '../../features/pageContent';
import { CircularProgress, Box, Alert } from '@mui/material';

interface PageContentProps {
  slug: string;
}

const PageContent: React.FC<PageContentProps> = ({ slug }) => {
  const { data: pageContent, isLoading, error } = useGetPageContentBySlugQuery(slug);

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Alert severity="error">
        Error loading page content: {JSON.stringify(error)}
      </Alert>
    );
  }

  if (!pageContent) {
    return (
      <Alert severity="warning">
        Page content not found for slug: {slug}
      </Alert>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <div dangerouslySetInnerHTML={{ __html: pageContent.rendered }} />
    </Box>
  );
};

export default PageContent;