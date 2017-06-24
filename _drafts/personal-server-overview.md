---
layout: post
title:  "Docker-based Personal Server"
date:   2016-11-19 12:47:18 -0700
categories: projects
---

In this blog post, I'll show you how to configure a Docker-based personal server, running each service in a separate Docker container. Modern devops tools have made it easier than ever to run your own server and for anyone with basic familiarity with Linux, it's worth a try.

#### Goals
- **Replicable**: If you want to move to a new server, you should be up and running with little effort.
- **Simple backups**: It should be as easy as a single `rsync` to back up all important state.
- **Secure**: All connections to my server should be over secure channels (e.g. TLS or SSH).
- **Low maintenance**: Aside from making sure the machine stays on and periodic software updates, there should be little to no maintenance.

---

## Table of Contents
- [Why Run Your Own Server?](#why-run-your-own-server)
- [Overview](#overview) 
- [Prerequisites](#step-1-prerequisites)
- [Domain Name](#step-2-domain-name)
- [Docker Compose](#step-3-docker-compose)
- [Nginx and SSL Certificates](#step-4-nginx-and-ssl-certificates)
- [Firewall](#step-5-firewall)
- [Gitlab-specific Configuration](#step-6-gitlab-specific-configuration)
- [Data Backup](#data-backup)
- [Updating Docker Images](#updating-docker-images)
- [More Services](#more-services)

---

## Why Run Your Own Server?

**Cost**: Most web apps will charge you an arm and a leg if you go past the free tier of their service. When you want to manage terabytes of data on a Dropbox-like interface across all your devices, Nextcloud is the best way to go.

**Visibility**: By running free and open source software on your own hardware, you can read the code, monitor its behavior, and see what is going on inside and out the application.

**Customizable**: You can run whatever you want on your server. Leverage this freedom to automate common tasks, integrate with other applications, and extend application functionality.

**Control**: Keep your data on your own hardware and directly control who has access to see it.

Docker images are now available for a wide-variety of server applications. A small sample:

- [Nextcloud](https://hub.docker.com/_/nextcloud/) instead of Dropbox/Google Drive/OneDrive
  - also supports syncing calendars, contacts, and tasks
- [Gitlab](https://hub.docker.com/r/gitlab/gitlab-ce/) instead of GitHub/Bitbucket
- [OpenVPN](https://hub.docker.com/r/kylemanna/openvpn/) is a VPN server
- [Iodine](https://hub.docker.com/r/ryscheng/docker-iodine/) helps you tunnel out of restricted networks.
- [Mailpile](https://www.mailpile.is/) is a searchable e-mail client.
- [Mattermost](https://hub.docker.com/r/mattermost/platform/) is a chat server with functionality similar to Slack.
- [ShareLaTeX](https://hub.docker.com/r/sharelatex/sharelatex/) for collaborative real-time LaTeX editing
- [Piwik](https://hub.docker.com/_/piwik/) instead of Google Analytics
- [Home Assistant](https://hub.docker.com/r/homeassistant/home-assistant/) for home automation

Check out [More Services](#more-services) for setting up specific applications.

---

## Overview
![Architecture](/img/diagrams/personal-server-architecture.png)

[Docker](https://www.docker.com/what-docker) makes it trivially easy to package an application with all of its dependencies in a standardized unit that runs in an isolated Linux container. For basic tutorials on how to use it, Docker maintains excellent documentation [here](https://docs.docker.com/).

Our strategy is threefold:

**Docker Compose to declare services**
[Docker Compose](https://docs.docker.com/compose/) allows you to declaratively specify a set of services that you want to run on your Docker engine. Then, starting all of your services is as easy as `docker-compose up`, which will also download any missing Docker images from [Docker Hub](https://hub.docker.com/).

**Store persistent state in Docker volumes**
[Docker volumes](https://docs.docker.com/engine/userguide/dockervolumes/) allow you to mount a local directory into the Docker container. For example, you may want to store the data from a MySQL database (*/var/lib/mysql*) locally. Docker volumes can then easily be backed up and restored on a new machine.

**Routing with wildcard DNS and TLS**
In order to make our Docker-ized services securely accessible from subdomains (e.g. https://owncloud.example.com), we'll set up wildcard DNS entries to point to the server and configure an Nginx reverse proxy to route requests to the proper container.

---

## Step 1: Prerequisites
This guide will assume you know how to setup a Linux machine with a public IP address. You can rent a virtual machine from any cloud provider, use a desktop at home, or buy a dedicated device like the Raspberry Pi.

The only prerequisites that need to be installed are:
- [Nginx](https://www.nginx.com/resources/wiki/start/topics/tutorials/install/)
- [Docker Engine](https://docs.docker.com/engine/installation/)
- [Docker Compose](https://docs.docker.com/compose/install/)

On Ubuntu, you may type the following commands. If the versions are not high enough, follow the installation guides above

```bash
$ sudo apt-get install nginx docker.io docker-compose
```

---

## Step 2: Domain Name

You'll need a domain name that points to your server. In my example, I'll set `*.raymondcheng.net` to point to the same machine. 

![DNS record for \*.raymondcheng.net](/img/diagrams/personal-server-wildcard-dns.png)

Verify that DNS queries are properly returning the address

```bash
$ dig gitlab.raymondcheng.net
; <<>> DiG 9.8 <<>> gitlab.raymondcheng.net
;; global options: +cmd
;; Got answer:
;; ->>HEADER<<- opcode: QUERY, status: NOERROR, id: 14132
;; flags: qr rd ra; QUERY: 1, ANSWER: 1, AUTHORITY: 0, ADDITIONAL: 0

;; QUESTION SECTION:
;gitlab.raymondcheng.net IN A

;; ANSWER SECTION:
gitlab.raymondcheng.net 3600 IN A 10.11.12.13

;; Query time: 60 msec
;; SERVER: 8.8.8.8#53(8.8.8.8)
;; WHEN: Fri Nov 18 17:02:20 2016
;; MSG SIZE  rcvd: 91
```

---

## Step 3: Docker Compose

First create a `docker-compose.yml` file, where we will configure all of the services we want to run. For example to run a Gitlab service, use the following:

```yml
version: "2"
services:
  gitlab:
    image: gitlab/gitlab-ce
    hostname: gitlab.raymondcheng.net
    ports:
      - 8004:80
      - 2224:22
    volumes:
      - ~/docker/gitlab/config:/etc/gitlab
      - ~/docker/gitlab/logs:/var/log/gitlab
      - ~/docker/gitlab/data:/var/opt/gitlab
```

Additional services can be added to the bottom of the file, making sure to indent properly under `services:`. Let's go over what each line is doing:

```yml
version: "2"
services:
```
Initialize the file, using version 2 syntax. All services are listed under `services:`.

```yml
  gitlab:
    image: gitlab/gitlab-ce
    hostname: gitlab.raymondcheng.net
```
Create a service named `gitlab`, using the Docker image `gitlab/gitlab-ce`. The Gitlab image requires `hostname` be set for configuration.

```yml
    ports:
      - 8004:80
      - 2224:22
    volumes:
      - ~/docker/gitlab/config:/etc/gitlab
      - ~/docker/gitlab/logs:/var/log/gitlab
      - ~/docker/gitlab/data:/var/opt/gitlab
```
These are parameters you'll need to set for every service you enable. Ports define port forwarding rules from your host computer to the container. Gitlab by default has internal ports 80 and 22 for the web service and SSH, respectively. These rules expose the ports to 8004 and 2224 on the host computer respectively. As such, you should be able to access the service at [http://localhost:8004](http://localhost:8004). Eventually, we will block access to 8004 in [Step 5: Firewall](#step-5-firewall). Similarly, the Gitlab SSH service is accessible at tcp://localhost:2224.

We also configure Docker volumes to store all Gitlab related state to a folder on the host computer. In the example, the **configurations** can be found in `~/docker/gitlab/config`, the **logs** in `~/docker/gitlab/logs`, and the **data** in `~/docker/gitlab/data`. These folders are mapped into the container at the specified paths.

Finally, start the services:
 
```bash
$ docker-compose -f docker-compose.yml up
```
In order to access this over an SSH connection, it may be helpful to run `docker-compose` in a [tmux](http://blog.hawkhost.com/2010/06/28/tmux-the-terminal-multiplexer/) session.

The services can be stopped with the corresponding command:

```bash
$ docker-compose down
```

---

## Step 4: Nginx and SSL Certificates

[3](https://letsecure.me/secure-web-deployment-with-lets-encrypt-and-nginx/)
[Let's Encrypt](https://vincent.composieux.fr/article/install-configure-and-automatically-renew-let-s-encrypt-ssl-certificate)
[Commercial CA](https://www.digitalocean.com/community/tutorials/how-to-install-an-ssl-certificate-from-a-commercial-certificate-authority)

---

## Step 5: Firewall

---

## Step 6: Gitlab-specific Configuration

---

## Data Backup
Because all important files from the Docker containers are stored a local directory, you can easily back up this folder using any backup tool, such as `rsync`. For example, if you stored all your Docker volumes in `/docker`:

```bash
$ rsync --delete -avz -e ssh /docker [USER@]HOST:DEST
```

If you ever replace your machine or hard drive, simply copy this directory back to your new hard drive and relaunch your `docker-compose` configuration.

---

## Updating Docker Images
In order to update a single application, stop `docker-compose` and pull the latest image from Docker Hub:

```bash
$ docker-compose down
$ docker pull NAME[:TAG]
```

If you want to delete all containers and images from your system, run the following. The next time you run `docker-compose up`, it will pull the latest from Docker Hub.

```bash
# Delete all containers
$ docker rm $(docker ps -a -q)
# Delete all images
$ docker rmi $(docker images -q)
# Delete all dangling images
$ docker rmi $(docker images -q -f dangling=true)
```

---

## More Services
Check out the following application-specific guides for setting up 

- [Owncloud]()
- [Gitlab]()
- [OpenVPN]()
- [Iodine]()

---

## Final Thoughts
In the 90's and early 2000's, I maintained a very opinionated server setup. But for anyone that has ever tried to maintain an email or chat server, you'll know just how much of a pain of an ass it was back then. I'm really excited to see open source projects like Gitlab, Nextcloud, and Signal mature into usable products that compete with their centralized proprietary counterparts. For at least the data that is most prized to me (my files, contacts, calendar, code, and messages), I've been using free and open source software on my own hardware and I haven't looked back since.

Here are some other guides that cover similar topics:
- [Using docker at home](https://outcoldman.com/en/archive/2015/03/18/docker-for-home-server/)
- [Docker with Owncloud](http://www.linux-magazine.com/Issues/2014/168/Docker-with-OwnCloud/)
