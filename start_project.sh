#! /usr/bin/bash
echo "Building the docker image"
sudo docker build -t frontend .
echo "Done building the docker image, now moving on to starting a container"
sudo docker run \
  --log-driver=awslogs \
  --log-opt awslogs-region=us-east-1 \
  --log-opt awslogs-group=frontend_logs \
  -dp 3000:3000 \
    frontend