---
layout: post
title:  "Decentralized Storage"
date:   2019-08-01 12:47:18 -0700
categories: thoughts
---

Decentralized file storage has been an active area of research for the past 2 decades, with wide-ranging successes hearkening back to the early days of peer-to-peer file sharing on the Internet.
However, early systems were dogged with issues around 
[Sybil attacks](https://jhalderm.com/pub/papers/unvanish-ndss10-web.pdf) and [weak incentive schemes](http://bittyrant.cs.washington.edu/), because they typically assumed largely honest and altruistic behavior of participants.
Early approaches to defend from malicious actors used social networks to constrain communications to those you [trust](https://www.usenix.org/legacy/events/nsdi10/tech/full_papers/lesniewski-laas.pdf).

Bitcoin and the subsequent developments in cryptoeconomics has opened up new opportunities for designing decentralized storage schemes that are secure, fair, and highly-available.
In this blog post, we survey and compare 4 up-and-coming decentralized storage systems designed for file/blob storage over a wide-area network. 

*Disclaimer: At the time of writing, I am not currently invested nor developing any of these systems.*

## Methodology
 
- Whitepapers and public documentation
- Code review
- Simple experiments
- Interviews with authors

# Long-time Archival vs Contractual File Storage
 
- Goal
- Basic Approach
- Guarantees

# Project Overview

## Filecoin
**[Paper](https://filecoin.io/filecoin.pdf), [Code](https://github.com/filecoin-project/go-filecoin)**

[//]: # (Filecoin overview)
[//]: # (Filecoin architecture)
[//]: # (Filecoin life of a blob)
[//]: # (Filecoin incentives)

[Filecoin](https://filecoin.io/)

## SIA 
**[Paper](https://sia.tech/sia.pdf), [Code](https://gitlab.com/NebulousLabs/Sia)**

[//]: # (SIA overview)
[SIA](https://sia.tech/) provides a platform for users to upload files to a decentralized swarm of hosts. The application is marketed as both a cheaper alternative to AWS S3, as well as a solution for personal backups. Thus, it is distributed both as an all-in-one desktop GUI application, as well as a daemon, which can be incorporated into other applications like web services. 

[//]: # (SIA architecture)
All participants in the system participate in the Sia blockchain, which operates a proof-of-work consensus protocol, where the transaction format has been modified to support file contracts.
Renters and storage hosts enter file contracts together to register the intent for the host to store data of a particular size and content hash for the renter.
The blockchain is only used to coordinate file contracts, whereas the actual data is stored and transmitted off-chain.
Once formed, the host must regularly post storage proofs to the contract to demonstrate that it continues to hold the file.

[//]: # (SIA life of a blob)
When a renter uploads a file, the file is split into chunks and encrypted with keys only accessible to the user. The file can be hashed into a Merkle tree to verify the integrity of data retrieved later.
  
Renters can choose from the space of storage hosts to store its data, weighing factors such as proximity, version number, storage price, uptime, and storage availability.
The "renter" will form a file contract with chosen hosts, typically with 3 redundant copies for fault tolerance.
While the contract incentives hosts to store the file, hosts may still refuse to serve the data to the user.
Sia proposes the use of micropayment channels between renter and host, which the renter uses to pay download fees to the host.

TODOs:
- How does a client choose a storage host (in [gitlab](https://gitlab.com/NebulousLabs/Sia))?
- How are prices set?
- How much does do currently advertised prices reflect solid unit economics vs speculative token rewards?
- Is proof of replication a concern? Storage proofs are easily shared between colluding file replicas.

## Arweave
**[Paper](https://www.arweave.org/files/arweave-lightpaper.pdf), [Code](https://github.com/arweaveteam/arweave)**

[//]: # (Arweave overview)
[Arweave](https://www.arweave.org) has a broad goal of permanently archiving the Web. Users can either use a browser extension to archive web pages to the blockchain, or use a command-line tool to deploy static webpages. Once archived, 
users can access pages using the unique transaction ID.

[//]: # (Arweave architecture)
The Arweave blockchain uses a proof-of-work consensus protocol with some optimizations to support faster verification with the trade-off of weaker probabilistic guarantees of safety.
Transactions store the entirety of the webpage to be archived.

[//]: # (Arweave life of a blob)
When a user wants to archive a web page, the webpage is first packaged into a single blob by in-lining all subresources into the webpage.
The user then embeds the web page into a transaction and signs the transaction to be included in the blockchain.
Thus, users pay transaction fees to append webpages to the blockchains.
Reads off the blockchain are free, relying on the gossip network and local reputations.

TODO:
- Does Wildfire provide any notion of fairness? Under what conditions would content be unaccessible? (e.g. as compared to BitTorrent tit-for-tat) Nodes may only share with other active nodes in the system.
- Does Blockweave ensure availability? Under what conditions would data get lost? If there's full replication, that doesn't scale. If there isn't, how is routing done?

## Swarm
**[Paper](https://swarm-guide.readthedocs.io/en/latest/index.html), [Code](https://github.com/ethersphere/swarm)**

[//]: # (Swarm overview)
[Swarm](https://swarm.ethereum.org/)

[//]: # (Swarm architecture)

[//]: # (Swarm life of a blob)

[//]: # (Swarm incentives)
  
# Using the Storage System
  
Sia: Setup wallet, get coin, lock an allowance, setup file contracts, [reference](https://blog.sia.tech/a-guide-to-sia-ui-v1-4-0-7ec3dfcae35a)
Arweave: [archive](https://docs.arweave.org/info/archiving/archiving-web-pages), [deploy](https://docs.arweave.org/developers/tools/arweave-deploy)
Swarm:

## Storing a file
## Retrieving a file
## Ensuring file availability

# Providing Storage

Sia: [reference](https://blog.sia.tech/how-to-run-a-host-on-sia-2159ebc4725)

## Requirements
## Revenue Streams
## Legal Risk
Sia and Arweave support content blacklists
  
# Storage Guarantees & Possible Attacks
  SIA & Filecoin, Arweave, (Swarm)
  
# Reality Check

# Ecosystem
  Usage
  Forks
  Contributors

# Outlook
  Roadmap
  Anticipated behavior at large scale

Something about these systems are not appropriate for all use cases that require state persistence (e.g. real-time database workloads). Expect to see new storage classes supported in the future.

