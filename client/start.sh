#!/bin/bash

docker build -t ticketeer-client .
docker run --env-file local.env -p3000:3000 -it ticketeer-client:latest