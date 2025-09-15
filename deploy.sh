#!/bin/bash
# FOSTER Project MIS - Deployment Script for foster.alsukssd.com
# Run this script to deploy to various platforms

echo "🌾 FOSTER Project MIS - Production Deployment"
echo "=============================================="
echo "🌐 Target Domain: https://foster.alsukssd.com"
echo ""

# Check if build exists
if [ ! -d "build" ]; then
    echo "❌ Build folder not found. Running build..."
    npm run build
fi

echo ""
echo "📦 Build folder ready for foster.alsukssd.com!"
echo "Choose deployment option:"
echo ""
echo "1) 🌐 Netlify (with custom domain)"
echo "2) ⚡ Vercel (with custom domain)"
echo "3) 📄 GitHub Pages"
echo "4) 🔧 Local test server"
echo "5) 📁 Show build folder for manual upload"
echo "6) 📋 Show server upload commands"
echo ""

read -p "Enter choice (1-6): " choice

case $choice in
    1)
        echo "📂 Opening build folder for Netlify..."
        echo "👉 1. Drag the 'build' folder to: https://netlify.com/drop"
        echo "👉 2. Configure custom domain: foster.alsukssd.com"
        echo "👉 3. Add SSL certificate"
        open build/
        open "https://netlify.com/drop"
        ;;
    2)
        echo "⚡ Deploying to Vercel..."
        echo "👉 Configure custom domain after deployment: foster.alsukssd.com"
        npx vercel --prod
        ;;
    3)
        echo "📄 Deploying to GitHub Pages..."
        echo "⚠️  Note: You'll need to configure DNS for foster.alsukssd.com"
        npm install gh-pages
        npx gh-pages -d build
        ;;
    4)
        echo "🔧 Starting local test server..."
        echo "🌐 Testing at: http://localhost:3000"
        npm run serve
        ;;
    5)
        echo "📁 Opening build folder for manual upload..."
        echo ""
        echo "📋 Upload instructions:"
        echo "1. Upload all contents of 'build/' folder to your web server"
        echo "2. Set document root to: /var/www/foster.alsukssd.com/"
        echo "3. Configure Apache/Nginx for SPA routing"
        echo "4. Ensure HTTPS is enabled"
        echo ""
        open build/
        ;;
    6)
        echo "� Server Upload Commands:"
        echo ""
        echo "# Using rsync:"
        echo "rsync -avz build/ user@foster.alsukssd.com:/var/www/foster.alsukssd.com/"
        echo ""
        echo "# Using scp:"
        echo "scp -r build/* user@foster.alsukssd.com:/var/www/foster.alsukssd.com/"
        echo ""
        echo "# Don't forget to:"
        echo "1. Configure .htaccess or nginx.conf for SPA routing"
        echo "2. Enable HTTPS"
        echo "3. Test at https://foster.alsukssd.com"
        ;;
    *)
        echo "❌ Invalid option"
        ;;
esac

echo ""
echo "📚 For detailed instructions, see: DEPLOYMENT_FOSTER_DOMAIN.md"
echo "🌐 Target URL: https://foster.alsukssd.com"
