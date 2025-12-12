# Dockerfile for Next.js Portfolio Application

# Stage 1: Dependencies
FROM node:20-slim AS deps
WORKDIR /app

# Copy package files
COPY package.json package-lock.json* ./

# Install dependencies with retry mechanism and I/O error handling
# Using install instead of ci to be more resilient to I/O errors
RUN set -eux; \
    for i in 1 2 3; do \
        npm install --legacy-peer-deps --prefer-offline --no-audit && break || \
        (echo "Attempt $i failed, retrying..." && sleep 5); \
    done || \
    (echo "All installation attempts failed" && exit 1)

# Stage 2: Builder
FROM node:20-slim AS builder
WORKDIR /app

# Copy dependencies from deps stage
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Set environment variables for build
ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production

# Set API URL for build time (can be overridden at runtime)
# Use placeholder for build - will be replaced at runtime
ARG API_BASE_URL=http://api:8080
ARG NEXT_PUBLIC_API_BASE=http://localhost:8080
ENV API_BASE_URL=${API_BASE_URL}
ENV NEXT_PUBLIC_API_BASE=${NEXT_PUBLIC_API_BASE}

# Build the application
RUN npm run build

# Stage 3: Runner
FROM node:20-slim AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Create non-root user
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

# Copy necessary files from builder
COPY --from=builder /app/public ./public

# Copy standalone output
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

CMD ["node", "server.js"]

