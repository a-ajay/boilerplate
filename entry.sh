#!/bin/bash
set -e

echo "Starting SSH ..."
service ssh start
cd /app
python pyfiles/start.py &
gramex --listen.port=80
