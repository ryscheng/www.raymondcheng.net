---
layout: post
title:  "A Survey of Untrusted Storage Mechanisms"
date:   2015-11-19 12:47:18 -0700
categories: research
---

A number of research projects and real products have tried to answer the question: how do we use cloud storage, without trusting the cloud service? However, trust is inherently multi-faceted and we found that most projects only provided limited guarantees. In this blog post, we'll survey and compare how existing storage systems and research deal with trust.

## What do we mean by "trust"?

In most distributed storage systems, we can break down the parties into 3 major parties:
- *Storage service* - persists data on behalf of clients
- *Network operator* - connects clients to the storage service
- *Clients*
In this blog post, we will take the role of a client that wants to use the storage service. However, we may not trust the storage service, the network operator, or other clients.

![Cloud](/img/diagrams/cloud.png)

Here are some high-level questions that we should ask about the storage protocol:

**Data Confidentiality**:
- Does the storage service or network have the ability to read the contents of my data?
- Can I control which other clients have access to my data?

**Access Confidentiality**:
- Can the server see that 2 users are communicating or sharing data?
- Can the server see how much I am using the service? (e.g. data transferred)
- Can the server see when I am active or inactive?
- Can an adversary infer what I am interested in or properties of the data from access patterns?

**Integrity / Consistency**:
- When a user writes a data block, will they get it back on a data fetch?
- Do a group of users with shared access to common data have a consistent view of the data or the ability to detect inconsistency?
- Do other clients have the ability to deny you service?

**Other concerns**:
- What is the cost of an operation?
- How well does the technique scale? (e.g. with size of the database, number of users, number of servers)?
- Is the technique feasible today? If not, what features do the storage provider need to provide to make it possible?

*Out of Scope*:
- Side channel attacks on the client
- Malware on the client
- Safety of cryptographic primitives




Research Systems:
  threat model, cost, performance, scale,
CryptDB
SUNDR
Depot
SPORC
Frientegrity
Mylar
Metasync
Vuvuzela


## Key Techniques:

**Public Key Encryption**
**Fork consistency**
Hash trees
**DC-Nets**
**Cryptographic shuffles**
**ORAM**


Products:
https://blog.torproject.org/blog/tor-messenger-beta-chat-over-tor-easily
TextSecure

