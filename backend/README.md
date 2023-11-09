# Spots REST API

## Docker setup

```bash
# build docker image
docker build -t rihlan24/backend-spots .
```

```bash
# push docker image
docker push rihlan24/backend-spots
```

```bash
# pull docker image
docker pull rihlan24/backend-spots
```

```bash
# start docker container
docker compose up -d
```

```bash
# remove docker container
docker compose rm -s -f
```

```bash
# backup postgres database
docker exec -t db pg_dumpall -c -U postgres > dump_spots_`date +%d-%m-%Y"_"%H_%M_%S`.sql
```

```bash
# restore postgres database
cat dump_file_name.sql | docker exec -i db psql -U postgres
```

## Install dependencies

```bash
bun install
```

## Run the app

```bash
bun run index.js
```

This project was created using `bun init` in bun v1.0.5. [Bun](https://bun.sh) is a fast all-in-one JavaScript runtime.
