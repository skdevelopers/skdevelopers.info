# syntax=docker/dockerfile:1
FROM node:22-alpine AS builder
WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm install --no-audit --no-fund

COPY . .
RUN npm run build

FROM node:22-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3000

# Create non-root user for hardened execution
RUN addgroup -g 1001 -S skgroup && adduser -S skuser -u 1001 -G skgroup

COPY --from=builder --chown=skuser:skgroup /app/package.json ./package.json
COPY --from=builder --chown=skuser:skgroup /app/node_modules ./node_modules
COPY --from=builder --chown=skuser:skgroup /app/dist ./dist
COPY --from=builder --chown=skuser:skgroup /app/server.ts ./server.ts
COPY --from=builder --chown=skuser:skgroup /app/src ./src
COPY --from=builder --chown=skuser:skgroup /app/tsconfig.json ./tsconfig.json

USER 1001
EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD wget -qO- http://127.0.0.1:3000/api/health || exit 1

CMD ["npx", "tsx", "server.ts"]
