#!/bin/bash

# Script for quick configuration of the livestreaming on ec2

cd client
npm install 
npm run build

cd ..
cd server
npm install
pm2 restart server.js
