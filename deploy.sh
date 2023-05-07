#!bin/sh

ssh -i ~/.ssh/fe-dev.pem ec2-user@43.201.26.253 "sh deploy.sh $1;"

