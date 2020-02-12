#!/bin/bash

set -f 
ssh -p 2222 centos@$PROD_SSH_IP "forever stopall && cd team-flex && git pull origin master"