import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Grid,
  TextField,
  Button,
  Switch,
  FormControlLabel,
  Divider,
  Card,
  CardContent,
  CardActions,
  Alert,
  Tabs,
  Tab,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton
} from '@mui/material';
import {
  Save as SaveIcon,
  Refresh as RefreshIcon,
  Delete as DeleteIcon,
  Add as AddIcon
} from '@mui/icons-material';
import { useNotification } from '../contexts/NotificationContext';

const Settings = () => {
  const { showNotification } = useNotification();
  const [tabValue, setTabValue] = useState(0);
  const [settings, setSettings] = useState({
    siteName: 'E-Commerce Platform',
    siteDescription: 'Modern microservices-based e-commerce solution',
    adminEmail: 'admin@ecommerce.com',
    supportEmail: 'support@ecommerce.com',
    enableNotifications: true,
    enableAnalytics: true,
    maintenanceMode: false,
    autoBackup: true,
    maxOrdersPerDay: 1000,
    sessionTimeout: 30,
    enableTwoFactor: false
  });

  const [apiKeys, setApiKeys] = useState([
    { id: 1, name: 'Stripe Payment Gateway', key: 'sk_test_***************', status: 'Active' },
    { id: 2, name: 'SendGrid Email Service', key: 'SG.***************', status: 'Active' },
    { id: 3, name: 'AWS S3 Storage', key: 'AKIA***************', status: 'Inactive' }
  ]);

  const handleSettingChange = (field, value) => {
    setSettings(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSaveSettings = () => {
    // Simulate API call
    setTimeout(() => {
      showNotification('Settings saved successfully!', 'success');
    }, 500);
  };

  const handleDeleteApiKey = (id) => {
    setApiKeys(apiKeys.filter(key => key.id !== id));
    showNotification('API key deleted successfully!', 'success');
  };

  const TabPanel = ({ children, value, index }) => (
    <div hidden={value !== index}>
      {value === index && <Box sx={{ pt: 3 }}>{children}</Box>}
    </div>
  );

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        System Settings
      </Typography>

      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs value={tabValue} onChange={(e, newValue) => setTabValue(newValue)}>
          <Tab label="General" />
          <Tab label="Security" />
          <Tab label="API Keys" />
          <Tab label="System" />
        </Tabs>
      </Box>

      <TabPanel value={tabValue} index={0}>
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            General Settings
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Site Name"
                value={settings.siteName}
                onChange={(e) => handleSettingChange('siteName', e.target.value)}
                sx={{ mb: 2 }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Admin Email"
                type="email"
                value={settings.adminEmail}
                onChange={(e) => handleSettingChange('adminEmail', e.target.value)}
                sx={{ mb: 2 }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Site Description"
                multiline
                rows={3}
                value={settings.siteDescription}
                onChange={(e) => handleSettingChange('siteDescription', e.target.value)}
                sx={{ mb: 2 }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Support Email"
                type="email"
                value={settings.supportEmail}
                onChange={(e) => handleSettingChange('supportEmail', e.target.value)}
                sx={{ mb: 2 }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Max Orders Per Day"
                type="number"
                value={settings.maxOrdersPerDay}
                onChange={(e) => handleSettingChange('maxOrdersPerDay', parseInt(e.target.value))}
                sx={{ mb: 2 }}
              />
            </Grid>
            <Grid item xs={12}>
              <Divider sx={{ my: 2 }} />
              <Typography variant="subtitle1" gutterBottom>
                Feature Toggles
              </Typography>
              <FormControlLabel
                control={
                  <Switch
                    checked={settings.enableNotifications}
                    onChange={(e) => handleSettingChange('enableNotifications', e.target.checked)}
                  />
                }
                label="Enable Email Notifications"
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={settings.enableAnalytics}
                    onChange={(e) => handleSettingChange('enableAnalytics', e.target.checked)}
                  />
                }
                label="Enable Analytics Tracking"
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={settings.maintenanceMode}
                    onChange={(e) => handleSettingChange('maintenanceMode', e.target.checked)}
                  />
                }
                label="Maintenance Mode"
              />
            </Grid>
          </Grid>
          <Box sx={{ mt: 3 }}>
            <Button
              variant="contained"
              startIcon={<SaveIcon />}
              onClick={handleSaveSettings}
            >
              Save Changes
            </Button>
          </Box>
        </Paper>
      </TabPanel>

      <TabPanel value={tabValue} index={1}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Security Settings
                </Typography>
                <TextField
                  fullWidth
                  label="Session Timeout (minutes)"
                  type="number"
                  value={settings.sessionTimeout}
                  onChange={(e) => handleSettingChange('sessionTimeout', parseInt(e.target.value))}
                  sx={{ mb: 2 }}
                />
                <FormControlLabel
                  control={
                    <Switch
                      checked={settings.enableTwoFactor}
                      onChange={(e) => handleSettingChange('enableTwoFactor', e.target.checked)}
                    />
                  }
                  label="Enable Two-Factor Authentication"
                />
              </CardContent>
              <CardActions>
                <Button variant="contained" startIcon={<SaveIcon />}>
                  Update Security
                </Button>
              </CardActions>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Password Policy
                </Typography>
                <Alert severity="info" sx={{ mb: 2 }}>
                  Current policy: Minimum 8 characters, at least one uppercase, one lowercase, and one number.
                </Alert>
                <Button variant="outlined" fullWidth>
                  Configure Password Policy
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </TabPanel>

      <TabPanel value={tabValue} index={2}>
        <Paper sx={{ p: 3 }}>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
            <Typography variant="h6">
              API Keys Management
            </Typography>
            <Button variant="contained" startIcon={<AddIcon />}>
              Add New API Key
            </Button>
          </Box>
          <List>
            {apiKeys.map((apiKey) => (
              <ListItem key={apiKey.id} divider>
                <ListItemText
                  primary={apiKey.name}
                  secondary={
                    <Box>
                      <Typography variant="body2" component="span">
                        Key: {apiKey.key}
                      </Typography>
                      <br />
                      <Typography 
                        variant="caption" 
                        color={apiKey.status === 'Active' ? 'success.main' : 'error.main'}
                      >
                        Status: {apiKey.status}
                      </Typography>
                    </Box>
                  }
                />
                <ListItemSecondaryAction>
                  <IconButton edge="end" onClick={() => handleDeleteApiKey(apiKey.id)}>
                    <DeleteIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>
        </Paper>
      </TabPanel>

      <TabPanel value={tabValue} index={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  System Maintenance
                </Typography>
                <FormControlLabel
                  control={
                    <Switch
                      checked={settings.autoBackup}
                      onChange={(e) => handleSettingChange('autoBackup', e.target.checked)}
                    />
                  }
                  label="Enable Automatic Backups"
                />
                <Box sx={{ mt: 2 }}>
                  <Button variant="outlined" startIcon={<RefreshIcon />} sx={{ mr: 1 }}>
                    Clear Cache
                  </Button>
                  <Button variant="outlined" startIcon={<RefreshIcon />}>
                    Restart Services
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  System Information
                </Typography>
                <Typography variant="body2" gutterBottom>
                  <strong>Version:</strong> 1.0.0
                </Typography>
                <Typography variant="body2" gutterBottom>
                  <strong>Last Backup:</strong> 2024-01-20 10:30 AM
                </Typography>
                <Typography variant="body2" gutterBottom>
                  <strong>Uptime:</strong> 15 days, 4 hours
                </Typography>
                <Typography variant="body2" gutterBottom>
                  <strong>Database Size:</strong> 2.4 GB
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12}>
            <Alert severity="warning">
              <Typography variant="body2">
                <strong>Maintenance Window:</strong> System maintenance is scheduled for Sunday 2:00 AM - 4:00 AM UTC.
                During this time, some services may be temporarily unavailable.
              </Typography>
            </Alert>
          </Grid>
        </Grid>
      </TabPanel>
    </Box>
  );
};

export default Settings;