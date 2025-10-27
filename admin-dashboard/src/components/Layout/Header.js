import React, { useState } from 'react';
import {
  Box,
  Typography,
  IconButton,
  Badge,
  Menu,
  MenuItem,
  Avatar,
  Chip
} from '@mui/material';
import {
  Notifications as NotificationsIcon,
  AccountCircle,
  ExitToApp as LogoutIcon
} from '@mui/icons-material';
import { useAuth } from '../../contexts/AuthContext';

const Header = () => {
  const { user, logout } = useAuth();
  const [anchorEl, setAnchorEl] = useState(null);
  const [notificationAnchor, setNotificationAnchor] = useState(null);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setAnchorEl(null);
  };

  const handleNotificationOpen = (event) => {
    setNotificationAnchor(event.currentTarget);
  };

  const handleNotificationClose = () => {
    setNotificationAnchor(null);
  };

  const handleLogout = () => {
    logout();
    handleProfileMenuClose();
  };

  // Mock notifications
  const notifications = [
    { id: 1, message: 'New order received', time: '2 min ago' },
    { id: 2, message: 'User registration spike', time: '5 min ago' },
    { id: 3, message: 'Low inventory alert', time: '10 min ago' },
  ];

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', justifyContent: 'space-between' }}>
      <Typography variant="h6" component="div">
        Admin Dashboard
      </Typography>
      
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Chip 
          label={`${user?.role || 'ADMIN'}`} 
          color="secondary" 
          size="small" 
        />
        
        <IconButton
          color="inherit"
          onClick={handleNotificationOpen}
        >
          <Badge badgeContent={notifications.length} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>

        <IconButton
          color="inherit"
          onClick={handleProfileMenuOpen}
        >
          <Avatar sx={{ width: 32, height: 32 }}>
            {user?.firstName?.[0] || 'A'}
          </Avatar>
        </IconButton>
      </Box>

      {/* Profile Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleProfileMenuClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <MenuItem disabled>
          <Box>
            <Typography variant="subtitle2">
              {user?.firstName} {user?.lastName}
            </Typography>
            <Typography variant="caption" color="textSecondary">
              {user?.email}
            </Typography>
          </Box>
        </MenuItem>
        <MenuItem onClick={handleLogout}>
          <LogoutIcon sx={{ mr: 1 }} />
          Logout
        </MenuItem>
      </Menu>

      {/* Notifications Menu */}
      <Menu
        anchorEl={notificationAnchor}
        open={Boolean(notificationAnchor)}
        onClose={handleNotificationClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        PaperProps={{
          sx: { width: 300 }
        }}
      >
        <MenuItem disabled>
          <Typography variant="subtitle2">Notifications</Typography>
        </MenuItem>
        {notifications.map((notification) => (
          <MenuItem key={notification.id} onClick={handleNotificationClose}>
            <Box>
              <Typography variant="body2">{notification.message}</Typography>
              <Typography variant="caption" color="textSecondary">
                {notification.time}
              </Typography>
            </Box>
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
};

export default Header;