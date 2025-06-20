import React from 'react';
import { Box, Container, Grid, Typography, Link, IconButton, Divider } from '@mui/material';
import { 
  Facebook as FacebookIcon, 
  Twitter as TwitterIcon, 
  Instagram as InstagramIcon,
  YouTube as YouTubeIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  LocationOn as LocationIcon
} from '@mui/icons-material';

const Footer: React.FC = () => {
  return (
    <Box
      sx={{
        bgcolor: 'primary.main',
        color: 'white',
        py: 6,
        mt: 'auto',
      }}
      component="footer"
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid size={{ xs: 12, sm: 6, md: 3 }} component="div">
            <Typography variant="h6" gutterBottom>
              SHUTTLER
            </Typography>
            <Typography variant="body2">
              Your one-stop shop for all badminton needs. Quality products for players of all levels.
            </Typography>
            <Box sx={{ mt: 2, display: 'flex', gap: 1 }}>
              <IconButton color="inherit" aria-label="Facebook">
                <FacebookIcon />
              </IconButton>
              <IconButton color="inherit" aria-label="Twitter">
                <TwitterIcon />
              </IconButton>
              <IconButton color="inherit" aria-label="Instagram">
                <InstagramIcon />
              </IconButton>
              <IconButton color="inherit" aria-label="YouTube">
                <YouTubeIcon />
              </IconButton>
            </Box>
          </Grid>
          
          <Grid size={{ xs: 12, sm: 6, md: 3 }} component="div">
            <Typography variant="h6" gutterBottom>
              Shop
            </Typography>
            <Link href="/category/rackets" color="inherit" display="block" sx={{ mb: 1 }}>
              Rackets
            </Link>
            <Link href="/category/clothes" color="inherit" display="block" sx={{ mb: 1 }}>
              Clothes
            </Link>
            <Link href="/category/shuttles" color="inherit" display="block" sx={{ mb: 1 }}>
              Shuttlecocks
            </Link>
            <Link href="/category/bags" color="inherit" display="block" sx={{ mb: 1 }}>
              Bags
            </Link>
            <Link href="/category/accessories" color="inherit" display="block" sx={{ mb: 1 }}>
              Accessories
            </Link>
            <Link href="/category/shoes" color="inherit" display="block" sx={{ mb: 1 }}>
              Shoes
            </Link>
          </Grid>
          
          <Grid size={{ xs: 12, sm: 6, md: 3 }} component="div">
            <Typography variant="h6" gutterBottom>
              Information
            </Typography>
            <Link href="/about" color="inherit" display="block" sx={{ mb: 1 }}>
              About Us
            </Link>
            <Link href="/contact" color="inherit" display="block" sx={{ mb: 1 }}>
              Contact Us
            </Link>
            <Link href="/shipping" color="inherit" display="block" sx={{ mb: 1 }}>
              Shipping Policy
            </Link>
            <Link href="/returns" color="inherit" display="block" sx={{ mb: 1 }}>
              Returns & Refunds
            </Link>
            <Link href="/privacy" color="inherit" display="block" sx={{ mb: 1 }}>
              Privacy Policy
            </Link>
            <Link href="/terms" color="inherit" display="block" sx={{ mb: 1 }}>
              Terms & Conditions
            </Link>
          </Grid>
          
          <Grid size={{ xs: 12, sm: 6, md: 3 }} component="div">
            <Typography variant="h6" gutterBottom>
              Contact Us
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <LocationIcon sx={{ mr: 1 }} />
              <Typography variant="body2">
                123 Dera Street, Bhanjanagar, Ganjam, 12345
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <PhoneIcon sx={{ mr: 1 }} />
              <Typography variant="body2">
                +91 7790032510
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <EmailIcon sx={{ mr: 1 }} />
              <Typography variant="body2">
                info@shuttler.com
              </Typography>
            </Box>
          </Grid>
        </Grid>
        
        <Divider sx={{ my: 3, bgcolor: 'rgba(255, 255, 255, 0.2)' }} />
        
        <Typography variant="body2" align="center">
          © {new Date().getFullYear()} Shuttler. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;