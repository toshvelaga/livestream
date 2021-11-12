#!/bin/bash

# Script for quick configuration of the livestreaming server on ec2

cd server
npm install
pm2 restart server.js
