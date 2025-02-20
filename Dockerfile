# syntax=docker/dockerfile:1
FROM node:lts-alpine
WORKDIR /app

# Copy package files and install dependencies
COPY package.json package-lock.json ./
RUN npm ci 

# Copy the rest of the application
COPY . .

# Build the Next.js app
RUN npm run build

# Expose port 3000 (default for Next.js)
EXPOSE 3000

# Start Next.js in production mode
CMD ["npm", "run", "start"]
