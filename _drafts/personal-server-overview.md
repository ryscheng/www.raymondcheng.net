---
layout: post
title:  "Docker-based Personal Server"
date:   2015-11-19 12:47:18 -0700
categories: projects
---

In this blog post, I'll show you how to configure a Docker-based personal server, running each service in a separate Docker container. This guide has the following goals:

- **Replicable**: If I want to move to a new server, I should be up and running with little effort.
- **Simple backups**: It should be as easy as a single `rsync` to back up all important state.
- **Secure**: All connections to my server should be over secure channels (e.g. TLS or SSH).
- **Isolated**: The services should not conflict with other uses for the server (e.g. using the machine as a workstation).
- **Low maintenance**: Aside from making sure the machine stays on and periodic software updates, there should be little to no maintenance.

The point is that modern tools have made it easier than ever to run your own server and for anyone with basic familiarity with Linux, it's worth a try.

## Why run your own server?

**Cost**: Most web apps will charge you an arm and a leg if you go past the free tier of their service. When you want to manage terabytes of data on a Dropbox-like interface across all your devices, Owncloud is the best way to go.

**Visibility**: By running free and open source software on your own hardware, you can read the code, monitor its behavior, and see what is going on inside and out the application.

**Customizable**: You can run whatever you want on your server. Leverage this freedom to automate common tasks, integrate with other applications, and extend application functionality.

**Confidentiality**: Keep your data on your own hardware and directly control who has access to see it.

<!--
Being in control of your data is not just for privacy advocates. It's for businesses that need confidentiality. It's for tinkerers that want to add features. It's for everyday users who are tired of having their data sold, analyzed, stolen, and given to governments and generally used without notice or permission by companies of varying trustworthiness. For more arguments on the value of privacy, see [1](https://www.schneier.com/blog/archives/2006/05/the_value_of_pr.html), [2](http://chronicle.com/article/Why-Privacy-Matters-Even-if/127461/), and [3](https://robindoherty.com/2016/01/06/nothing-to-hide.html).
-->
When it's easy, low maintenance, and there are a wide variety of mature applications to use, why not? Docker images are now available for a wide-variety of server applications. A small sample:

- [Owncloud](https://hub.docker.com/_/owncloud/) instead of Dropbox/Google Drive/OneDrive
  - also supports syncing calendars, contacts, and tasks
- [Gitlab](https://hub.docker.com/r/gitlab/gitlab-ce/) instead of GitHub/Bitbucket
- [OpenVPN](https://hub.docker.com/r/kylemanna/openvpn/) is a free VPN server
- [Iodine](https://hub.docker.com/r/ryscheng/docker-iodine/) helps you tunnel out of restricted networks.
- [Mailpile](https://www.mailpile.is/) is an e-mail client, server, and search engine.
- [Mattermost](https://hub.docker.com/r/mattermost/platform/) is a chat server with functionality similar to Slack.

Check out [What next?](#what-next) for setting up specific applications.

## Overview
![Architecture](/img/diagrams/personal-server-architecture.png)

[Docker](https://www.docker.com/what-docker) makes it trivially easy to package an application with all of its dependencies in a standardized unit that runs in an isolated Linux container. For basic tutorials on how to use it, Docker maintains excellent documentation [here](https://docs.docker.com/linux/).

Our strategy is threefold:

**Docker Compose to declare services**
[Docker Compose](https://docs.docker.com/compose/) allows you to declaratively specify a set of services that you want to run on your Docker engine. Then, starting all of your services is as easy as `docker-compose up`,which will also download any missing Docker images from [Docker Hub](https://hub.docker.com/).

**Store persistent state in Docker volumes**
[Docker volumes](https://docs.docker.com/engine/userguide/dockervolumes/) allow you to mount a local directory into the Docker container. For example, you may want to store the data from a MySQL database (*/var/lib/mysql*) locally. Docker volumes can then easily be backed up and restored on a new machine.

**Routing with wildcard DNS and TLS**
In order to make our Docker-ized services securely accessible from subdomains (e.g. https://owncloud.example.com), we'll set up wildcard DNS entries to point to the server and configure an Nginx reverse proxy to route requests to the proper container.

## Prerequisites
This guide will assume you know how to setup a Linux machine with a public IP address. You can rent a virtual machine from any cloud provider, use a desktop at home, or buy a dedicated device like the Raspberry Pi.

The only prerequisites that need to be installed are:
- [Nginx](https://www.nginx.com/resources/wiki/start/topics/tutorials/install/)
- [Docker Engine](https://docs.docker.com/engine/installation/)
- [Docker Compose](https://docs.docker.com/compose/install/)

On Ubuntu, you may type the following commands.
If the versions are not high enough, follow the installation guides above

```
sudo apt-get install nginx docker.io docker-compose
```

## Domain and TLS Certifications

[Let's Encrypt](https://vincent.composieux.fr/article/install-configure-and-automatically-renew-let-s-encrypt-ssl-certificate)

## Nginx

## Docker Compose

In order to access this over an SSH connection, it may be helpful to run docker-compose in a [TMUX](http://blog.hawkhost.com/2010/06/28/tmux-the-terminal-multiplexer/) session.

## Backup
Because all important files from the Docker containers are stored a local directory, you can easily back up this folder using any backup tool, such as `rsync`. For example, if you stored all your Docker volumes in `/docker`:

```bash
rsync -avz -e ssh /docker [USER@]HOST:DEST
```

If you ever replace your machine or hard drive, simply copy this directory back to your new hard drive and relaunch your docker script.

## Updating Docker images
In order to update a single application, stop `docker-compose` and pull the latest image from Docker Hub:

```
docker pull NAME[:TAG]
```

If you want to delete all containers and images from your system, run the following. The next time you run `docker-compose up`, it will pull the latest from Docker Hub.

```bash
#!/bin/bash
# Delete all containers
docker rm $(docker ps -a -q)
# Delete all images
docker rmi $(docker images -q)
# Delete all dangling images
docker rmi $(docker images -q -f dangling=true)
```

## What next?
Check out the following application-specific guides for setting up 

- [Owncloud]()
- [Gitlab]()
- [OpenVPN]()
- [Iodine]()

## A bit of commentary
In the 90's and early 2000's, I maintained a very opinionated server setup. But for anyone that has ever tried to maintain an email or chat server, you'll know just how much of a pain of an ass it was. Besides the initial trouble of setting it up, you had to keep it running, back up the data, and replicate your setup when you inevitably bought new computers. In the end, the costs outweighed the benefits enough for me and like many others, I went full Google for email, calendar, contacts, and files. Some of the most staunch advocates for digital privacy that I know still trust web companies with nearly all of their data. 

I'm really excited to see free and open source projects like Gitlab, ownCloud, and Signal mature into usable products that compete with their centralized proprietary counterparts. For at least the data that is most prized to me (my files, contacts, calendar, code, and messages), I've been using free and open source software on my own hardware and I haven't looked back since. This guide series is for all of you who want to reclaim your data and have some familiarity with UNIX.

