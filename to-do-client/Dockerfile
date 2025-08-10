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

# Inject build-time variables (optional but recommended)
ARG NX_PUBLIC_BASE_URL

ENV NX_PUBLIC_BASE_URL=$NX_PUBLIC_BASE_URL

# Build React app
RUN npx nx build to-do-client --prod && ls -R /app/dist

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

# Inject environment variables at runtime
RUN echo '#!/bin/sh' > /docker-entrypoint.sh && \
    echo 'envsubst < /usr/share/nginx/html/index.html > /tmp/index.html && mv /tmp/index.html /usr/share/nginx/html/index.html' >> /docker-entrypoint.sh && \
    echo 'exec "$@"' >> /docker-entrypoint.sh && \
    chmod +x /docker-entrypoint.sh

# Expose port 80
EXPOSE 80

# Use custom entrypoint to replace variables before starting nginx
ENTRYPOINT ["/docker-entrypoint.sh"]
CMD ["nginx", "-g", "daemon off;"]
