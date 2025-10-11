#!/bin/sh
set -e

echo "🚀 Starting Employee Management System..."

# Set database path to persistent volume
export DATABASE_URL="file:/app/data/prod.db"

# Navigate to backend directory
cd /app/backend

# Run database setup
echo "📊 Setting up database..."
yarn db:push --accept-data-loss --skip-generate

# Seed database if empty
echo "🌱 Checking database..."
node -e "
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
prisma.employee.count().then(count => {
  if (count === 0) {
    console.log('Seeding database...');
    require('child_process').execSync('node seed.js');
    console.log('✅ Database seeded');
  } else {
    console.log('✅ Database ready');
  }
  prisma.\$disconnect();
});
"

# Start the server
echo "🎯 Starting server..."
exec node dist/server.js