import React, { useState } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Stepper, 
  Step, 
  StepLabel, 
  Button, 
  Paper,
  Grid,
  TextField,
  FormControlLabel,
  Checkbox,
  Divider,
  List,
  ListItem,
  ListItemText,
  Radio,
  RadioGroup,
  FormControl,
  FormLabel
} from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../store';
import { clearCart } from '../store/slices/cartSlice';

const steps = ['Shipping address', 'Payment details', 'Review your order'];

const CheckoutPage: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);
  const { items, totalItems, totalAmount } = useSelector((state: RootState) => state.cart);
  const { isAuthenticated } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Form state
  const [shippingAddress, setShippingAddress] = useState({
    firstName: '',
    lastName: '',
    address1: '',
    address2: '',
    city: '',
    state: '',
    zip: '',
    country: '',
    saveAddress: false,
  });

  const [paymentDetails, setPaymentDetails] = useState({
    cardName: '',
    cardNumber: '',
    expDate: '',
    cvv: '',
    saveCard: false,
  });

  const handleShippingAddressChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked } = event.target;
    setShippingAddress({
      ...shippingAddress,
      [name]: name === 'saveAddress' ? checked : value,
    });
  };

  const handlePaymentDetailsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked } = event.target;
    setPaymentDetails({
      ...paymentDetails,
      [name]: name === 'saveCard' ? checked : value,
    });
  };

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const handlePlaceOrder = () => {
    // Here you would typically send the order to your backend
    // For now, we'll just clear the cart and navigate to a confirmation page
    dispatch(clearCart());
    setActiveStep(activeStep + 1);
  };

  const getStepContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <Box component="form" noValidate sx={{ mt: 3 }}>
            <Typography variant="h6" gutterBottom>
              Shipping address
            </Typography>
            <Grid container spacing={3}>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  required
                  id="firstName"
                  name="firstName"
                  label="First name"
                  fullWidth
                  autoComplete="given-name"
                  variant="outlined"
                  value={shippingAddress.firstName}
                  onChange={handleShippingAddressChange}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  required
                  id="lastName"
                  name="lastName"
                  label="Last name"
                  fullWidth
                  autoComplete="family-name"
                  variant="outlined"
                  value={shippingAddress.lastName}
                  onChange={handleShippingAddressChange}
                />
              </Grid>
              <Grid size={{ xs: 12 }}>
                <TextField
                  required
                  id="address1"
                  name="address1"
                  label="Address line 1"
                  fullWidth
                  autoComplete="shipping address-line1"
                  variant="outlined"
                  value={shippingAddress.address1}
                  onChange={handleShippingAddressChange}
                />
              </Grid>
              <Grid size={{ xs: 12 }}>
                <TextField
                  id="address2"
                  name="address2"
                  label="Address line 2"
                  fullWidth
                  autoComplete="shipping address-line2"
                  variant="outlined"
                  value={shippingAddress.address2}
                  onChange={handleShippingAddressChange}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  required
                  id="city"
                  name="city"
                  label="City"
                  fullWidth
                  autoComplete="shipping address-level2"
                  variant="outlined"
                  value={shippingAddress.city}
                  onChange={handleShippingAddressChange}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  id="state"
                  name="state"
                  label="State/Province/Region"
                  fullWidth
                  variant="outlined"
                  value={shippingAddress.state}
                  onChange={handleShippingAddressChange}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  required
                  id="zip"
                  name="zip"
                  label="Zip / Postal code"
                  fullWidth
                  autoComplete="shipping postal-code"
                  variant="outlined"
                  value={shippingAddress.zip}
                  onChange={handleShippingAddressChange}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  required
                  id="country"
                  name="country"
                  label="Country"
                  fullWidth
                  autoComplete="shipping country"
                  variant="outlined"
                  value={shippingAddress.country}
                  onChange={handleShippingAddressChange}
                />
              </Grid>
              <Grid size={{ xs: 12 }}>
                <FormControlLabel
                  control={
                    <Checkbox 
                      color="primary" 
                      name="saveAddress" 
                      checked={shippingAddress.saveAddress}
                      onChange={handleShippingAddressChange}
                    />
                  }
                  label="Use this address for payment details"
                />
              </Grid>
            </Grid>
          </Box>
        );
      case 1:
        return (
          <Box component="form" noValidate sx={{ mt: 3 }}>
            <Typography variant="h6" gutterBottom>
              Payment method
            </Typography>
            <Grid container spacing={3}>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  required
                  id="cardName"
                  name="cardName"
                  label="Name on card"
                  fullWidth
                  autoComplete="cc-name"
                  variant="outlined"
                  value={paymentDetails.cardName}
                  onChange={handlePaymentDetailsChange}
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  required
                  id="cardNumber"
                  name="cardNumber"
                  label="Card number"
                  fullWidth
                  autoComplete="cc-number"
                  variant="outlined"
                  value={paymentDetails.cardNumber}
                  onChange={handlePaymentDetailsChange}
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  required
                  id="expDate"
                  name="expDate"
                  label="Expiry date"
                  fullWidth
                  autoComplete="cc-exp"
                  variant="outlined"
                  value={paymentDetails.expDate}
                  onChange={handlePaymentDetailsChange}
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  required
                  id="cvv"
                  name="cvv"
                  label="CVV"
                  helperText="Last three digits on signature strip"
                  fullWidth
                  autoComplete="cc-csc"
                  variant="outlined"
                  value={paymentDetails.cvv}
                  onChange={handlePaymentDetailsChange}
                />
              </Grid>
              <Grid size={{ xs: 12 }}>
                <FormControlLabel
                  control={
                    <Checkbox 
                      color="primary" 
                      name="saveCard" 
                      checked={paymentDetails.saveCard}
                      onChange={handlePaymentDetailsChange}
                    />
                  }
                  label="Remember credit card details for next time"
                />
              </Grid>
            </Grid>
          </Box>
        );
      case 2:
        return (
          <Box sx={{ mt: 3 }}>
            <Typography variant="h6" gutterBottom>
              Order summary
            </Typography>
            <List disablePadding>
              {items.map((item) => (
                <ListItem key={item.product.id} sx={{ py: 1, px: 0 }}>
                  <ListItemText
                    primary={item.product.name}
                    secondary={`Quantity: ${item.quantity}`}
                  />
                  <Typography variant="body2">
                    ₹{(item.product.price * item.quantity).toFixed(2)}
                  </Typography>
                </ListItem>
              ))}
              <ListItem sx={{ py: 1, px: 0 }}>
                <ListItemText primary="Subtotal" />
                <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                  ₹{totalAmount.toFixed(2)}
                </Typography>
              </ListItem>
              <ListItem sx={{ py: 1, px: 0 }}>
                <ListItemText primary="Shipping" />
                <Typography variant="body2">Free</Typography>
              </ListItem>
              <ListItem sx={{ py: 1, px: 0 }}>
                <ListItemText primary="Tax" />
                <Typography variant="body2">
                  ₹{(totalAmount * 0.1).toFixed(2)}
                </Typography>
              </ListItem>
              <ListItem sx={{ py: 1, px: 0 }}>
                <ListItemText primary="Total" />
                <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                  ₹{(totalAmount + totalAmount * 0.1).toFixed(2)}
                </Typography>
              </ListItem>
            </List>
            <Grid container spacing={2}>
              <Grid size={{ xs: 12, sm: 6 }}>
                <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                  Shipping
                </Typography>
                <Typography gutterBottom>
                  {shippingAddress.firstName} {shippingAddress.lastName}
                </Typography>
                <Typography gutterBottom>
                  {shippingAddress.address1}
                  {shippingAddress.address2 ? `, ${shippingAddress.address2}` : ''}
                </Typography>
                <Typography gutterBottom>
                  {shippingAddress.city}, {shippingAddress.state} {shippingAddress.zip}
                </Typography>
                <Typography gutterBottom>{shippingAddress.country}</Typography>
              </Grid>
              <Grid container direction="column" size={{ xs: 12, sm: 6 }}>
                <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                  Payment details
                </Typography>
                <Grid container>
                  <Grid size={{ xs: 6 }}>
                    <Typography gutterBottom>Card type</Typography>
                  </Grid>
                  <Grid size={{ xs: 6 }}>
                    <Typography gutterBottom>Visa</Typography>
                  </Grid>
                  <Grid size={{ xs: 6 }}>
                    <Typography gutterBottom>Card holder</Typography>
                  </Grid>
                  <Grid size={{ xs: 6 }}>
                    <Typography gutterBottom>{paymentDetails.cardName}</Typography>
                  </Grid>
                  <Grid size={{ xs: 6 }}>
                    <Typography gutterBottom>Card number</Typography>
                  </Grid>
                  <Grid size={{ xs: 6 }}>
                    <Typography gutterBottom>
                      xxxx-xxxx-xxxx-{paymentDetails.cardNumber.slice(-4)}
                    </Typography>
                  </Grid>
                  <Grid size={{ xs: 6 }}>
                    <Typography gutterBottom>Expiry date</Typography>
                  </Grid>
                  <Grid size={{ xs: 6 }}>
                    <Typography gutterBottom>{paymentDetails.expDate}</Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Box>
        );
      default:
        throw new Error('Unknown step');
    }
  };

  // Redirect to login if not authenticated
  React.useEffect(() => {
    if (!isAuthenticated && activeStep === 0) {
      // In a real app, you might want to redirect to login
      // For now, we'll just show the checkout form
    }
  }, [isAuthenticated, activeStep]);

  // Redirect to cart if cart is empty
  React.useEffect(() => {
    if (items.length === 0 && activeStep === 0) {
      navigate('/cart');
    }
  }, [items.length, activeStep, navigate]);

  return (
    <Container component="main" maxWidth="md" sx={{ mb: 4 }}>
      <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
        <Typography component="h1" variant="h4" align="center" gutterBottom>
          Checkout
        </Typography>
        <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        {activeStep === steps.length ? (
          <React.Fragment>
            <Typography variant="h5" gutterBottom>
              Thank you for your order.
            </Typography>
            <Typography variant="subtitle1">
              Your order number is #2001539. We have emailed your order
              confirmation, and will send you an update when your order has
              shipped.
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
              <Button 
                variant="contained" 
                onClick={() => navigate('/')}
                sx={{ mt: 3, ml: 1 }}
              >
                Continue Shopping
              </Button>
            </Box>
          </React.Fragment>
        ) : (
          <React.Fragment>
            {getStepContent(activeStep)}
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
              {activeStep !== 0 && (
                <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                  Back
                </Button>
              )}
              <Button
                variant="contained"
                onClick={activeStep === steps.length - 1 ? handlePlaceOrder : handleNext}
                sx={{ mt: 3, ml: 1 }}
              >
                {activeStep === steps.length - 1 ? 'Place order' : 'Next'}
              </Button>
            </Box>
          </React.Fragment>
        )}
      </Paper>
    </Container>
  );
};

export default CheckoutPage;