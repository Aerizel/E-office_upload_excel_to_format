# syntax=docker/dockerfile:1
FROM node:lts-alpine

# Set working directory
WORKDIR /app

# Copy package files and install dependencies (leveraging cache)
COPY package.json package-lock.json ./
RUN npm ci

# Copy the rest of the application (after dependencies are installed)
COPY . .

# Ensure environment variables are included (if needed)
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

# Build the Next.js app
RUN npm run build

# Use a non-root user for security
USER node

# Expose port 3000 (Next.js default)
EXPOSE 3000

# Start the application
CMD ["npm", "run", "start"]
