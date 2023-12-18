#!/bin/bash
aws s3 cp s3://kiko-deployment-assests/dev-env/.env /home/ubuntu/kiko-backend/
#docker-compose -f /home/ubuntu/kiko-backend/docker-compose.yml down
docker-compose -f /home/ubuntu/kiko-backend/docker-compose.yml up -d --build
