**Ekiden: A Platform for Private, Trustworthy, and Performant Smart Contract Execution**  
[{{ site.data.links.ucb_seclab.name }}]({{ site.data.links.ucb_seclab.url }}) - 
{% for author in site.data.publications.ekiden.authors %}[{{ site.data.links[author].name }}]({{ site.data.links[author].url }}), {% endfor %} et. al.   
Existing smart contracts systems inherit the availability and other security assurances of blockchains, however, they are impeded by blockchains’ lack of confidentiality and poor performance. Ekiden is a system that addresses these gaps by combining blockchains with Trusted Execution Environments (TEEs), such as Intel SGX. Capable of operating on any desired blockchain, Ekiden permits concurrent, off-chain execution of smart contracts within TEE-backed compute nodes, yielding high performance, low cost, and confidentiality for sensitive data.
In Submission.  
<!--
{% for pdf in site.data.publications.ekiden.paper %} [![](/img/ico/pdf.gif){{ pdf.name }}]({{ pdf.url }}), {% endfor %}
[![](/img/ico/tex.png)BibTeX]({{ site.data.publications.ekiden.bibtex }})
-->
