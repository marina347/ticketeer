docker build -t ticketeer-node .
docker run --env-file local.env -p3001:3001 ticketeer-node:latest
