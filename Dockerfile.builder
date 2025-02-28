FROM node:lts-alpine AS builder

# Install su-exec
RUN apk add --no-cache su-exec

# Set working directory
WORKDIR /app

# Copy package files and install dependencies (leveraging cache)
COPY package.json package-lock.json ./
RUN npm ci

# Copy the rest of the application
COPY . .

# Ensure environment variables are included
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}
ARG NEXT_PUBLIC_BACKEND_API
ENV NEXT_PUBLIC_BACKEND_API=${NEXT_PUBLIC_BACKEND_API}

# Build the Next.js app
RUN npm run build
