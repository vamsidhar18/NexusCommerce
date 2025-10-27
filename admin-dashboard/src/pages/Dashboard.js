import React from 'react';
import {
  Box,
  Grid,
  Paper,
  Typography,
  Card,
  CardContent,
  LinearProgress
} from '@mui/material';
import {
  TrendingUp,
  People,
  ShoppingCart,
  AttachMoney,
  Inventory
} from '@mui/icons-material';
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
  Cell
} from 'recharts';

const Dashboard = () => {
  // Mock data for charts
  const salesData = [
    { name: 'Jan', sales: 4000, orders: 240 },
    { name: 'Feb', sales: 3000, orders: 198 },
    { name: 'Mar', sales: 5000, orders: 300 },
    { name: 'Apr', sales: 4500, orders: 278 },
    { name: 'May', sales: 6000, orders: 389 },
    { name: 'Jun', sales: 5500, orders: 349 },
  ];

  const categoryData = [
    { name: 'Electronics', value: 400, color: '#0088FE' },
    { name: 'Clothing', value: 300, color: '#00C49F' },
    { name: 'Books', value: 200, color: '#FFBB28' },
    { name: 'Home', value: 100, color: '#FF8042' },
  ];

  const recentOrders = [
    { id: '1001', customer: 'John Doe', amount: '$299.99', status: 'Completed' },
    { id: '1002', customer: 'Jane Smith', amount: '$149.50', status: 'Processing' },
    { id: '1003', customer: 'Bob Johnson', amount: '$89.99', status: 'Shipped' },
    { id: '1004', customer: 'Alice Brown', amount: '$199.99', status: 'Pending' },
  ];

  const StatCard = ({ title, value, icon, color, change }) => (
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Box>
            <Typography color="textSecondary" gutterBottom variant="body2">
              {title}
            </Typography>
            <Typography variant="h4" component="h2">
              {value}
            </Typography>
            <Typography variant="body2" sx={{ color: change > 0 ? 'success.main' : 'error.main' }}>
              {change > 0 ? '+' : ''}{change}% from last month
            </Typography>
          </Box>
          <Box
            sx={{
              backgroundColor: color,
              borderRadius: '50%',
              p: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            {icon}
          </Box>
        </Box>
      </CardContent>
    </Card>
  );

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Dashboard Overview
      </Typography>
      
      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Total Revenue"
            value="$54,239"
            icon={<AttachMoney sx={{ color: 'white' }} />}
            color="success.main"
            change={12.5}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Total Orders"
            value="1,429"
            icon={<ShoppingCart sx={{ color: 'white' }} />}
            color="primary.main"
            change={8.2}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Total Users"
            value="2,847"
            icon={<People sx={{ color: 'white' }} />}
            color="info.main"
            change={15.3}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Products"
            value="892"
            icon={<Inventory sx={{ color: 'white' }} />}
            color="warning.main"
            change={-2.1}
          />
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        {/* Sales Chart */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Sales Overview
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="sales" 
                  stroke="#1976d2" 
                  strokeWidth={2}
                  name="Sales ($)"
                />
                <Line 
                  type="monotone" 
                  dataKey="orders" 
                  stroke="#dc004e" 
                  strokeWidth={2}
                  name="Orders"
                />
              </LineChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        {/* Category Distribution */}
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
                  fill="#8884d8"
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

        {/* Recent Orders */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Recent Orders
            </Typography>
            <Box>
              {recentOrders.map((order) => (
                <Box
                  key={order.id}
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    py: 1,
                    borderBottom: '1px solid #eee'
                  }}
                >
                  <Box>
                    <Typography variant="body2" fontWeight="bold">
                      Order #{order.id}
                    </Typography>
                    <Typography variant="caption" color="textSecondary">
                      {order.customer}
                    </Typography>
                  </Box>
                  <Box textAlign="right">
                    <Typography variant="body2" fontWeight="bold">
                      {order.amount}
                    </Typography>
                    <Typography 
                      variant="caption" 
                      sx={{ 
                        color: order.status === 'Completed' ? 'success.main' : 
                               order.status === 'Processing' ? 'warning.main' : 'info.main'
                      }}
                    >
                      {order.status}
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Box>
          </Paper>
        </Grid>

        {/* System Performance */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              System Performance
            </Typography>
            <Box sx={{ mb: 2 }}>
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <Typography variant="body2">CPU Usage</Typography>
                <Typography variant="body2">45%</Typography>
              </Box>
              <LinearProgress variant="determinate" value={45} sx={{ mt: 1 }} />
            </Box>
            <Box sx={{ mb: 2 }}>
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <Typography variant="body2">Memory Usage</Typography>
                <Typography variant="body2">67%</Typography>
              </Box>
              <LinearProgress variant="determinate" value={67} sx={{ mt: 1 }} color="warning" />
            </Box>
            <Box sx={{ mb: 2 }}>
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <Typography variant="body2">Disk Usage</Typography>
                <Typography variant="body2">23%</Typography>
              </Box>
              <LinearProgress variant="determinate" value={23} sx={{ mt: 1 }} color="success" />
            </Box>
            <Box>
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <Typography variant="body2">Network I/O</Typography>
                <Typography variant="body2">89%</Typography>
              </Box>
              <LinearProgress variant="determinate" value={89} sx={{ mt: 1 }} color="error" />
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;