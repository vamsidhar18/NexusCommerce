import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Grid,
  Card,
  CardContent,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Tabs,
  Tab
} from '@mui/material';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area
} from 'recharts';

const Analytics = () => {
  const [timeRange, setTimeRange] = useState('7days');
  const [tabValue, setTabValue] = useState(0);

  // Mock analytics data
  const salesData = [
    { date: '2024-01-14', sales: 4000, orders: 24, users: 12 },
    { date: '2024-01-15', sales: 3000, orders: 18, users: 15 },
    { date: '2024-01-16', sales: 5000, orders: 30, users: 20 },
    { date: '2024-01-17', sales: 4500, orders: 27, users: 18 },
    { date: '2024-01-18', sales: 6000, orders: 35, users: 25 },
    { date: '2024-01-19', sales: 5500, orders: 32, users: 22 },
    { date: '2024-01-20', sales: 7000, orders: 40, users: 30 }
  ];

  const categoryData = [
    { name: 'Electronics', value: 45, color: '#0088FE' },
    { name: 'Clothing', value: 25, color: '#00C49F' },
    { name: 'Home', value: 20, color: '#FFBB28' },
    { name: 'Books', value: 10, color: '#FF8042' }
  ];

  const topProducts = [
    { name: 'iPhone 15 Pro', sales: 125, revenue: 124875 },
    { name: 'MacBook Air M2', sales: 89, revenue: 115711 },
    { name: 'Nike Air Max', sales: 234, revenue: 30426 },
    { name: 'Coffee Maker Pro', sales: 67, revenue: 20093 }
  ];

  const userGrowthData = [
    { month: 'Jul', newUsers: 120, totalUsers: 1200 },
    { month: 'Aug', newUsers: 150, totalUsers: 1350 },
    { month: 'Sep', newUsers: 180, totalUsers: 1530 },
    { month: 'Oct', newUsers: 200, totalUsers: 1730 },
    { month: 'Nov', newUsers: 250, totalUsers: 1980 },
    { month: 'Dec', newUsers: 300, totalUsers: 2280 },
    { month: 'Jan', newUsers: 350, totalUsers: 2630 }
  ];

  const revenueByRegion = [
    { region: 'North America', revenue: 45000 },
    { region: 'Europe', revenue: 32000 },
    { region: 'Asia', revenue: 28000 },
    { region: 'South America', revenue: 15000 },
    { region: 'Africa', revenue: 8000 },
    { region: 'Oceania', revenue: 5000 }
  ];

  const StatCard = ({ title, value, change, color }) => (
    <Card>
      <CardContent>
        <Typography color="textSecondary" gutterBottom variant="body2">
          {title}
        </Typography>
        <Typography variant="h4" component="h2" sx={{ color }}>
          {value}
        </Typography>
        <Typography variant="body2" sx={{ color: change > 0 ? 'success.main' : 'error.main' }}>
          {change > 0 ? '+' : ''}{change}% vs last period
        </Typography>
      </CardContent>
    </Card>
  );

  const TabPanel = ({ children, value, index }) => (
    <div hidden={value !== index}>
      {value === index && <Box sx={{ pt: 3 }}>{children}</Box>}
    </div>
  );

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4">
          Analytics Dashboard
        </Typography>
        <FormControl sx={{ minWidth: 120 }}>
          <InputLabel>Time Range</InputLabel>
          <Select
            value={timeRange}
            label="Time Range"
            onChange={(e) => setTimeRange(e.target.value)}
          >
            <MenuItem value="7days">Last 7 Days</MenuItem>
            <MenuItem value="30days">Last 30 Days</MenuItem>
            <MenuItem value="90days">Last 90 Days</MenuItem>
            <MenuItem value="1year">Last Year</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {/* Key Metrics */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Total Revenue"
            value="$128,450"
            change={15.3}
            color="success.main"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Total Orders"
            value="2,847"
            change={8.7}
            color="primary.main"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Conversion Rate"
            value="3.24%"
            change={-2.1}
            color="warning.main"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Avg Order Value"
            value="$89.32"
            change={12.8}
            color="info.main"
          />
        </Grid>
      </Grid>

      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs value={tabValue} onChange={(e, newValue) => setTabValue(newValue)}>
          <Tab label="Sales Analytics" />
          <Tab label="User Analytics" />
          <Tab label="Product Analytics" />
          <Tab label="Geographic Analytics" />
        </Tabs>
      </Box>

      <TabPanel value={tabValue} index={0}>
        <Grid container spacing={3}>
          {/* Sales Trend */}
          <Grid item xs={12} md={8}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Sales Trend
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={salesData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Area 
                    type="monotone" 
                    dataKey="sales" 
                    stroke="#1976d2" 
                    fill="#1976d2" 
                    fillOpacity={0.3}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </Paper>
          </Grid>

          {/* Sales by Category */}
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Sales by Category
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </Paper>
          </Grid>

          {/* Daily Orders */}
          <Grid item xs={12}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Daily Orders
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={salesData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="orders" fill="#dc004e" />
                </BarChart>
              </ResponsiveContainer>
            </Paper>
          </Grid>
        </Grid>
      </TabPanel>

      <TabPanel value={tabValue} index={1}>
        <Grid container spacing={3}>
          {/* User Growth */}
          <Grid item xs={12} md={8}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                User Growth
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={userGrowthData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line 
                    type="monotone" 
                    dataKey="newUsers" 
                    stroke="#00C49F" 
                    strokeWidth={2}
                    name="New Users"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="totalUsers" 
                    stroke="#0088FE" 
                    strokeWidth={2}
                    name="Total Users"
                  />
                </LineChart>
              </ResponsiveContainer>
            </Paper>
          </Grid>

          {/* User Activity */}
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                User Activity (Last 7 Days)
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={salesData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="users" fill="#FFBB28" />
                </BarChart>
              </ResponsiveContainer>
            </Paper>
          </Grid>
        </Grid>
      </TabPanel>

      <TabPanel value={tabValue} index={2}>
        <Grid container spacing={3}>
          {/* Top Products */}
          <Grid item xs={12}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Top Selling Products
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={topProducts} layout="horizontal">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis dataKey="name" type="category" width={100} />
                  <Tooltip />
                  <Bar dataKey="sales" fill="#1976d2" />
                </BarChart>
              </ResponsiveContainer>
            </Paper>
          </Grid>
        </Grid>
      </TabPanel>

      <TabPanel value={tabValue} index={3}>
        <Grid container spacing={3}>
          {/* Revenue by Region */}
          <Grid item xs={12}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Revenue by Region
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={revenueByRegion}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="region" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="revenue" fill="#FF8042" />
                </BarChart>
              </ResponsiveContainer>
            </Paper>
          </Grid>
        </Grid>
      </TabPanel>
    </Box>
  );
};

export default Analytics;