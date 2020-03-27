#!/bin/bash

set -f 
ssh -p 2222 centos@$PROD_SSH_IP "sudo su && forever stopall && pkill node && cd team-flex/backend && git reset --hard && git pull origin master && npm install && forever start index.js && cd ../frontend && npm install && forever start -c \"npm run start\" ./"