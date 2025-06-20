import React from 'react';
import { 
  Box, 
  Typography, 
  Grid, 
  Button, 
  Divider, 
  Rating, 
  Chip, 
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  IconButton,
  Breadcrumbs,
  Link as MuiLink
} from '@mui/material';
import { 
  ShoppingCart as ShoppingCartIcon,
  Favorite as FavoriteIcon,
  Share as ShareIcon,
  NavigateNext as NavigateNextIcon
} from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Product } from '../../types/types';
import { addToCart } from '../../store/slices/cartSlice';

interface ProductDetailProps {
  product: Product;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ product }) => {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart(product));
  };

  return (
    <Box sx={{ my: 4 }}>
      <Breadcrumbs 
        separator={<NavigateNextIcon fontSize="small" />} 
        aria-label="breadcrumb"
        sx={{ mb: 3 }}
      >
        <MuiLink component={Link} to="/" color="inherit">
          Home
        </MuiLink>
        <MuiLink 
          component={Link} 
          to={`/category/${product.category}`} 
          color="inherit"
        >
          {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
        </MuiLink>
        {product.subCategory && (
          <MuiLink 
            component={Link} 
            to={`/category/${product.category}/subcategory/${product.subCategory}`} 
            color="inherit"
          >
            {product.subCategory.charAt(0).toUpperCase() + product.subCategory.slice(1)}
          </MuiLink>
        )}
        <Typography color="text.primary">{product.name}</Typography>
      </Breadcrumbs>

      <Grid container spacing={4}>
        <Grid size={{ xs: 12, md: 6 }} component="div">
          <Paper 
            elevation={2} 
            sx={{ 
              p: 2, 
              display: 'flex', 
              justifyContent: 'center', 
              alignItems: 'center',
              height: '400px',
              bgcolor: 'background.paper'
            }}
          >
            <Box 
              component="img" 
              src={product.imageUrl || 'https://via.placeholder.com/500x500?text=No+Image'} 
              alt={product.name}
              sx={{ 
                maxWidth: '100%', 
                maxHeight: '100%', 
                objectFit: 'contain' 
              }}
            />
          </Paper>
        </Grid>
        
        <Grid size={{ xs: 12, md: 6 }} component="div">
          <Typography variant="h4" component="h1" gutterBottom>
            {product.name}
          </Typography>
          
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Rating value={product.rating} precision={0.5} readOnly />
            <Typography variant="body2" sx={{ ml: 1 }}>
              ({product.rating})
            </Typography>
          </Box>
          
          <Typography variant="h5" color="primary" sx={{ mb: 2 }}>
            ₹{product.price.toFixed(2)}
          </Typography>
          
          <Box sx={{ mb: 2 }}>
            {product.stock > 0 ? (
              <Chip label="In Stock" color="success" />
            ) : (
              <Chip label="Out of Stock" color="error" />
            )}
          </Box>
          
          <Typography variant="body1" paragraph>
            {product.description}
          </Typography>
          
          <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
            <Button 
              variant="contained" 
              color="primary" 
              size="large" 
              startIcon={<ShoppingCartIcon />}
              onClick={handleAddToCart}
              disabled={product.stock <= 0}
              fullWidth
            >
              Add to Cart
            </Button>
            
            <IconButton color="primary" aria-label="add to favorites">
              <FavoriteIcon />
            </IconButton>
            
            <IconButton color="primary" aria-label="share">
              <ShareIcon />
            </IconButton>
          </Box>
        </Grid>
      </Grid>
      
      <Divider sx={{ my: 4 }} />
      
      {product.specifications && Object.keys(product.specifications).length > 0 && (
        <Box sx={{ my: 4 }}>
          <Typography variant="h5" gutterBottom>
            Specifications
          </Typography>
          
          <TableContainer component={Paper}>
            <Table>
              <TableBody>
                {Object.entries(product.specifications).map(([key, value]) => (
                  <TableRow key={key}>
                    <TableCell component="th" scope="row" sx={{ width: '30%', fontWeight: 'bold' }}>
                      {key.charAt(0).toUpperCase() + key.slice(1)}
                    </TableCell>
                    <TableCell>{value}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      )}
    </Box>
  );
};

export default ProductDetail;