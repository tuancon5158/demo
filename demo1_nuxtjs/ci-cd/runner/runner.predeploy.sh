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
    echo "Step 1: Backup build folder"
    rsync -rahq --delete dist/ tmp/dist_old/
    rsync -rahq --delete .nuxt/ tmp/.nuxt_old/
    rsync -rahq --delete node_modules/ tmp/node_modules_old/
    rsync -rahq --delete static/sw.js tmp/sw.js_old
EOT
