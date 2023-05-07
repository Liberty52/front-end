#!bis/sh

echo "start build"

sh build.sh $1

echo "start deploy"

sh deploy.sh $1