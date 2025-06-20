import React from 'react';
import { Grid, Typography, Box, Pagination, CircularProgress } from '@mui/material';
import ProductCard from './ProductCard';
import { Product } from '../../types/types';

interface ProductListProps {
  products: Product[];
  loading?: boolean;
  error?: string | null;
  title?: string;
}

const ProductList: React.FC<ProductListProps> = ({ 
  products, 
  loading = false, 
  error = null, 
  title 
}) => {
  const [page, setPage] = React.useState(1);
  const productsPerPage = 12;

  const handleChangePage = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const indexOfLastProduct = page * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(products.length / productsPerPage);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ my: 4 }}>
        <Typography color="error" align="center">
          {error}
        </Typography>
      </Box>
    );
  }

  if (products.length === 0) {
    return (
      <Box sx={{ my: 4 }}>
        <Typography align="center">
          No products found.
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ my: 4 }}>
      {title && (
        <Typography variant="h4" component="h1" gutterBottom>
          {title}
        </Typography>
      )}
      
      <Grid container spacing={3}>
        {currentProducts.map((product) => (
          <Grid key={product.id} size={{ xs: 12, sm: 6, md: 4, lg: 3 }} component="div">
            <ProductCard product={product} />
          </Grid>
        ))}
      </Grid>
      
      {totalPages > 1 && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <Pagination 
            count={totalPages} 
            page={page} 
            onChange={handleChangePage} 
            color="primary" 
            size="large"
          />
        </Box>
      )}
    </Box>
  );
};

export default ProductList;