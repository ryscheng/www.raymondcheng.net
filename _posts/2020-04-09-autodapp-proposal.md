---
layout: post
title:  "AutoDapp: a Proposal to Instantly Decentralize Your Existing Web Apps"
date:   2020-04-07 12:47:18 -0700
categories: [projects, decentralization]
---

The [AutoDapp](https://autodapp.io) project aims to automatically convert any existing web or mobile application into a decentralized application (DApp) by changing just a single line of code, starting with [Discourse](https://www.discourse.org/) and [MediaWiki](https://www.mediawiki.org/wiki/MediaWiki). This blog post outlines a high-level approach to instantly decentralize popular applications by interposing on the SQL connection between its web server and database. With the unified effort of the open source community, we can accelerate the advent of the decentralized future for millions of users -- this is what we’re calling our “One Million” mission.

![banner](/img/diagrams/autodapp-proposal/banner.png)

# Why aren’t there more Dapp users?

Efforts towards decentralizing the Web have now been a decades-long journey. Companies and smart people join the cause for various reasons, whether [ideological](https://www.eff.org/cyberspace-independence), to shift the [balance of power](https://openbazaar.org/blog/why-is-decentralization-important/), to make their applications [resilient to censorship](https://unchainedpodcast.com/why-decentralization-isnt-as-important-as-you-think/), to protect [free speech](https://knightcolumbia.org/content/protocols-not-platforms-a-technological-approach-to-free-speech), or to encourage greater [innovation](https://onezero.medium.com/why-decentralization-matters-5e3f79f7638e).

Traditionally, the movement has been defined by technology-first efforts. First, design a decentralized or peer-to-peer subsystem (such as [storage](https://ipfs.io/), [SQL database](https://covenantsql.io/), [document-oriented database](https://www.bigchaindb.com/), [graph database](https://gun.js.org/), [content delivery](https://www.bittorrent.com/), or [application logic](https://ethereum.org/)), and find ways to [plug it into an existing application’s tech stack](https://dweb.archive.org/details/home). If you have assembled enough subsystems to write full applications on top, you might try to package it as a platform ([1](http://www.freedomjs.org/), [2](https://solid.inrupt.com/), [3](https://blockstack.org/), [4](https://www.textile.io/)). While efforts to decentralize applications existed well before cryptocurrency, even with the recent excitement behind crypto projects such as Ethereum still has not generated mass adoption of decentralization technologies. To date, decentralized application usage still pales in comparison to centralized equivalents. Across the entire blockchain ecosystem at the time of writing, we see less than [100k](https://www.stateofthedapps.com/stats) daily active users.

Why is adoption so low? There are a number of factors, which may not apply equally to all decentralization efforts:
- **Platform risk**: There is a chicken and egg problem with new infrastructure projects. Developers of popular applications are wary of depending on new technologies for critical components (like storage) that have not yet scaled reliably to their levels in production settings. 
- **Differentiating new apps**: Many of the developers building on decentralized platforms are building new applications from scratch without an existing user base. If decentralization is their primary competitive differentiator from alternatives, this is usually an insufficient value proposition for many users to incur the switching costs.
- **Difficult to debug**: When things go wrong, you now have to coordinate across many disparate parties to be able to solve the problem.
- **Worse performance**: Reliable performance is already hard, even when you have full control over all of your serving infrastructure. Decentralization means you no longer have full control over the machines that your application depends on.

> The goal of the AutoDapp effort is to push the boundaries of taking a low-friction developer-first approach. Can we allow developers to use the existing, mature web stacks that they are used to, enabling them to switch between a centralized cloud deployment and a decentralized deployment with only a single line of code change? If we can do that, we can instantly decentralize many existing popular applications.

For the purposes of this blog, we will narrowly define blockchains as a [Byzantine-fault tolerant](https://en.wikipedia.org/wiki/Byzantine_fault) consensus protocol. At its core, all a blockchain does is help all nodes/miners/validators replicate data and achieve agreement on the global ordering of all items on a log or ledger. This can be either a permissionless or permissioned blockchain. While compatible with governance and incentivisation schemes, we will save those topics for a later post.

# High-level Design

![architecture](/img/diagrams/autodapp-proposal/architecture.png)

Our AutoDapp architecture is designed to enable any web application, even with proprietary code, to run in a decentralized setting with the change of one line of configuration: its database connection string. 

For example, all a developer has to do to decentralize their app is change the hostname of their database connection of their web server from:

```bash
mysql://user@host:3306/db # original database connection string
```

into this:

``` bash
mysql://user@autodapp:3306/db # AutoDapp-ed
```

Instead of pointing your web application to a centralized database, such as a managed MySQL instance on AWS, the application points to an AutoDapp validator. That’s all it takes to make your application decentralized!

AutoDapp validators are blockchain validators that also run a copy of the entire backend web stack -- the web server and a local database replica. All application state is replicated over a network of AutoDapp validators. A front end client application (e.g. web or mobile) simply needs to be configured to connect to a validator that they trust. If the client doesn’t trust any existing validators, they can also run their own validator. For convenience, we can also use DNS routing to automatically connect users to a validator, requiring **no** changes to an average user’s user experience. 

![techstack](/img/diagrams/autodapp-proposal/stack.png)

Within each validator, the web server is reconfigured to connect through an AutoDapp SQL proxy. Upon intercepting a SQL command from the application, the AutoDapp proxy will determine if it is a read-write command (will mutate state in the database e.g. CREATE, INSERT, UPDATE, DELETE) or a read-only command (will not mutate state). Read-only commands like SQL selects are forwarded directly to its local database replica, and query results are immediately returned.

Read-write commands are broadcast to all validators on the network. Every validator checks if it contains valid SQL commands, appends the operation to the next block, and runs a consensus protocol across all validators to agree on the state of the blockchain log. Once committed to the log, each validator executes the agreed upon SQL commands to its local database replica. The application waits until the log and SQL transactions are finalized. As with any journaled file store, new validators replay the log of all SQL commands to construct its replica.

![requestflow](/img/diagrams/autodapp-proposal/flow.png)

This architecture ensures that all clients, regardless of which validator they are connected to, see a consistent view of the database and all writes are globally ordered by the consensus protocol. This simple architecture works because most web applications are already designed to be stateless at the web server and client. All we would need to do is make sure that the database is consistently replicated across all validators.

**Pros**:
- **Develop quickly** using the same exact tools that web/cloud developers use, and inherit all of the applications/libraries/tooling that has been already developed. Many Dapp developers start off by [using cloud infrastructure](https://medium.com/fluence-network/dapp-survey-results-2019-a04373db6452) for this very reason.
- **Censorship-resistance**: In a permissionless setting, anyone can launch a new validator and start serving the application for their local community. The only way to prevent this is to censor the entire blockchain.
- **Byzantine fault tolerance**: Applications become instantly Byzantine fault tolerant, benefitting from the stronger threat model that most blockchains are designed for.
- **Mature implementations**: Blockchains are some of the most scrutinized decentralized systems because of their initial use case of cryptocurrency. Discovering flaws in these systems leads to direct monetary gain by the attacker.
- **Mature operations**: Similarly, the blockchain community has made significant advancements in building out devops practices for managing large communities of validators, as well as diagnosing issues.

**Cons**:
- **Slower writes**: Because all write operations must wait for commitment on the blockchain (seconds to minutes latency), these operations will be noticeably slower compared to centralized counterparts. In some applications, it may be possible to mask this with a [progressive web app stack](https://web.dev/progressive-web-apps/).
- **Data sensitivity**: Because all data will be replicated across all validators, applications will need to begin with a governance model of validators you trust. It may be possible to compile applications for secure computing environments (like trusted hardware) in the future.
- **Higher costs**: Because we are running multiple copies of the application and storing multiple copies of data, we should expect higher total operational expenses.
- **Harder to test and debug**, though the blockchain community is evolving quickly in this space.

# Why is this good for the decentralization community?

First of all, we can just test en-masse a whole universe of decentralized applications. Instead of dedicating venture money and whole teams to build a copy of XYZ app (but decentralized), we can just AutoDapp the existing application and try it out immediately. We can instantly test product/market fit for our XYZ Dapp. No usage? No skin off my back. Who knows, one of them might stick.

More importantly, [progressive decentralization](https://a16z.com/2020/01/09/progressive-decentralization-crypto-product-management/) is made trivial, enabling companies that truly care about decentralization to focus on building a unique value proposition in their application logic using best-in-class developer tools first, without spending countless man-hours fiddling with a less mature decentralized platform. Companies can focus on delivering 10x value in their search for product/market fit before they spend any resources on decentralizing their application.

Some applications benefit from decentralization, [but not all do](https://unchainedpodcast.com/why-decentralization-isnt-as-important-as-you-think/). By easily being able to switch between a decentralized deployment and cloud deployment, developers can easily test whether decentralization actually addresses any real risks, such as censorship or malicious threat models.

# This sounds familiar…

## How is this different from federation?

Federation requires the application developer standardize a server-to-server protocol for sharing data between servers. This requires substantial coordination and developer effort, and often ends up [poorly implemented](https://ieeexplore.ieee.org/document/8560907). AutoDapp can be used to automate the data replication between servers, similarly allowing anyone to spin up a new server instance for an application. Imagine if the Gmail application were replicated across Google and Microsoft, vs Gmail and Outlook communicating over a shared email protocol (SMTP).

## How is this different from using a blockchain database?

Some projects, such as [CovenantSQL](https://covenantsql.io/) and [BigchainDB](https://www.bigchaindb.com/), try to lower friction for new Dapp developers by exposing well known APIs (e.g. SQL and MongoDB respectively) over a database replicated on top of a blockchain. While AutoDapp shares many similar technical components to these projects, the focus will be different. Instead of offering a publicly accessible SQL interface to a shared service running on a particular blockchain, we plan to focus our efforts on porting and optimizing existing applications to run end-to-end. This approach may yield different design decisions when it comes to authentication, data privacy, deployment, and performance scaling.

# Proof of Concept

We are currently in the early stages of working on AutoDapp’ed versions of [Discourse](https://www.discourse.org/) and [MediaWiki](https://www.mediawiki.org/wiki/MediaWiki). We hope these tools can be useful for existing decentralized companies, many of which are still relying on centralized cloud services for their internal operations (dogfood much?).
One promising application for AutoDapp is censorship-resistant content. Any centralized application that facilitates public discourse or provides invaluable information to the public is at risk of attacks from outside malicious actors or censorship from its central authority. Enabling the AutoDapp-ization of these applications can help safeguard against these scenarios.

# Open Challenges

We are only in the early stages of this journey, and expect many open challenges, including but not limited to:
- **Performance**: It’s hard. Can we make the user experience for AutoDapps just as good as their centralized counterparts?
- **Availability**: How can the AutoDapp community make sure these services stay up and available with >3 9’s of reliability?
- **Debugging & Developer Tools**: How can we make it painless for application developers to build locally and deploy globally with predictable and inspectable outcomes.
- **Authentication of database writes**: Web apps are written assuming the web server has root access to the database. That means any (malicious) validator can arbitrarily modify the database. How can we properly authenticate writes?
- **Support proprietary applications**: It’s just a SQL proxy. Why not support proprietary apps? Looking at you [Twitter](https://twitter.com/jack/status/1204766078468911106).
- **Supporting other storage systems**: Networked filesystems, key-value stores, graph databases, storage systems galore!
- **Enabling flexible incentives**: Developers may want to support both in-app incentives to drive user behavior, as well as validator incentives. AutoDapp needs a clear answer for how these applications can support tokens and how they fit into the broader crypto ecosystem.

# We need your help!

Do you think this is cool? Do you want to AutoDapp-ify the Web with us? Join us! We want to keep this an open source community effort. Here’s how to start:

1. Star us on GitHub: [https://github.com/autodapp/autodapp](https://github.com/autodapp/autodapp)     
Maybe we’ll host the project on an AutoDapp’ed git hosting application in the future. The possibilities are endless!
2. File issues on GitHub. Tell us what applications you want to see supported and tested with AutoDapp!
3. Join the [AutoDapp mailing list](https://autodapp.io/) for updates
<!-- Begin Mailchimp Signup Form -->
<link href="//cdn-images.mailchimp.com/embedcode/horizontal-slim-10_7.css" rel="stylesheet" type="text/css">
<style type="text/css">
	#mc_embed_signup{background:#fff; clear:left; font:14px Helvetica,Arial,sans-serif; width:100%;}
	/* Add your own Mailchimp form style overrides in your site stylesheet or in this style block.
	   We recommend moving this block and the preceding CSS link to the HEAD of your HTML file. */
</style>
<div id="mc_embed_signup">
<form action="https://autodapp.us19.list-manage.com/subscribe/post?u=34af0118557807eb5268a76b3&amp;id=f2463eb726" method="post" id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form" class="validate" target="_blank" novalidate>
    <div id="mc_embed_signup_scroll">
	<input type="email" value="" name="EMAIL" class="email" id="mce-EMAIL" placeholder="email address" required>
	<input type="hidden" value="blog-0001" name="SOURCE" class="" id="mce-SOURCE" placeholder="blog-0001">
    <!-- real people should not fill this in and expect good things - do not remove this or risk form bot signups-->
    <div style="position: absolute; left: -5000px;" aria-hidden="true"><input type="text" name="b_34af0118557807eb5268a76b3_f2463eb726" tabindex="-1" value=""></div>
    <div class="clear"><input type="submit" value="Subscribe" name="subscribe" id="mc-embedded-subscribe" class="button"></div>
    </div>
</form>
</div>
<!--End mc_embed_signup-->

**Developers! If you want to help contribute to the cause, reach out to us via GitHub or email!**

This is just the beginning, look out for more blog posts on progress and updates soon.

*Blog post by [Raymond Cheng](https://raymondcheng.net) and [Jeffrey Dash Hsu](https://thectozone.com/)*

Acknowledgements: Huge thank you to Armani Ferrante, Nick Hynes, Will Scott, Reuven Gonzales, and Christopher Heymann for their helpful feedback and comments.

To follow the conversation on Hacker News, check it out [here](https://news.ycombinator.com/item?id=22814681)
