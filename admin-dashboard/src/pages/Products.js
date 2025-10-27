import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Button,
  TextField,
  InputAdornment,
  Chip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions
} from '@mui/material';
import {
  Search as SearchIcon,
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as ViewIcon,
  GridView as GridViewIcon,
  List as ListViewIcon
} from '@mui/icons-material';
import { DataGrid } from '@mui/x-data-grid';

const Products = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'table'

  // Mock product data
  const [products, setProducts] = useState([
    {
      id: '1',
      name: 'iPhone 15 Pro',
      description: 'Latest iPhone with advanced features',
      price: 999.99,
      category: 'Electronics',
      stock: 50,
      status: 'Active',
      image: 'https://via.placeholder.com/200x200?text=iPhone+15',
      createdAt: '2024-01-15',
      sales: 125
    },
    {
      id: '2',
      name: 'MacBook Air M2',
      description: 'Powerful laptop for professionals',
      price: 1299.99,
      category: 'Electronics',
      stock: 25,
      status: 'Active',
      image: 'https://via.placeholder.com/200x200?text=MacBook+Air',
      createdAt: '2024-01-10',
      sales: 89
    },
    {
      id: '3',
      name: 'Nike Air Max',
      description: 'Comfortable running shoes',
      price: 129.99,
      category: 'Clothing',
      stock: 0,
      status: 'Out of Stock',
      image: 'https://via.placeholder.com/200x200?text=Nike+Shoes',
      createdAt: '2024-01-12',
      sales: 234
    },
    {
      id: '4',
      name: 'Coffee Maker Pro',
      description: 'Professional grade coffee maker',
      price: 299.99,
      category: 'Home',
      stock: 15,
      status: 'Active',
      image: 'https://via.placeholder.com/200x200?text=Coffee+Maker',
      createdAt: '2024-01-08',
      sales: 67
    }
  ]);

  const handleEditProduct = (product) => {
    setSelectedProduct(product);
    setOpenDialog(true);
  };

  const handleDeleteProduct = (productId) => {
    setProducts(products.filter(product => product.id !== productId));
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const columns = [
    {
      field: 'image',
      headerName: 'Image',
      width: 80,
      renderCell: (params) => (
        <img
          src={params.value}
          alt={params.row.name}
          style={{ width: 40, height: 40, objectFit: 'cover', borderRadius: 4 }}
        />
      )
    },
    {
      field: 'name',
      headerName: 'Product Name',
      width: 200,
      renderCell: (params) => (
        <Box>
          <Typography variant="body2" fontWeight="bold">
            {params.value}
          </Typography>
          <Typography variant="caption" color="textSecondary">
            {params.row.description.substring(0, 30)}...
          </Typography>
        </Box>
      )
    },
    {
      field: 'category',
      headerName: 'Category',
      width: 120
    },
    {
      field: 'price',
      headerName: 'Price',
      width: 100,
      renderCell: (params) => `$${params.value}`
    },
    {
      field: 'stock',
      headerName: 'Stock',
      width: 80,
      renderCell: (params) => (
        <Typography
          variant="body2"
          color={params.value === 0 ? 'error' : params.value < 10 ? 'warning.main' : 'success.main'}
        >
          {params.value}
        </Typography>
      )
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 120,
      renderCell: (params) => (
        <Chip
          label={params.value}
          color={params.value === 'Active' ? 'success' : 'error'}
          size="small"
        />
      )
    },
    {
      field: 'sales',
      headerName: 'Sales',
      width: 80
    },
    {
      field: 'createdAt',
      headerName: 'Created',
      width: 120
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 120,
      sortable: false,
      renderCell: (params) => (
        <Box>
          <IconButton
            size="small"
            onClick={() => handleEditProduct(params.row)}
            color="primary"
          >
            <EditIcon />
          </IconButton>
          <IconButton
            size="small"
            onClick={() => handleDeleteProduct(params.row.id)}
            color="error"
          >
            <DeleteIcon />
          </IconButton>
        </Box>
      )
    }
  ];

  const ProductCard = ({ product }) => (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardMedia
        component="img"
        height="200"
        image={product.image}
        alt={product.name}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h6" component="div">
          {product.name}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
          {product.description}
        </Typography>
        <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ mb: 1 }}>
          <Typography variant="h6" color="primary">
            ${product.price}
          </Typography>
          <Chip
            label={product.category}
            size="small"
            variant="outlined"
          />
        </Box>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="body2" color="text.secondary">
            Stock: {product.stock}
          </Typography>
          <Chip
            label={product.status}
            color={product.status === 'Active' ? 'success' : 'error'}
            size="small"
          />
        </Box>
      </CardContent>
      <CardActions>
        <IconButton
          size="small"
          onClick={() => handleEditProduct(product)}
          color="primary"
        >
          <EditIcon />
        </IconButton>
        <IconButton
          size="small"
          onClick={() => handleDeleteProduct(product.id)}
          color="error"
        >
          <DeleteIcon />
        </IconButton>
      </CardActions>
    </Card>
  );

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4">
          Product Management
        </Typography>
        <Box display="flex" gap={1}>
          <IconButton
            onClick={() => setViewMode('grid')}
            color={viewMode === 'grid' ? 'primary' : 'default'}
          >
            <GridViewIcon />
          </IconButton>
          <IconButton
            onClick={() => setViewMode('table')}
            color={viewMode === 'table' ? 'primary' : 'default'}
          >
            <ListViewIcon />
          </IconButton>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => {
              setSelectedProduct(null);
              setOpenDialog(true);
            }}
          >
            Add Product
          </Button>
        </Box>
      </Box>

      <Paper sx={{ p: 3 }}>
        <Box mb={3}>
          <TextField
            fullWidth
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        </Box>

        {viewMode === 'table' ? (
          <Box sx={{ height: 600, width: '100%' }}>
            <DataGrid
              rows={filteredProducts}
              columns={columns}
              pageSize={10}
              rowsPerPageOptions={[10, 25, 50]}
              checkboxSelection
              disableSelectionOnClick
              rowHeight={80}
            />
          </Box>
        ) : (
          <Grid container spacing={3}>
            {filteredProducts.map((product) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
                <ProductCard product={product} />
              </Grid>
            ))}
          </Grid>
        )}
      </Paper>

      {/* Product Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>
          {selectedProduct ? 'Edit Product' : 'Add New Product'}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Product Name"
                  defaultValue={selectedProduct?.name || ''}
                  sx={{ mb: 2 }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth sx={{ mb: 2 }}>
                  <InputLabel>Category</InputLabel>
                  <Select
                    defaultValue={selectedProduct?.category || 'Electronics'}
                    label="Category"
                  >
                    <MenuItem value="Electronics">Electronics</MenuItem>
                    <MenuItem value="Clothing">Clothing</MenuItem>
                    <MenuItem value="Home">Home</MenuItem>
                    <MenuItem value="Books">Books</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Description"
                  multiline
                  rows={3}
                  defaultValue={selectedProduct?.description || ''}
                  sx={{ mb: 2 }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Price"
                  type="number"
                  defaultValue={selectedProduct?.price || ''}
                  InputProps={{
                    startAdornment: <InputAdornment position="start">$</InputAdornment>,
                  }}
                  sx={{ mb: 2 }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Stock Quantity"
                  type="number"
                  defaultValue={selectedProduct?.stock || ''}
                  sx={{ mb: 2 }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Image URL"
                  defaultValue={selectedProduct?.image || ''}
                  sx={{ mb: 2 }}
                />
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>
            Cancel
          </Button>
          <Button variant="contained" onClick={() => setOpenDialog(false)}>
            {selectedProduct ? 'Update' : 'Create'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Products;