# 🚀 Employee Management System

> Production-grade full-stack CRUD application with Docker deployment

## ✨ Features

- **Full CRUD Operations**: Create, Read, Update, Delete employees
- **Real-time Search**: Instant employee search functionality  
- **Professional UI**: Clean, responsive interface
- **Docker Ready**: Containerized for easy deployment
- **Database Persistence**: SQLite with volume mounting
- **Health Checks**: Built-in monitoring endpoints

## 🛠️ Tech Stack

- **Backend**: Fastify + TypeScript + Prisma + SQLite
- **Frontend**: Next.js + React + Tailwind CSS
- **Deployment**: Docker + DigitalOcean App Platform

## 🚀 Quick Start

### Local Development

```bash
# Clone and setup
git clone <repo-url>
cd employee-management-system
yarn install

# Start development servers
yarn dev
```

**Access Points:**
- Frontend: http://localhost:3000
- API: http://localhost:8000/api
- Health: http://localhost:8000/health

### Docker Deployment

```bash
# Build and run with Docker Compose
docker-compose up --build

# Or build manually
docker build -t employee-management .
docker run -p 8000:8000 -v $(pwd)/data:/app/data employee-management
```

## 🌐 DigitalOcean Deployment

### App Platform Setup

1. **Create App** → Choose Docker
2. **Repository**: Your GitHub repo
3. **Environment Variables**:
   ```
   DATABASE_URL=file:/app/data/prod.db
   NODE_ENV=production
   PORT=8000
   ```
4. **Port**: 8000
5. **Health Check**: `/health`

### Features in Production

- ✅ Automatic database setup and seeding
- ✅ Persistent data storage
- ✅ Health monitoring
- ✅ Full CRUD interface
- ✅ Search functionality
- ✅ Responsive design

## 📡 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/employees` | List all employees |
| `GET` | `/api/employees?search=query` | Search employees |
| `POST` | `/api/employees` | Create employee |
| `PUT` | `/api/employees/:id` | Update employee |
| `DELETE` | `/api/employees/:id` | Delete employee |
| `GET` | `/health` | Health check |

## 🏗️ Project Structure

```
employee-management-system/
├── backend/                 # Fastify API
│   ├── src/                # Source code
│   ├── prisma/             # Database schema
│   └── dist/               # Compiled output
├── frontend/               # Next.js app
│   ├── app/                # App router
│   └── components/         # React components
├── scripts/                # Deployment scripts
├── Dockerfile              # Container definition
└── docker-compose.yml      # Local development
```

## 🔧 Environment Variables

```bash
# Development
DATABASE_URL="file:./dev.db"
NODE_ENV="development"
PORT=8000
NEXT_PUBLIC_API_URL="http://localhost:8000/api"

# Production
DATABASE_URL="file:/app/data/prod.db"
NODE_ENV="production"
PORT=8000
```

## 🧪 Testing

```bash
# API tests
cd backend && yarn test

# Health check
curl http://localhost:8000/health
```

## 📊 Monitoring

- **Health Endpoint**: `/health`
- **Docker Health Check**: Built-in container monitoring
- **Logs**: Structured logging with timestamps

---

**Professional deployment ready for production use! 🎯**