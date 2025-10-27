#!/bin/bash

# Build script for E-Commerce Microservices Platform

echo "🚀 Building E-Commerce Microservices Platform..."

# Check if Maven wrapper exists
if [ ! -f "./mvnw" ]; then
    echo "❌ Maven wrapper not found. Please ensure you're in the project root directory."
    exit 1
fi

# Clean and build all services
echo "📦 Building all services..."
./mvnw clean package -DskipTests

if [ $? -ne 0 ]; then
    echo "❌ Maven build failed!"
    exit 1
fi

# Build Docker images
echo "🐳 Building Docker images..."
docker-compose build

if [ $? -ne 0 ]; then
    echo "❌ Docker build failed!"
    exit 1
fi

echo "✅ Build completed successfully!"
echo ""
echo "🔧 Quick Start Options:"
echo ""
echo "1. 📊 Admin Dashboard Only (Fastest Demo):"
echo "   cd admin-dashboard && ./start-dev.sh"
echo "   → http://localhost:3000 (admin/admin123)"
echo ""
echo "2. 🚀 Full Platform:"
echo "   docker-compose up -d"
echo "   → Admin Dashboard: http://localhost:3000"
echo "   → API Gateway: http://localhost:8080"
echo ""
echo "3. 📋 View Logs:"
echo "   docker-compose logs -f [service-name]"
echo ""
echo "4. 🛑 Stop Platform:"
echo "   docker-compose down"