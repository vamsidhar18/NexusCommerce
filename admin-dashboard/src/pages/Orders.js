import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  TextField,
  InputAdornment,
  Chip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Collapse,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material';
import {
  Search as SearchIcon,
  Visibility as ViewIcon,
  KeyboardArrowDown,
  KeyboardArrowUp,
  LocalShipping as ShippingIcon,
  CheckCircle as CompleteIcon
} from '@mui/icons-material';
import { DataGrid } from '@mui/x-data-grid';

const Orders = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [statusFilter, setStatusFilter] = useState('All');

  // Mock order data
  const [orders, setOrders] = useState([
    {
      id: 'ORD-001',
      customerId: '1',
      customerName: 'John Doe',
      customerEmail: 'john@example.com',
      status: 'Processing',
      total: 299.99,
      items: [
        { productName: 'iPhone 15 Pro', quantity: 1, price: 299.99 }
      ],
      shippingAddress: '123 Main St, City, State 12345',
      paymentMethod: 'Credit Card',
      createdAt: '2024-01-20',
      updatedAt: '2024-01-20'
    },
    {
      id: 'ORD-002',
      customerId: '2',
      customerName: 'Jane Smith',
      customerEmail: 'jane@example.com',
      status: 'Shipped',
      total: 149.50,
      items: [
        { productName: 'Nike Air Max', quantity: 1, price: 129.99 },
        { productName: 'Shipping', quantity: 1, price: 19.51 }
      ],
      shippingAddress: '456 Oak Ave, City, State 67890',
      paymentMethod: 'PayPal',
      createdAt: '2024-01-19',
      updatedAt: '2024-01-20'
    },
    {
      id: 'ORD-003',
      customerId: '1',
      customerName: 'John Doe',
      customerEmail: 'john@example.com',
      status: 'Completed',
      total: 89.99,
      items: [
        { productName: 'Coffee Maker Pro', quantity: 1, price: 89.99 }
      ],
      shippingAddress: '123 Main St, City, State 12345',
      paymentMethod: 'Credit Card',
      createdAt: '2024-01-18',
      updatedAt: '2024-01-19'
    },
    {
      id: 'ORD-004',
      customerId: '4',
      customerName: 'Bob Wilson',
      customerEmail: 'bob@example.com',
      status: 'Cancelled',
      total: 199.99,
      items: [
        { productName: 'MacBook Air M2', quantity: 1, price: 199.99 }
      ],
      shippingAddress: '789 Pine St, City, State 54321',
      paymentMethod: 'Credit Card',
      createdAt: '2024-01-17',
      updatedAt: '2024-01-18'
    }
  ]);

  const handleViewOrder = (order) => {
    setSelectedOrder(order);
    setOpenDialog(true);
  };

  const handleUpdateOrderStatus = (orderId, newStatus) => {
    setOrders(orders.map(order => 
      order.id === orderId 
        ? { ...order, status: newStatus, updatedAt: new Date().toISOString().split('T')[0] }
        : order
    ));
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch = 
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customerEmail.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'All' || order.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending': return 'warning';
      case 'Processing': return 'info';
      case 'Shipped': return 'primary';
      case 'Completed': return 'success';
      case 'Cancelled': return 'error';
      default: return 'default';
    }
  };

  const columns = [
    {
      field: 'id',
      headerName: 'Order ID',
      width: 120,
      renderCell: (params) => (
        <Typography variant="body2" fontWeight="bold">
          {params.value}
        </Typography>
      )
    },
    {
      field: 'customerName',
      headerName: 'Customer',
      width: 180,
      renderCell: (params) => (
        <Box>
          <Typography variant="body2" fontWeight="bold">
            {params.value}
          </Typography>
          <Typography variant="caption" color="textSecondary">
            {params.row.customerEmail}
          </Typography>
        </Box>
      )
    },
    {
      field: 'total',
      headerName: 'Total',
      width: 100,
      renderCell: (params) => `$${params.value}`
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 120,
      renderCell: (params) => (
        <Chip
          label={params.value}
          color={getStatusColor(params.value)}
          size="small"
        />
      )
    },
    {
      field: 'createdAt',
      headerName: 'Order Date',
      width: 120
    },
    {
      field: 'updatedAt',
      headerName: 'Updated',
      width: 120
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 200,
      sortable: false,
      renderCell: (params) => (
        <Box display="flex" gap={1}>
          <IconButton
            size="small"
            onClick={() => handleViewOrder(params.row)}
            color="primary"
          >
            <ViewIcon />
          </IconButton>
          {params.row.status === 'Processing' && (
            <IconButton
              size="small"
              onClick={() => handleUpdateOrderStatus(params.row.id, 'Shipped')}
              color="info"
              title="Mark as Shipped"
            >
              <ShippingIcon />
            </IconButton>
          )}
          {params.row.status === 'Shipped' && (
            <IconButton
              size="small"
              onClick={() => handleUpdateOrderStatus(params.row.id, 'Completed')}
              color="success"
              title="Mark as Completed"
            >
              <CompleteIcon />
            </IconButton>
          )}
        </Box>
      )
    }
  ];

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Order Management
      </Typography>

      <Paper sx={{ p: 3 }}>
        <Box display="flex" gap={2} mb={3}>
          <TextField
            placeholder="Search orders..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            sx={{ flexGrow: 1 }}
          />
          <FormControl sx={{ minWidth: 120 }}>
            <InputLabel>Status</InputLabel>
            <Select
              value={statusFilter}
              label="Status"
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <MenuItem value="All">All</MenuItem>
              <MenuItem value="Pending">Pending</MenuItem>
              <MenuItem value="Processing">Processing</MenuItem>
              <MenuItem value="Shipped">Shipped</MenuItem>
              <MenuItem value="Completed">Completed</MenuItem>
              <MenuItem value="Cancelled">Cancelled</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <Box sx={{ height: 600, width: '100%' }}>
          <DataGrid
            rows={filteredOrders}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[10, 25, 50]}
            checkboxSelection
            disableSelectionOnClick
            sx={{
              '& .MuiDataGrid-cell:hover': {
                color: 'primary.main',
              },
            }}
          />
        </Box>
      </Paper>

      {/* Order Details Dialog */}
      <Dialog 
        open={openDialog} 
        onClose={() => setOpenDialog(false)} 
        maxWidth="md" 
        fullWidth
      >
        <DialogTitle>
          Order Details - {selectedOrder?.id}
        </DialogTitle>
        <DialogContent>
          {selectedOrder && (
            <Box sx={{ pt: 2 }}>
              <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                <Typography variant="h6">
                  Order Information
                </Typography>
                <Chip
                  label={selectedOrder.status}
                  color={getStatusColor(selectedOrder.status)}
                />
              </Box>

              <Box mb={3}>
                <Typography variant="subtitle2" gutterBottom>Customer Details</Typography>
                <Typography variant="body2">Name: {selectedOrder.customerName}</Typography>
                <Typography variant="body2">Email: {selectedOrder.customerEmail}</Typography>
                <Typography variant="body2">Address: {selectedOrder.shippingAddress}</Typography>
              </Box>

              <Box mb={3}>
                <Typography variant="subtitle2" gutterBottom>Order Items</Typography>
                <TableContainer>
                  <Table size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell>Product</TableCell>
                        <TableCell align="right">Quantity</TableCell>
                        <TableCell align="right">Price</TableCell>
                        <TableCell align="right">Total</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {selectedOrder.items.map((item, index) => (
                        <TableRow key={index}>
                          <TableCell>{item.productName}</TableCell>
                          <TableCell align="right">{item.quantity}</TableCell>
                          <TableCell align="right">${item.price}</TableCell>
                          <TableCell align="right">${(item.quantity * item.price).toFixed(2)}</TableCell>
                        </TableRow>
                      ))}
                      <TableRow>
                        <TableCell colSpan={3} sx={{ fontWeight: 'bold' }}>Total</TableCell>
                        <TableCell align="right" sx={{ fontWeight: 'bold' }}>
                          ${selectedOrder.total}
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </Box>

              <Box mb={2}>
                <Typography variant="subtitle2" gutterBottom>Payment & Shipping</Typography>
                <Typography variant="body2">Payment Method: {selectedOrder.paymentMethod}</Typography>
                <Typography variant="body2">Order Date: {selectedOrder.createdAt}</Typography>
                <Typography variant="body2">Last Updated: {selectedOrder.updatedAt}</Typography>
              </Box>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>
            Close
          </Button>
          {selectedOrder?.status === 'Processing' && (
            <Button 
              variant="contained" 
              onClick={() => {
                handleUpdateOrderStatus(selectedOrder.id, 'Shipped');
                setOpenDialog(false);
              }}
            >
              Mark as Shipped
            </Button>
          )}
          {selectedOrder?.status === 'Shipped' && (
            <Button 
              variant="contained" 
              color="success"
              onClick={() => {
                handleUpdateOrderStatus(selectedOrder.id, 'Completed');
                setOpenDialog(false);
              }}
            >
              Mark as Completed
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Orders;