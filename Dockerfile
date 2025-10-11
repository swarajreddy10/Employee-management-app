FROM node:20-alpine

# Install curl for health checks
RUN apk add --no-cache curl

WORKDIR /app

# Install dependencies first (better caching)
COPY package.json yarn.lock ./
COPY backend/package.json ./backend/
COPY frontend/package.json ./frontend/
RUN yarn install --frozen-lockfile

# Copy source code
COPY . .

# Build backend
WORKDIR /app/backend
RUN yarn db:generate && yarn build

# Skip frontend build - API only

# Create data directory and copy startup script
WORKDIR /app
RUN mkdir -p /app/data
COPY scripts/start.sh /app/start.sh
RUN chmod +x /app/start.sh

# Expose port
EXPOSE 8000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=10s --retries=3 \
  CMD curl -f http://localhost:8000/health || exit 1

# Start command
CMD ["/app/start.sh"]