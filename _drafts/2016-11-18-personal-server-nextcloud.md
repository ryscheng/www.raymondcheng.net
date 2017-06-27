---
layout: post
title:  "Personal Server: Nextcloud"
date:   2016-11-18 12:47:18 -0700
categories: projects
---
This guide shows you how to configure a reproducible Nextcloud service. The guide will extend the original post, [Docker-based personal server]({% post_url 2016-11-19-personal-server-overview %}), so make sure to complete that guide before moving on to this one.

## Docker Compose configuration

Add the following to your `docker-compose.yml` file

```yaml
services:
  nextcloud-db:
    image: mariadb
    environment:
      - MYSQL_DATABASE=nextcloud
      - MYSQL_USER=nextcloud
      - MYSQL_PASSWORD=!!!CHANGEPASSWORD!!!
      - MYSQL_ROOT_PASSWORD=!!!CHANGEPASSWORD!!!
    volumes:
      - ~/docker/nextcloud_mysql:/var/lib/mysql

  nextcloud:
    image: wonderfall/nextcloud
    depends_on:
      - nextcloud-db
    links:
      - nextcloud-db:nextcloud-db
    ports:
      - "8003:8888"
    environment:
      - UID=1000
      - GID=1000
      - UPLOAD_MAX_SIZE=10G
      - APC_SHM_SIZE=128M
      - OPCACHE_MEM_SIZE=128
      - REDIS_MAX_MEMORY=64mb
      - CRON_PERIOD=15m
      - TZ=America/Los_Angeles
      - ADMIN_USER=admin
      - ADMIN_PASSWORD=!!!CHANGEPASSWORD!!!
      - DB_TYPE=mysql
      - DB_NAME=nextcloud
      - DB_USER=nextcloud
      - DB_HOST=nextcloud-db
      - DB_PASSWORD=!!!CHANGEPASSWORD!!!
    volumes:
      - ~/docker/nextcloud/data:/data
      - ~/docker/nextcloud/config:/config
      - ~/docker/nextcloud/apps:/apps2
```

## Nginx configuration

## Configuring Nextcloud

## Setting up the Nextcloud client

#### Mac OS X
#### Android

## Setting up calendars/contacts/tasks

#### Mac OS X
#### Android

## Common Problems
