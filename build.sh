#!/bin/sh
echo "npm run build"
npm run build

echo "docker build"
docker build -t $1 .

echo "docker push"
docker push $1