#!/bin/bash

echo "🚀 Deploying NexusCommerce Admin Dashboard to GitHub Pages..."

# Navigate to dashboard directory
cd admin-dashboard

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Build for production
echo "🔨 Building dashboard..."
npm run build

# Create gh-pages branch and deploy
echo "🌐 Deploying to GitHub Pages..."
cd build

# Initialize git in build folder
git init
git add .
git commit -m "Deploy NexusCommerce Admin Dashboard"

# Push to gh-pages branch
git branch -M gh-pages
git remote add origin https://github.com/vamsidhar18/NexusCommerce.git
git push -f origin gh-pages

echo "✅ Dashboard deployed successfully!"
echo "🌐 Live URL: https://vamsidhar18.github.io/NexusCommerce/"
echo ""
echo "📝 Next steps:"
echo "1. Go to GitHub repository settings"
echo "2. Navigate to Pages section"
echo "3. Select 'Deploy from a branch'"
echo "4. Choose 'gh-pages' branch"
echo "5. Dashboard will be live in 2-3 minutes!"