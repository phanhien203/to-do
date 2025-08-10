FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy workspace root files
COPY ../package*.json ./
COPY ../nx.json ./
COPY ../tsconfig.base.json ./

# Install dependencies
RUN npm ci --legacy-peer-deps

# Copy all source
COPY .. .

# Build server
RUN npx nx build to-do-server

# Run server from built output
WORKDIR /app/dist/to-do-server

EXPOSE 3333

CMD ["node", "main.js"]
