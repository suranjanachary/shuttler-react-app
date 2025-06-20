import React, { useEffect, useState } from 'react';
import { 
  Box, 
  Typography, 
  Container, 
  Grid, 
  Paper, 
  Divider,
  List,
  ListItemButton,
  ListItemText,
  Chip,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
  Breadcrumbs,
  Link as MuiLink
} from '@mui/material';
import { NavigateNext as NavigateNextIcon } from '@mui/icons-material';
import { useParams, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { filterByCategory, filterBySubCategory } from '../store/slices/productsSlice';
import ProductList from '../components/products/ProductList';
import { categories } from '../data/categories';

type SortOption = 'featured' | 'price-low-high' | 'price-high-low' | 'name-a-z' | 'name-z-a';

const CategoryPage: React.FC = () => {
  const { categoryName, subCategoryName } = useParams<{ categoryName: string; subCategoryName: string }>();
  const dispatch = useDispatch();
  
  const { filteredProducts } = useSelector((state: RootState) => state.products);
  const [sortedProducts, setSortedProducts] = useState(filteredProducts);
  const [sortBy, setSortBy] = useState<SortOption>('featured');

  // Find the current category
  const currentCategory = categories.find(
    category => category.name.toLowerCase() === categoryName?.toLowerCase()
  );

  // Find the current subcategory if applicable
  const currentSubCategory = currentCategory?.subCategories?.find(
    subCategory => subCategory.name.toLowerCase() === subCategoryName?.toLowerCase()
  );

  useEffect(() => {
    if (categoryName && subCategoryName) {
      dispatch(filterBySubCategory(subCategoryName.toLowerCase()));
      dispatch(filterByCategory(categoryName.toLowerCase()));
    } else if (categoryName) {
      dispatch(filterByCategory(categoryName.toLowerCase()));
    }
  }, [dispatch, categoryName, subCategoryName]);

  useEffect(() => {
    // Sort products based on selected option
    const sortProducts = () => {
      const sorted = [...filteredProducts];
      
      switch (sortBy) {
        case 'price-low-high':
          sorted.sort((a, b) => a.price - b.price);
          break;
        case 'price-high-low':
          sorted.sort((a, b) => b.price - a.price);
          break;
        case 'name-a-z':
          sorted.sort((a, b) => a.name.localeCompare(b.name));
          break;
        case 'name-z-a':
          sorted.sort((a, b) => b.name.localeCompare(a.name));
          break;
        case 'featured':
        default:
          sorted.sort((a, b) => b.rating - a.rating);
          break;
      }
      
      setSortedProducts(sorted);
    };
    
    sortProducts();
  }, [filteredProducts, sortBy]);

  const handleSortChange = (event: SelectChangeEvent) => {
    setSortBy(event.target.value as SortOption);
  };

  const categoryTitle = currentCategory ? currentCategory.name : 'Products';
  const pageTitle = currentSubCategory 
    ? `${currentSubCategory.name} - ${categoryTitle}` 
    : categoryTitle;

  return (
    <Container>
      <Breadcrumbs 
        separator={<NavigateNextIcon fontSize="small" />} 
        aria-label="breadcrumb"
        sx={{ mb: 3 }}
      >
        <MuiLink component={Link} to="/" color="inherit">
          Home
        </MuiLink>
        {categoryName && !subCategoryName && (
          <Typography color="text.primary">{categoryTitle}</Typography>
        )}
        {categoryName && subCategoryName && (
          <>
            <MuiLink 
              component={Link} 
              to={`/category/${categoryName.toLowerCase()}`} 
              color="inherit"
            >
              {categoryTitle}
            </MuiLink>
            <Typography color="text.primary">{currentSubCategory?.name}</Typography>
          </>
        )}
      </Breadcrumbs>

      <Typography variant="h4" component="h1" gutterBottom>
        {pageTitle}
      </Typography>

      <Grid container spacing={4}>
        {/* Sidebar */}
        <Grid size={{ xs: 12, md: 3 }} component="div">
          <Paper sx={{ p: 2, mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              Categories
            </Typography>
            <List disablePadding>
              {categories.map((category) => (
                <React.Fragment key={category.id}>
                  <ListItemButton 
                    component={Link} 
                    to={`/category/${category.name.toLowerCase()}`}
                    selected={category.name.toLowerCase() === categoryName?.toLowerCase()}
                  >
                    <ListItemText primary={category.name} />
                    {category.name.toLowerCase() === categoryName?.toLowerCase() && (
                      <Chip 
                        label={filteredProducts.filter(p => p.category === categoryName.toLowerCase()).length} 
                        size="small" 
                        color="primary" 
                      />
                    )}
                  </ListItemButton>
                  
                  {category.name.toLowerCase() === categoryName?.toLowerCase() && 
                   category.subCategories && 
                   category.subCategories.length > 0 && (
                    <List disablePadding sx={{ pl: 2 }}>
                      {category.subCategories.map((subCategory) => (
                        <ListItemButton 
                          key={subCategory.id}
                          component={Link} 
                          to={`/category/${categoryName.toLowerCase()}/subcategory/${subCategory.name.toLowerCase()}`}
                          selected={subCategory.name.toLowerCase() === subCategoryName?.toLowerCase()}
                          sx={{ pl: 4 }}
                        >
                          <ListItemText primary={subCategory.name} />
                          {subCategory.name.toLowerCase() === subCategoryName?.toLowerCase() && (
                            <Chip 
                              label={filteredProducts.length} 
                              size="small" 
                              color="primary" 
                            />
                          )}
                        </ListItemButton>
                      ))}
                    </List>
                  )}
                </React.Fragment>
              ))}
            </List>
          </Paper>

          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Filter by Price
            </Typography>
            {/* Price filter would go here */}
            <Typography variant="body2" color="text.secondary">
              Price filtering functionality coming soon
            </Typography>
          </Paper>
        </Grid>

        {/* Main Content */}
        <Grid size={{ xs: 12, md: 9 }} component="div">
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Typography>
              Showing {sortedProducts.length} products
            </Typography>
            
            <FormControl sx={{ minWidth: 200 }} size="small">
              <InputLabel id="sort-select-label">Sort By</InputLabel>
              <Select
                labelId="sort-select-label"
                id="sort-select"
                value={sortBy}
                label="Sort By"
                onChange={handleSortChange}
              >
                <MenuItem value="featured">Featured</MenuItem>
                <MenuItem value="price-low-high">Price: Low to High</MenuItem>
                <MenuItem value="price-high-low">Price: High to Low</MenuItem>
                <MenuItem value="name-a-z">Name: A to Z</MenuItem>
                <MenuItem value="name-z-a">Name: Z to A</MenuItem>
              </Select>
            </FormControl>
          </Box>

          <Divider sx={{ mb: 3 }} />

          <ProductList products={sortedProducts} />
        </Grid>
      </Grid>
    </Container>
  );
};

export default CategoryPage;