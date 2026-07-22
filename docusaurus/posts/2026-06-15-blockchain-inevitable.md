---
slug: blockchain-inevitable
title: Blockchain is Inevitable
description: "Revolutionize the data industry with open source principles"
authors: [ryscheng]
tags: [popular, thoughts, decentralization]
---

Since the 2017 ICO boom, the crypto industry has navigated countless hype cycles and narratives. Through it all, my conviction in one core thesis has only strengthened: **Blockchain is inevitable.**

<!-- truncate -->

This isn't a statement about a particular crypto asset, digital token, or network. I believe this to be true for one simple reason: these are **Byzantine Fault Tolerant (BFT)** systems.

In other words, these are systems designed to behave reliably and exactly as you'd expect, even if individual servers, nodes, or participants are malicious, lying, or acting arbitrarily. This design principle makes them incredibly robust. They are the "cockroach systems" of the digital world.

We as a society have yet to fully reconcile with the fact that we have now built digital systems that can never truly go away.

That fact has ramifications: first for the crypto industry, then for the broader tech industry, and finally for the world at large.

First, a foundation. What is a Byzantine Fault Tolerant system, and where did it come from?

## Understanding the "Why": What is Byzantine Fault Tolerance?

At the heart of computer science is a field called distributed systems, and at the heart of that field is the concept of **fault tolerance**.

Machines are inherently faulty. Devices fail, power gets shut off, memory chips get corrupted, and natural disasters happen. Despite all of this, we want to build global-scale services that remain reliable over a network. This fundamental property is what drives the entire cloud computing industry and is at the heart of modern data center design. It's what allows us to take the infinite scale of modern software for granted.

### From Crash Faults to Malicious Actors

Most systems we rely on today, like Google Docs or Gmail, are built on **crash-fault** assumptions. This basically means we believe the worst thing that can happen to a server is that it can crash and fail. We generally assume that systems will behave honestly and won't lie to you.

When you use a service like Google Docs, your data isn't stored in just one data center; it's stored in many different data centers all over the world. A famous protocol called Paxos (a type of "consensus protocol") acts like a high-frequency voting system. It allows these data centers to come to an agreement (consensus) on the current state of your document, storing it in a highly replicated, fault-tolerant way so it can recover from any single data center failure. These protocols are called “consensus protocols” and they already form the resilient data foundation of many global applications that we use today.

### The Byzantine General's Problem

Years ago, computer scientists, most notably Turing Award winner Leslie Lamport, started asking a critical question: what happens if these machines start acting adversarially and actually lie to you?

What if a machine in one data center starts advertising that the state of your document is something other than what it actually is? This is known as the "Byzantine General's Problem."

Over the next few decades, scientists created more reliable and practical BFT protocols. What was once an impractical theoretical result became an actual system that could be built. But for a long time, there remained a critical adoption problem. Most cloud providers and scientists derided this body of work, asking, "Why would we ever assume that our own cloud servers are untrustworthy?"

For many years, these protocols saw little use outside of niche applications, like satellites, where cosmic radiation could flip bits in memory and cause a system to act erroneously.

## The Catalyst: Bitcoin and the BFT Boom

Then came Bitcoin.

In a post-financial crisis world, there was suddenly a massive interest in building a decentralized, peer-to-peer system that could behave correctly *even if* a fraction of the network was acting maliciously. We were seeing, in real-time, a cratering of trust in centralized institutions.

This coincided with an acceleration of sophisticated hackers, some state-sponsored, who find ways to steal credentials of insiders to install malicious software on critical infrastructure. Increasingly, we are finding we do need to build systems that are resilient, even if insiders are untrustworthy.

Fast forward to today, and there are countless blockchain networks in operation, providing financial ledgers or computation frameworks that are reliable, robust, and truly global.

The core assumption of many of these systems is different. Instead of assuming that all servers are 100% honest, we assume that only a certain threshold (e.g. ⅔ or ½, depending on the protocol) will behave honestly, and we use financial incentives to keep them from behaving maliciously.

These systems are designed to withstand a significantly more sophisticated threat model, and we now have nearly two decades of production operation giving us significant confidence in their design.

## Cloud vs. Blockchain: What's the Real Difference?

What is the fundamental difference between a replicated database in the cloud and a modern blockchain? Surprisingly, less than you would think.

At their root, both are **replicated state machines** that rely on a distributed consensus protocol, where many machines agree on a ledger of operations.

The three major differences are:

1. **Fault Model:** The cloud primarily uses Crash Fault Tolerant (CFT) protocols. Blockchains use Byzantine Fault Tolerant (BFT) protocols.  
2. **Access Control:** The cloud is "permissioned." A central operator (like Google, AWS, or Microsoft) controls who can run servers. Blockchains are typically "permissionless." Anybody on the internet can join, which is precisely *why* they must assume participants could be malicious.  
3. **Application Pattern:** This is currently different (databases vs. smart contracts), but this is an arbitrary design choice. We could build databases on BFT systems, and we could build smart contract platforms on CFT systems.

## What this means for crypto

For crypto, the BFT foundation means that applications built on blockchains, like tokenized assets, are never going to go away. As long as there is a group of honest (or semi-honest) operators in the world willing to run the network, the network will exist.

You can't control the *market value* of an asset, that will be driven by supply and demand. But you cannot, by definition, ban these assets from *existence*. You can only cut off *access*.

A regulator could, for example, target the on-ramps and off-ramps (the exchanges that convert fiat currency to cryptocurrency). But once you are in the system and you hold a crypto asset, as long as you have eventual access to the network, there is very little anyone can do. This property is what makes self-custody on these systems such a powerful primitive.

## The broader tech industry is next

I don't expect everyone to build everything on-chain tomorrow. But we are already starting to see companies move critical functions on-chain when they demand high reliability and global access. For example, Stripe is increasingly using stablecoins for international payment rails.

As the world moves more functions to the cloud, we have created the greatest honeypots in history. These are centralized locations of data and power, which makes them increasingly attractive targets for attack.

We are seeing sophisticated attacks, including foreign nation-states placing malicious employees inside tech companies to covertly steal information or place malware. I only anticipate these types of attacks will increase in sophistication.

We will increasingly need to rely on digital systems to provide guarantees that we are unable or unwilling to trust humans to provide.

## Digital institutions for a low-trust world

We are at an interesting point in time, marked by a waning of collective trust in centralized, human-based institutions.

Most cloud systems rely on a fundamental trust that:

1. The engineers and executives at these corporations are behaving the way you want.  
2. The governments in the countries where these data centers are located provide the human rights protections we would expect.

That is increasingly not the case.

This creates an urgency among builders to create **digital institutions** that can undeniably encode human rights into the systems themselves: systems that cannot be taken down, modified, or subverted.

These rights include:

* The freedom to organize and transact.  
* The freedom to speak.  
* The freedom from surveillance and the right to privacy.

If we can build digital institutions that act more reliably than human institutions, what does that mean for our future?

## Our moral imperative

We regularly hear that in the long arc of human history, governments and democracies don't last long. A couple of centuries is a long time without major upheaval. There is no guarantee that governments naturally evolve to become more respectful of their citizens.

If we truly believe we are building the technology that forms the digital institutions that are here to stay, not just for centuries but for *millennia*, then we as engineers have a moral imperative not to turn a blind eye.

We have a moral imperative to choose, build, and improve blockchains in a way that betters society, improves human agency, and protects our collective rights.

This is not an industry to be trivialized by memecoins or the gambling fad of the day. While those might be present use cases, these are the systems that are going to outlast all of us for generations to come.

Let's make sure they embody the values we truly want.

