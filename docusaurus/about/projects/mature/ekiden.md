---
sidebar_position: -12
description: "A Platform for Confidentiality-Preserving, Trustworthy, and Performant Smart Contracts"
---

# Ekiden

[UC Berkeley Security Research Lab](https://security.cs.berkeley.edu/) - [Raymond Cheng](https://www.raymondcheng.net/), [Fan Zhang](http://www.fanzhang.me/), [Jernej Kos](https://unico.re/), [Warren He](https://www.linkedin.com/in/warrenh), [Nick Hynes](http://github.com/nhynes), [Noah Johnson](http://people.eecs.berkeley.edu/~noahj/), [Ari Juels](http://www.arijuels.com/), [Andrew Miller](http://soc1024.ece.illinois.edu/), [Dawn Song](https://people.eecs.berkeley.edu/~dawnsong/)

Smart contracts are applications that execute on blockchains. Today they manage billions of dollars in value and motivate visionary plans for pervasive blockchain deployment. While smart contracts inherit the availability and other security assurances of blockchains, however, they are impeded by blockchains’ lack of confidentiality and poor performance.

We present Ekiden, a system that addresses these critical gaps by combining blockchains with Trusted Execution Environments (TEEs). Ekiden leverages a novel architecture that separates consensus from execution, enabling efficient TEE-backed confidentiality-preserving smart-contracts and high scalability. Our prototype (with Tendermint as the consensus layer) achieves example performance of 600x more throughput and 400x less latency at 1000x less cost than the Ethereum mainnet.

Published in [IEEE European Symposium on Security and Privacy (EuroS&P)](https://www.ieee-security.org/TC/EuroSP2019/index.php) 2019   
[![pdf](/img/ico/pdf.gif) IEEE](https://ieeexplore.ieee.org/document/8806762),
[![pdf](/img/ico/pdf.gif) Arxiv](https://arxiv.org/abs/1804.05141),
[![tex](/img/ico/tex.png) BibTeX](https://dblp.uni-trier.de/rec/bibtex/conf/eurosp/ChengZKHHJJ0S19)

Commercialized at [Oasis Labs](https://www.oasislabs.com/)