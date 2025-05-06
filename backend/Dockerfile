# Use an official Node.js runtime as a parent image (Alpine for smaller size)
FROM node:20-alpine AS development

# Set the working directory in the container
WORKDIR /usr/src/app

# Install pnpm globally
RUN npm install -g pnpm@9 # Match your local pnpm major version if possible

# Copy package.json and pnpm-lock.yaml first to leverage Docker cache
COPY package.json pnpm-lock.yaml* ./

# Install app dependencies using pnpm
RUN pnpm install --frozen-lockfile --prod=false # Install devDependencies for build

# Copy the rest of the application code
COPY . .

# Build the NestJS application
RUN pnpm run build

# Production stage
FROM node:20-alpine AS production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

RUN npm install -g pnpm@9

COPY package.json pnpm-lock.yaml* ./
RUN pnpm install --frozen-lockfile --prod=true # Only production dependencies

COPY --from=development /usr/src/app/dist ./dist

# Expose the port the app runs on (should match docker-compose.yml and main.ts)
EXPOSE 3001

# Define the command to run the application
CMD ["node", "dist/main"]
