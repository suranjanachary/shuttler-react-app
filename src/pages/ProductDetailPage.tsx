import React, { useEffect } from 'react';
import { Box, Typography, CircularProgress, Container } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { setSelectedProduct } from '../store/slices/productsSlice';
import ProductDetail from '../components/products/ProductDetail';
import ProductList from '../components/products/ProductList';

const ProductDetailPage: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const dispatch = useDispatch();
  
  const { products, selectedProduct } = useSelector((state: RootState) => state.products);

  useEffect(() => {
    if (productId) {
      dispatch(setSelectedProduct(productId));
      // Scroll to top when product changes
      window.scrollTo(0, 0);
    }
  }, [dispatch, productId]);

  // Get related products (same category)
  const relatedProducts = selectedProduct
    ? products
        .filter(product => 
          product.category === selectedProduct.category && 
          product.id !== selectedProduct.id
        )
        .slice(0, 4)
    : [];

  if (!selectedProduct) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container>
      <ProductDetail product={selectedProduct} />
      
      {relatedProducts.length > 0 && (
        <Box sx={{ my: 8 }}>
          <Typography variant="h5" component="h2" gutterBottom>
            Related Products
          </Typography>
          <ProductList products={relatedProducts} />
        </Box>
      )}
    </Container>
  );
};

export default ProductDetailPage;