---
layout: post
title:  "Docker-based Personal Server: Owncloud"
date:   2016-02-19 12:47:18 -0700
categories: projects
---

This guide shows you how to configure a reproducible Owncloud deployment. The guide will extend the original post, [Docker-based personal server](), so make sure to complete that guide before moving on to this one.

## Docker Compose configuration

```yaml
owncloud:
  image: owncloud
  ports:
    - "8002:80"
  restart: always
  volumes:
    - ~/docker_volumes/owncloud/data:/var/www/html/data
    - ~/docker_volumes/owncloud/config:/var/www/html/config
  links:
    - owncloud_mysql:mysql

owncloud_mysql:
  image: mysql
  expose:
    - "3306"
  restart: always
  environment:
    MYSQL_DATABASE: owncloud
    MYSQL_USER: owncloud
    MYSQL_PASSWORD: password
    MYSQL_ROOT_PASSWORD: BFPTkyq8IRfP-random
  volumes:
    - ~/docker_volumes/owncloud_mysql:/var/lib/mysql
```

## Nginx configuration

## Configuring Owncloud

## Setting up the Owncloud client

#### Mac OS X
#### Android

## Setting up calendars/contacts/tasks

#### Mac OS X
#### Android

## Common Problems
