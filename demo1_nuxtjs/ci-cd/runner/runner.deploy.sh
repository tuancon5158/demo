#!/bin/bash

# Stop script when error
set -e;

DEPLOY_HOST=$1
DEPLOY_PORT=$2
PROJECT_LOCATION=$3

# Deploy via ssh
ssh $DEPLOY_HOST -p $DEPLOY_PORT <<EOT
    set -e;
    cd $PROJECT_LOCATION;

    echo "Step 1: Get new all code from git"
    git fetch;
    git reset --hard $CI_BUILD_REF;

    echo "Step 2: rsync build dir to root"
    rsync -rahq --delete tmp/dist/ dist/
    rsync -rahq --delete tmp/.nuxt/ .nuxt/
    rsync -rahq --delete tmp/node_modules/ node_modules/
    rsync -rahq --delete tmp/sw.js static/sw.js

    echo "Step 3: reload pm2";
    source ~/.nvm/nvm.sh;
    pm2 reload ecosystem.config.js;
EOT
