#!/bin/sh
echo "npm run build"
npm run build

echo "docker build"
docker build -t kgh2120/web .

echo "docker push"
docker push kgh2120/web