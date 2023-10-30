FROM oven/bun:latest

RUN apt-get update -y && apt-get install -y openssl

WORKDIR /app

COPY --from=node:20-slim /usr/local/bin/node /usr/local/bin/node

COPY . .

RUN bun install

RUN bun prisma generate

EXPOSE 5000

