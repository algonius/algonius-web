# Build stage
FROM node:23.7.0-alpine AS builder
WORKDIR /app
COPY package*.json ./
COPY vite.config.ts .
COPY tailwind.config.ts .
COPY postcss.config.js .

# Install dependencies
RUN yarn install

# Build the app
COPY . .
RUN yarn build

# Runtime stage
FROM nginx:alpine
WORKDIR /usr/share/nginx/html

# Copy built assets from builder
COPY --from=builder /app/dist .
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port and start server
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]