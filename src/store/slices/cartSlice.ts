import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CartItem, Product } from '../../types/types';

interface CartState {
  items: CartItem[];
  totalItems: number;
  totalAmount: number;
}

const initialState: CartState = {
  items: [],
  totalItems: 0,
  totalAmount: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Product>) => {
      const product = action.payload;
      const existingItem = state.items.find(item => item.product.id === product.id);
      
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ product, quantity: 1 });
      }
      
      state.totalItems += 1;
      state.totalAmount += product.price;
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      const productId = action.payload;
      const existingItem = state.items.find(item => item.product.id === productId);
      
      if (existingItem) {
        state.totalItems -= existingItem.quantity;
        state.totalAmount -= existingItem.product.price * existingItem.quantity;
        state.items = state.items.filter(item => item.product.id !== productId);
      }
    },
    increaseQuantity: (state, action: PayloadAction<string>) => {
      const productId = action.payload;
      const existingItem = state.items.find(item => item.product.id === productId);
      
      if (existingItem) {
        existingItem.quantity += 1;
        state.totalItems += 1;
        state.totalAmount += existingItem.product.price;
      }
    },
    decreaseQuantity: (state, action: PayloadAction<string>) => {
      const productId = action.payload;
      const existingItem = state.items.find(item => item.product.id === productId);
      
      if (existingItem && existingItem.quantity > 1) {
        existingItem.quantity -= 1;
        state.totalItems -= 1;
        state.totalAmount -= existingItem.product.price;
      } else if (existingItem && existingItem.quantity === 1) {
        state.totalItems -= 1;
        state.totalAmount -= existingItem.product.price;
        state.items = state.items.filter(item => item.product.id !== productId);
      }
    },
    clearCart: (state) => {
      state.items = [];
      state.totalItems = 0;
      state.totalAmount = 0;
    },
  },
});

export const { 
  addToCart, 
  removeFromCart, 
  increaseQuantity, 
  decreaseQuantity, 
  clearCart 
} = cartSlice.actions;

export default cartSlice.reducer;