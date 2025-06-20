import React from 'react';
import { 
  Box, 
  Typography, 
  Button, 
  Grid, 
  Paper, 
  Container,
  Card,
  CardContent,
  CardMedia,
} from '@mui/material';
import { 
  LocalShipping as LocalShippingIcon,
  Security as SecurityIcon,
  Support as SupportIcon,
  CreditCard as CreditCardIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import ProductList from '../components/products/ProductList';
import { categories } from '../data/categories';

const HomePage: React.FC = () => {
  const { products } = useSelector((state: RootState) => state.products);
  const navigate = useNavigate();

  // Get featured products (products with highest rating)
  const featuredProducts = [...products]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 8);

  return (
    <Box>
      {/* Hero Section */}
      <Paper 
        sx={{ 
          position: 'relative', 
          backgroundColor: 'grey.800', 
          color: '#fff', 
          mb: 4, 
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          backgroundImage: `url(/images/hero-bg.jpg)`,
          height: '500px',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        {/* Increase the priority of the hero background image */}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            right: 0,
            left: 0,
            backgroundImage: 'url(https://irving.greatheartsamerica.org/wp-content/uploads/sites/4/2023/12/Badminton-Background.jpg)',
            backgroundSize: 'cover',         // Makes it fill the box
            backgroundRepeat: 'no-repeat',   // Prevents tiling
            backgroundPosition: 'center',    // Centers the image
          }}
        />
        <Container maxWidth="lg">
          <Grid container>
            <Grid size={{ md: 6 }}>
              <Box
                sx={{
                  position: 'relative',
                  p: { xs: 3, md: 6 },
                  pr: { md: 0 },
                }}
              >
                <Typography component="h1" variant="h3" color="inherit" gutterBottom>
                  Premium Badminton Equipment
                </Typography>
                <Typography variant="h5" color="inherit" paragraph>
                  Shop the best selection of badminton rackets, shuttlecocks, apparel, and accessories.
                </Typography>
                <Button 
                  variant="contained" 
                  size="large" 
                  onClick={() => navigate('/category/rackets')}
                >
                  Shop Now
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Paper>

      {/* Categories Section */}
      <Box sx={{ my: 8 }}>
        <Typography variant="h4" component="h2" align="center" gutterBottom>
          Shop by Category
        </Typography>
        <Typography variant="subtitle1" align="center" color="text.secondary" paragraph>
          Browse our wide selection of badminton products
        </Typography>
        
        <Grid container spacing={3} sx={{ mt: 2 }}>
          {categories.map((category) => (
            <Grid key={category.id} size={{ xs: 6, sm: 4, md: 2 }}>
              <Card 
                sx={{ 
                  height: '100%', 
                  display: 'flex', 
                  flexDirection: 'column',
                  transition: 'transform 0.2s',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: 3,
                  },
                  cursor: 'pointer',
                }}
                onClick={() => navigate(`/category/${category.name.toLowerCase()}`)}
              >
                <CardMedia
                  component="img"
                  height="190"
                  image={`/images/categories/${category.name.toLowerCase()}.jpg`}
                  // C:\Users\Admin\Desktop\React Learnig\Shuttler\shuttler-app\src\assets\images\categories\rackets.jpg
                  // image='https://www.khelmart.com/pub/media/catalog/product/cache/712b931dac1b924a11d1b7282ad89910/2/_/2_719.jpg'
                  alt={category.name}
                  sx={{ objectFit: 'cover' }}
                />
                <CardContent sx={{ flexGrow: 1, textAlign: 'center' }}>
                  <Typography gutterBottom variant="h6" component="div">
                    {category.name}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Featured Products Section */}
      <Box sx={{ my: 8 }}>
        <Typography variant="h4" component="h2" align="center" gutterBottom>
          Featured Products
        </Typography>
        <Typography variant="subtitle1" align="center" color="text.secondary" paragraph>
          Our top-rated badminton equipment
        </Typography>
        
        <ProductList products={featuredProducts} />
        
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <Button 
            variant="outlined" 
            size="large" 
            onClick={() => navigate('/products')}
          >
            View All Products
          </Button>
        </Box>
      </Box>

      {/* Features Section */}
      <Box sx={{ bgcolor: 'background.paper', py: 8 }}>
        <Container maxWidth="lg">
          <Typography variant="h4" component="h2" align="center" gutterBottom>
            Why Choose Us
          </Typography>
          <Typography variant="subtitle1" align="center" color="text.secondary" paragraph>
            We provide the best badminton equipment with excellent service
          </Typography>
          
          <Grid container spacing={4} sx={{ mt: 2 }}>
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <Box sx={{ textAlign: 'center' }}>
                <LocalShippingIcon sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
                <Typography variant="h6" gutterBottom>
                  Free Shipping
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Free shipping on all orders over ₹50
                </Typography>
              </Box>
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <Box sx={{ textAlign: 'center' }}>
                <SecurityIcon sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
                <Typography variant="h6" gutterBottom>
                  Secure Payments
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  100% secure payment processing
                </Typography>
              </Box>
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <Box sx={{ textAlign: 'center' }}>
                <SupportIcon sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
                <Typography variant="h6" gutterBottom>
                  24/7 Support
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Dedicated support team available
                </Typography>
              </Box>
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <Box sx={{ textAlign: 'center' }}>
                <CreditCardIcon sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
                <Typography variant="h6" gutterBottom>
                  Easy Returns
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  30-day money-back guarantee
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Newsletter Section */}
      <Box sx={{ bgcolor: 'primary.main', color: 'white', py: 8 }}>
        <Container maxWidth="md">
          <Typography variant="h4" component="h2" align="center" gutterBottom>
            Join Our Newsletter
          </Typography>
          <Typography variant="subtitle1" align="center" paragraph>
            Subscribe to get updates on new products, special offers, and badminton tips
          </Typography>
          <Box 
            component="form" 
            sx={{ 
              display: 'flex', 
              justifyContent: 'center',
              mt: 4,
              gap: 2,
              flexDirection: { xs: 'column', sm: 'row' },
              alignItems: 'center',
            }}
          >
            <Box 
              component="input" 
              placeholder="Your email address"
              sx={{ 
                py: 1.5, 
                px: 2, 
                width: { xs: '100%', sm: '50%' }, 
                borderRadius: 1,
                border: 'none',
                outline: 'none',
              }}
            />
            <Button 
              variant="contained" 
              color="secondary" 
              size="large"
              sx={{ 
                width: { xs: '100%', sm: 'auto' },
                py: 1.5,
              }}
            >
              Subscribe
            </Button>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default HomePage;