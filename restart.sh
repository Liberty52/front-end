#!bin/sh

if [ "auth" == "$1" ] ; then
   echo "Auth Restart!"

elif [ "product" == "$1" ]; then
  echo "Product Restart!"

elif [ "gateway" == "$1" ]; then
  echo "Product Restart!"
else
  echo "hello?"

fi