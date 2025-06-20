import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '../../types/types';
import products from '../../data/products';

interface ProductsState {
  products: Product[];
  selectedProduct: Product | null;
  filteredProducts: Product[];
  loading: boolean;
  error: string | null;
  searchQuery: string;
  currentCategory: string | null;
  currentSubCategory: string | null;
}

const initialState: ProductsState = {
  products: products,
  selectedProduct: null,
  filteredProducts: products,
  loading: false,
  error: null,
  searchQuery: '',
  currentCategory: null,
  currentSubCategory: null,
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    addProduct: (state, action: PayloadAction<Product>) => {
      state.products.push(action.payload);
    },
    updateProduct: (state, action: PayloadAction<Product>) => {
      const index = state.products.findIndex(p => p.id === action.payload.id);
      if (index !== -1) {
        state.products[index] = action.payload;
      }
    },
    deleteProduct: (state, action: PayloadAction<string>) => {
      state.products = state.products.filter(p => p.id !== action.payload);
    },
    setSelectedProduct: (state, action: PayloadAction<string>) => {
      const product = state.products.find(p => p.id === action.payload);
      state.selectedProduct = product || null;
    },
    clearSelectedProduct: (state) => {
      state.selectedProduct = null;
    },
    filterByCategory: (state, action: PayloadAction<string>) => {
      state.currentCategory = action.payload;
      state.currentSubCategory = null;
      state.filteredProducts = state.products.filter(
        product => product.category === action.payload
      );
    },
    filterBySubCategory: (state, action: PayloadAction<string>) => {
      if (!state.currentCategory) return;
      
      state.currentSubCategory = action.payload;
      state.filteredProducts = state.products.filter(
        product => 
          product.category === state.currentCategory && 
          product.subCategory === action.payload
      );
    },
    searchProducts: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
      const query = action.payload.toLowerCase();
      
      if (!query) {
        state.filteredProducts = state.products;
        return;
      }
      
      state.filteredProducts = state.products.filter(product => 
        product.name.toLowerCase().includes(query) || 
        product.description.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query) ||
        (product.subCategory && product.subCategory.toLowerCase().includes(query))
      );
    },
    clearFilters: (state) => {
      state.filteredProducts = state.products;
      state.currentCategory = null;
      state.currentSubCategory = null;
      state.searchQuery = '';
    },
    sortProducts: (state, action: PayloadAction<'price_asc' | 'price_desc' | 'name_asc' | 'name_desc' | 'rating'>) => {
      const sortType = action.payload;
      
      switch (sortType) {
        case 'price_asc':
          state.filteredProducts.sort((a, b) => a.price - b.price);
          break;
        case 'price_desc':
          state.filteredProducts.sort((a, b) => b.price - a.price);
          break;
        case 'name_asc':
          state.filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
          break;
        case 'name_desc':
          state.filteredProducts.sort((a, b) => b.name.localeCompare(a.name));
          break;
        case 'rating':
          state.filteredProducts.sort((a, b) => b.rating - a.rating);
          break;
        default:
          break;
      }
    },
  },
});

export const { 
  setSelectedProduct, 
  clearSelectedProduct, 
  filterByCategory, 
  filterBySubCategory,
  searchProducts,
  clearFilters,
  sortProducts
} = productsSlice.actions;

export default productsSlice.reducer;