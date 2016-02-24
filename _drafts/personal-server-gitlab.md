---
layout: post
title:  "Docker-based Personal Server: Gitlab"
date:   2016-02-19 12:47:18 -0700
categories: projects
---

This guide shows you how to configure a reproducible Owncloud deployment. The guide will extend the original post, [Docker-based personal server](), so make sure to complete that guide before moving on to this one.

## Docker Compose configuration
```yaml
gitlab:
  image: gitlab/gitlab-ce
  ports:
    - "8004:80"
    - "2224:22"
  restart: always
  hostname: gitlab.s.sally.wtf
  volumes:
    - ~/docker_volumes/gitlab/config:/etc/gitlab
    - ~/docker_volumes/gitlab/logs:var/log/gitlab
    - ~/docker_volumes/gitlab/data:/var/opt/gitlab
```
## Nginx configuration

## Configuring Gitlab

## Setting up Gitlab keys

## Backup

## Common Problems
