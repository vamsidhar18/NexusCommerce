# E-Commerce Microservices API Documentation

## Base URL
```
http://localhost:8080/api
```

## Authentication
All protected endpoints require a JWT token in the Authorization header:
```
Authorization: Bearer <jwt_token>
```

## User Service Endpoints

### Authentication

#### Register User
```http
POST /auth/register
Content-Type: application/json

{
  "username": "johndoe",
  "email": "john@example.com",
  "password": "password123",
  "firstName": "John",
  "lastName": "Doe",
  "phoneNumber": "+1234567890"
}
```

**Response:**
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "user": {
      "id": "uuid",
      "username": "johndoe",
      "email": "john@example.com",
      "firstName": "John",
      "lastName": "Doe",
      "role": "CUSTOMER",
      "active": true,
      "createdAt": "2024-01-01T10:00:00"
    },
    "token": "jwt_token_here"
  }
}
```

#### Login User
```http
POST /auth/login
Content-Type: application/json

{
  "identifier": "johndoe", // username or email
  "password": "password123"
}
```

### User Management

#### Get User by ID
```http
GET /users/{userId}
Authorization: Bearer <token>
```

#### Get User by Username
```http
GET /users/username/{username}
Authorization: Bearer <token>
```

#### Update User
```http
PUT /users/{userId}
Authorization: Bearer <token>
Content-Type: application/json

{
  "firstName": "John",
  "lastName": "Doe",
  "email": "newemail@example.com",
  "phoneNumber": "+1234567890"
}
```

## Product Service Endpoints (Coming Soon)

#### Get All Products
```http
GET /products?page=0&size=10&sort=name
```

#### Get Product by ID
```http
GET /products/{productId}
```

#### Create Product (Admin only)
```http
POST /products
Authorization: Bearer <admin_token>
Content-Type: application/json

{
  "name": "Product Name",
  "description": "Product Description",
  "price": 99.99,
  "categoryId": "category-uuid",
  "stockQuantity": 100
}
```

## Order Service Endpoints (Coming Soon)

#### Create Order
```http
POST /orders
Authorization: Bearer <token>
Content-Type: application/json

{
  "items": [
    {
      "productId": "product-uuid",
      "quantity": 2,
      "price": 99.99
    }
  ]
}
```

#### Get User Orders
```http
GET /orders/user/{userId}
Authorization: Bearer <token>
```

## Payment Service Endpoints (Coming Soon)

#### Process Payment
```http
POST /payments
Authorization: Bearer <token>
Content-Type: application/json

{
  "orderId": "order-uuid",
  "amount": 199.98,
  "paymentMethod": "CREDIT_CARD",
  "cardDetails": {
    "cardNumber": "4111111111111111",
    "expiryMonth": "12",
    "expiryYear": "2025",
    "cvv": "123"
  }
}
```

## Error Responses

All endpoints return errors in the following format:
```json
{
  "success": false,
  "error": "Error message description",
  "timestamp": "2024-01-01T10:00:00"
}
```

## Status Codes

- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `500` - Internal Server Error

## Rate Limiting

API Gateway implements rate limiting:
- 1000 requests per minute per IP
- 100 requests per minute per authenticated user

## Health Checks

#### Service Health
```http
GET /auth/health
GET /products/health
GET /orders/health
GET /payments/health
GET /inventory/health
```

#### Gateway Health
```http
GET /actuator/health
```