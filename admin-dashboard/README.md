# E-Commerce Admin Dashboard

A modern, responsive admin dashboard built with React and Material-UI for managing the E-Commerce Microservices Platform.

## 🚀 Features

### 📊 **Dashboard Overview**
- Real-time sales analytics with interactive charts
- Key performance indicators (KPIs)
- Recent orders and system performance metrics
- Revenue trends and category distribution

### 👥 **User Management**
- Complete CRUD operations for users
- Role-based access control (Admin, Seller, Customer)
- User status management (Active/Inactive)
- Advanced search and filtering

### 📦 **Product Management**
- Grid and table view modes
- Product catalog with images
- Inventory tracking
- Category management
- Bulk operations

### 🛒 **Order Management**
- Order status tracking and updates
- Detailed order views with customer information
- Order fulfillment workflow
- Payment and shipping details

### 📈 **Advanced Analytics**
- Multi-tab analytics dashboard
- Sales, user, product, and geographic analytics
- Interactive charts and visualizations
- Customizable time ranges

### ⚙️ **System Settings**
- General configuration
- Security settings
- API key management
- System maintenance tools

## 🛠️ **Technology Stack**

- **Frontend**: React 18, Material-UI 5
- **Charts**: Recharts
- **State Management**: React Query
- **Routing**: React Router v6
- **HTTP Client**: Axios
- **Build Tool**: Create React App
- **Deployment**: Docker + Nginx

## 🏗️ **Architecture**

```
src/
├── components/          # Reusable UI components
│   ├── Layout/         # Layout components (Sidebar, Header)
│   └── ProtectedRoute  # Route protection
├── contexts/           # React contexts
│   ├── AuthContext    # Authentication state
│   └── NotificationContext # Global notifications
├── pages/             # Main application pages
│   ├── Dashboard      # Analytics overview
│   ├── Users          # User management
│   ├── Products       # Product management
│   ├── Orders         # Order management
│   ├── Analytics      # Advanced analytics
│   └── Settings       # System configuration
└── App.js             # Main application component
```

## 🚀 **Quick Start**

### Development
```bash
cd admin-dashboard
npm install
npm start
```

### Production Build
```bash
npm run build
```

### Docker Deployment
```bash
docker build -t ecommerce-admin-dashboard .
docker run -p 3000:80 ecommerce-admin-dashboard
```

## 🔐 **Authentication**

The dashboard uses JWT-based authentication:
- **Demo Credentials**: admin / admin123
- Protected routes with automatic token validation
- Role-based access control

## 📱 **Responsive Design**

- Mobile-first approach
- Responsive sidebar navigation
- Adaptive charts and tables
- Touch-friendly interface

## 🎨 **UI/UX Features**

- **Material Design**: Clean, modern interface
- **Dark/Light Theme**: Automatic theme switching
- **Interactive Charts**: Hover effects and tooltips
- **Real-time Updates**: Live data refresh
- **Notifications**: Toast notifications for user actions
- **Loading States**: Skeleton loading and spinners

## 🔧 **Configuration**

### Environment Variables
```env
REACT_APP_API_URL=http://localhost:8080/api
REACT_APP_WS_URL=ws://localhost:8080/ws
```

### Proxy Configuration
The development server proxies API requests to `http://localhost:8080`

## 📊 **Dashboard Features**

### Real-time Metrics
- Total Revenue with growth indicators
- Order count and trends
- User registration statistics
- Product inventory levels

### Interactive Charts
- Sales trend line charts
- Category distribution pie charts
- User growth area charts
- Geographic revenue maps

### Data Tables
- Sortable and filterable data grids
- Bulk selection and operations
- Export functionality
- Pagination with customizable page sizes

## 🔒 **Security Features**

- JWT token management
- Automatic token refresh
- Protected route components
- Role-based UI rendering
- CSRF protection

## 🚀 **Performance Optimizations**

- Code splitting with React.lazy
- Image optimization and lazy loading
- Memoized components and callbacks
- Efficient re-rendering with React Query
- Gzip compression in production

## 📈 **Analytics Capabilities**

- **Sales Analytics**: Revenue trends, order patterns
- **User Analytics**: Growth metrics, activity patterns
- **Product Analytics**: Best sellers, category performance
- **Geographic Analytics**: Regional sales distribution

## 🛠️ **Development Tools**

- ESLint for code quality
- Prettier for code formatting
- React DevTools support
- Hot module replacement
- Source maps for debugging

This admin dashboard provides a comprehensive management interface for the e-commerce platform, showcasing modern React development practices and enterprise-grade features.