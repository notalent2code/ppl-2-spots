# Cache build
FROM oven/bun:1.0.11 AS cache

WORKDIR /app

COPY package.json bun.lockb ./

RUN bun install

# Final build
FROM oven/bun:1.0.11 AS final

RUN apt-get update -y && apt-get install -y openssl

WORKDIR /app

COPY --from=node:20-slim /usr/local/bin/node /usr/local/bin/node
COPY --from=cache /app/node_modules ./node_modules
COPY . .

RUN bunx prisma generate

EXPOSE 5000