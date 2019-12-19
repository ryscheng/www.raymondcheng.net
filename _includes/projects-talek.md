**{{ site.data.publications.talek.title }}**  
[{{ site.data.links.uwnetlab.name }}]({{ site.data.links.uwnetlab.url }}) - 
{% for author in site.data.publications.talek.authors %}[{{ site.data.links[author].name }}]({{ site.data.links[author].url }}), {% endfor %}  

Talek is a private group messaging system that sends messages through potentially untrustworthy servers, while hiding both data content and the communication patterns among its users. Talek explores a new point in the design space of private messaging; it guarantees access sequence indistinguishability, which is among the strongest guarantees in the space, while assuming an anytrust threat model, which is only slightly weaker than the strongest threat model currently found in related work. Our results suggest that this is a pragmatic point in the design space, since it supports strong privacy \emph{and} good performance.

In Submission.  
{% for pdf in site.data.publications.talek.paper %} [![](/img/ico/pdf.gif){{ pdf.name }}]({{ pdf.url }}), {% endfor %}
[![](/img/ico/tex.png)BibTeX]({{ site.data.publications.talek.bibtex }})
