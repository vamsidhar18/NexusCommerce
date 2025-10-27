#!/bin/bash

echo "🚀 Starting E-Commerce Admin Dashboard..."

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
fi

echo "🌐 Starting development server..."
echo "Dashboard will be available at: http://localhost:3000"
echo "Demo credentials: admin / admin123"

npm start