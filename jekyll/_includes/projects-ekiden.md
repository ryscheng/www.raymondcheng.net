**{{ site.data.publications.ekiden.title }}**  
[{{ site.data.links.ucb_seclab.name }}]({{ site.data.links.ucb_seclab.url }}) - 
{% for author in site.data.publications.ekiden.authors %}[{{ site.data.links[author].name }}]({{ site.data.links[author].url }}), {% endfor %}

Smart contracts are applications that execute on blockchains. Today they manage billions of dollars in value and motivate visionary plans for pervasive blockchain deployment. While smart contracts inherit the availability and other security assurances of blockchains, however, they are impeded by blockchains’ lack of confidentiality and poor performance.

We present Ekiden, a system that addresses these critical gaps by combining blockchains with Trusted Execution Environments (TEEs). Ekiden leverages a novel architecture that separates consensus from execution, enabling efficient TEE-backed confidentiality-preserving smart-contracts and high scalability. Our prototype (with Tendermint as the consensus layer) achieves example performance of 600x more throughput and 400x less latency at 1000x less cost than the Ethereum mainnet.

Published in [{{ site.data.publications.ekiden.venue.name }}]({{ site.data.publications.ekiden.venue.url }}) {{ site.data.publications.ekiden.year }}   
Commercialized at [{{ site.data.links.oasislabs.name }}]({{ site.data.links.oasislabs.url }})  
{% for pdf in site.data.publications.ekiden.paper %} [![pdf](/img/ico/pdf.gif){{ pdf.name }}]({{ pdf.url }}), {% endfor %}
[![tex](/img/ico/tex.png)BibTeX]({{ site.data.publications.ekiden.bibtex }})

