# Stage 1: Install dependencies and build the application
FROM node:20-alpine AS builder

WORKDIR /usr/src/app

# Install pnpm
RUN npm install -g pnpm@9

# Copy package.json and pnpm-lock.yaml
COPY package.json pnpm-lock.yaml* ./

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy the rest of the application code
COPY . .

# Build the Next.js application
RUN pnpm run build

# Stage 2: Production image
FROM node:20-alpine AS production

WORKDIR /usr/src/app

# Set environment to production
ENV NODE_ENV production

# Install pnpm (needed for `pnpm start` if it relies on pnpm)
# Or copy only necessary production files from the builder stage
RUN npm install -g pnpm@9

COPY package.json ./
COPY pnpm-lock.yaml* ./

# If you have production-only dependencies, you might uncomment and adjust the next line
RUN pnpm install --frozen-lockfile --prod

# Copy built assets from the builder stage
# COPY --from=builder /usr/src/app/package.json ./package.json # Next.js needs package.json to run
COPY --from=builder /usr/src/app/.next ./.next
# COPY --from=builder /usr/src/app/public ./public # If you have a public folder

# Expose the port Next.js runs on
EXPOSE 3000

# Command to run the Next.js application
# Ensure your package.json has a "start": "next start" script
CMD ["pnpm", "start"]
