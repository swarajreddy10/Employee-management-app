# Employee Management System

[![Live Demo](https://img.shields.io/badge/🌐_Live_Demo-Visit-blue?style=for-the-badge)](https://employee-management-app-mscr.vercel.app)
[![API Status](https://img.shields.io/badge/🔗_API-Online-green?style=for-the-badge)](https://employee-management-app-c6psx.ondigitalocean.app/health)
[![TypeScript](https://img.shields.io/badge/TypeScript-100%25-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![Fastify](https://img.shields.io/badge/Fastify-API-000000?style=for-the-badge&logo=fastify&logoColor=white)](https://www.fastify.io/)
[![Vercel](https://img.shields.io/badge/Vercel-Deployed-000000?style=for-the-badge&logo=vercel&logoColor=white)]([https://vercel.com/](https://employee-management-app-mscr.vercel.app/))
[![DigitalOcean](https://img.shields.io/badge/DigitalOcean-Deployed-0080FF?style=for-the-badge&logo=digitalocean&logoColor=white)]([https://www.digitalocean.com/](https://employee-management-app-c6psx.ondigitalocean.app/api/employees))

> **Modern full-stack employee management application with separate frontend/backend deployments**

## 🚀 Live Application

| Service | URL | Status |
|---------|-----|--------|
| **Frontend** | [employee-management-app-mscr.vercel.app](https://employee-management-app-mscr.vercel.app) | [![Vercel](https://img.shields.io/badge/Live-brightgreen)](https://employee-management-app-mscr.vercel.app) |
| **API** | [employee-management-app-c6psx.ondigitalocean.app](https://employee-management-app-c6psx.ondigitalocean.app/api/employees) | [![API](https://img.shields.io/badge/Online-success)](https://employee-management-app-c6psx.ondigitalocean.app/health) |

## ⚡ Features

- **CRUD Operations** - Create, read, update, delete employees
- **Real-time Search** - Instant search with debouncing
- **Responsive Design** - Mobile-first approach
- **Type Safety** - 100% TypeScript coverage
- **High Performance** - Optimized API responses
- **Production Ready** - Scalable architecture

## 🛠 Tech Stack

### Frontend
```
Next.js 14 + React + TypeScript + Tailwind CSS + TanStack Query
```
**Deployed on:** Vercel

### Backend
```
Fastify + Prisma + SQLite + TypeScript + Docker
```
**Deployed on:** DigitalOcean App Platform

## 🏃‍♂️ Quick Start

```bash
# Clone & install
git clone https://github.com/swarajreddy10/Employee-management-app.git
cd Employee-management-app && yarn install

# Start development
yarn dev
```

**Development URLs:**
- Frontend: `http://localhost:3000`
- API: `http://localhost:8000/api`

## 📋 API Reference

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/employees` | Get all employees |
| `GET` | `/api/employees?search={query}` | Search employees |
| `POST` | `/api/employees` | Create employee |
| `PUT` | `/api/employees/{id}` | Update employee |
| `DELETE` | `/api/employees/{id}` | Delete employee |
| `GET` | `/health` | Health check |

**Example:**
```bash
curl https://employee-management-app-c6psx.ondigitalocean.app/api/employees
```

## 🏗 Architecture

```mermaid
graph LR
    A[Next.js Frontend<br/>Vercel] -->|API Calls| B[Fastify Backend<br/>DigitalOcean]
    B --> C[SQLite Database<br/>Persistent Storage]
```

## ⚙️ Environment Setup

**Backend** (`.env`)
```env
DATABASE_URL=file:./dev.db
NODE_ENV=development
PORT=8000
```

**Frontend** (`.env.local`)
```env
NEXT_PUBLIC_API_URL=http://localhost:8000/api
```

## 🧪 Testing

```bash
# Backend tests
cd backend && yarn test

# Health check
curl https://employee-management-app-c6psx.ondigitalocean.app/health
```

## 📊 Performance

- **API Response:** < 50ms
- **Frontend Load:** < 2s
- **Database:** Optimized with Prisma
- **CDN:** Global edge caching

## 👨‍💻 Developer

**Swaraj Reddy**  
[![GitHub](https://img.shields.io/badge/GitHub-swarajreddy10-181717?style=flat&logo=github)](https://github.com/swarajreddy10)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-swarajreddy-0A66C2?style=flat&logo=linkedin)](https://linkedin.com/in/swarajreddy)

---

[![Star](https://img.shields.io/github/stars/swarajreddy10/Employee-management-app?style=social)](https://github.com/swarajreddy10/Employee-management-app)

**[🚀 Try Live Demo](https://employee-management-app-mscr.vercel.app)**
