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
  MenuItem
} from '@mui/material';
import {
  Search as SearchIcon,
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Block as BlockIcon
} from '@mui/icons-material';
import { DataGrid } from '@mui/x-data-grid';

const Users = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  // Mock user data
  const [users, setUsers] = useState([
    {
      id: '1',
      username: 'johndoe',
      email: 'john@example.com',
      firstName: 'John',
      lastName: 'Doe',
      role: 'CUSTOMER',
      active: true,
      createdAt: '2024-01-15',
      lastLogin: '2024-01-20'
    },
    {
      id: '2',
      username: 'janesmith',
      email: 'jane@example.com',
      firstName: 'Jane',
      lastName: 'Smith',
      role: 'SELLER',
      active: true,
      createdAt: '2024-01-10',
      lastLogin: '2024-01-19'
    },
    {
      id: '3',
      username: 'admin',
      email: 'admin@ecommerce.com',
      firstName: 'Admin',
      lastName: 'User',
      role: 'ADMIN',
      active: true,
      createdAt: '2024-01-01',
      lastLogin: '2024-01-20'
    },
    {
      id: '4',
      username: 'bobwilson',
      email: 'bob@example.com',
      firstName: 'Bob',
      lastName: 'Wilson',
      role: 'CUSTOMER',
      active: false,
      createdAt: '2024-01-12',
      lastLogin: '2024-01-18'
    }
  ]);

  const handleEditUser = (user) => {
    setSelectedUser(user);
    setOpenDialog(true);
  };

  const handleToggleUserStatus = (userId) => {
    setUsers(users.map(user => 
      user.id === userId ? { ...user, active: !user.active } : user
    ));
  };

  const handleDeleteUser = (userId) => {
    setUsers(users.filter(user => user.id !== userId));
  };

  const filteredUsers = users.filter(user =>
    user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.lastName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const columns = [
    {
      field: 'username',
      headerName: 'Username',
      width: 150,
      renderCell: (params) => (
        <Box>
          <Typography variant="body2" fontWeight="bold">
            {params.value}
          </Typography>
        </Box>
      )
    },
    {
      field: 'fullName',
      headerName: 'Full Name',
      width: 200,
      valueGetter: (params) => `${params.row.firstName} ${params.row.lastName}`
    },
    {
      field: 'email',
      headerName: 'Email',
      width: 250
    },
    {
      field: 'role',
      headerName: 'Role',
      width: 120,
      renderCell: (params) => (
        <Chip
          label={params.value}
          color={
            params.value === 'ADMIN' ? 'error' :
            params.value === 'SELLER' ? 'warning' : 'primary'
          }
          size="small"
        />
      )
    },
    {
      field: 'active',
      headerName: 'Status',
      width: 120,
      renderCell: (params) => (
        <Chip
          label={params.value ? 'Active' : 'Inactive'}
          color={params.value ? 'success' : 'default'}
          size="small"
        />
      )
    },
    {
      field: 'createdAt',
      headerName: 'Created',
      width: 120
    },
    {
      field: 'lastLogin',
      headerName: 'Last Login',
      width: 120
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 150,
      sortable: false,
      renderCell: (params) => (
        <Box>
          <IconButton
            size="small"
            onClick={() => handleEditUser(params.row)}
            color="primary"
          >
            <EditIcon />
          </IconButton>
          <IconButton
            size="small"
            onClick={() => handleToggleUserStatus(params.row.id)}
            color={params.row.active ? 'warning' : 'success'}
          >
            <BlockIcon />
          </IconButton>
          <IconButton
            size="small"
            onClick={() => handleDeleteUser(params.row.id)}
            color="error"
          >
            <DeleteIcon />
          </IconButton>
        </Box>
      )
    }
  ];

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4">
          User Management
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => {
            setSelectedUser(null);
            setOpenDialog(true);
          }}
        >
          Add User
        </Button>
      </Box>

      <Paper sx={{ p: 3 }}>
        <Box mb={3}>
          <TextField
            fullWidth
            placeholder="Search users..."
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

        <Box sx={{ height: 600, width: '100%' }}>
          <DataGrid
            rows={filteredUsers}
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

      {/* User Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>
          {selectedUser ? 'Edit User' : 'Add New User'}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2 }}>
            <TextField
              fullWidth
              label="Username"
              defaultValue={selectedUser?.username || ''}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Email"
              type="email"
              defaultValue={selectedUser?.email || ''}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="First Name"
              defaultValue={selectedUser?.firstName || ''}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Last Name"
              defaultValue={selectedUser?.lastName || ''}
              sx={{ mb: 2 }}
            />
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>Role</InputLabel>
              <Select
                defaultValue={selectedUser?.role || 'CUSTOMER'}
                label="Role"
              >
                <MenuItem value="CUSTOMER">Customer</MenuItem>
                <MenuItem value="SELLER">Seller</MenuItem>
                <MenuItem value="ADMIN">Admin</MenuItem>
              </Select>
            </FormControl>
            {!selectedUser && (
              <TextField
                fullWidth
                label="Password"
                type="password"
                sx={{ mb: 2 }}
              />
            )}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>
            Cancel
          </Button>
          <Button variant="contained" onClick={() => setOpenDialog(false)}>
            {selectedUser ? 'Update' : 'Create'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Users;