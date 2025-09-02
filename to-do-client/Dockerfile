# Multi-stage build for NX React app
FROM node:18-alpine AS builder

WORKDIR /app

# Copy workspace root files
COPY ../package*.json ./
COPY ../nx.json ./
COPY ../tsconfig.base.json ./


# Install dependencies
RUN npm ci --legacy-peer-deps

# Copy entire workspace
COPY .. .

# Build React app
RUN npx nx build to-do-client --prod

# Production stage with nginx
FROM nginx:alpine

# Install envsubst for variable substitution
RUN apk add --no-cache gettext

# Remove default nginx site
RUN rm -rf /usr/share/nginx/html/*

# Copy built app from builder stage
COPY --from=builder /app/dist/to-do-client /usr/share/nginx/html

# Copy custom nginx config (optional)
COPY to-do-client/nginx.conf /etc/nginx/nginx.conf

# Expose port 80
EXPOSE 80

COPY docker-entrypoint.sh /docker-entrypoint.sh
RUN chmod +x /docker-entrypoint.sh

# Use custom entrypoint to replace variables before starting nginx
ENTRYPOINT ["/docker-entrypoint.sh"]
CMD ["nginx", "-g", "daemon off;"]
