-- Initialize database schemas for microservices

-- Create databases if they don't exist
CREATE DATABASE IF NOT EXISTS ecommerce;

-- Use the ecommerce database
\c ecommerce;

-- Create extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table will be created by JPA
-- Products table will be created by JPA  
-- Orders table will be created by JPA
-- Payments table will be created by JPA
-- Inventory table will be created by JPA

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_users_username ON users(username);
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_active ON users(active);

-- Insert sample admin user (password: admin123)
INSERT INTO users (id, username, email, password, first_name, last_name, role, active, created_at, updated_at)
VALUES (
    uuid_generate_v4(),
    'admin',
    'admin@ecommerce.com',
    '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', -- bcrypt hash for 'admin123'
    'Admin',
    'User',
    'ADMIN',
    true,
    NOW(),
    NOW()
) ON CONFLICT (username) DO NOTHING;