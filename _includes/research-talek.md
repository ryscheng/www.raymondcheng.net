**Talek: a Private Publish-Subscribe Protocol**  
[{{ site.data.links.uwnetlab.name }}]({{ site.data.links.uwnetlab.url }}) - 
{% for author in site.data.publications.talek.authors %}[{{ site.data.links[author].name }}]({{ site.data.links[author].url }}), {% endfor %}  
Modern applications share user-generated data over
the cloud, often exposing sensitive information. In this paper, we
present Talek, a private publish-subscribe (pub/sub) system that
shares user data through potentially untrustworthy servers, while
hiding both the content of data being shared as well as the communication
pattern among its users.
In Submission.  
{% for pdf in site.data.publications.talek.paper %} [![](/img/ico/pdf.gif){{ pdf.name }}]({{ pdf.url }}), {% endfor %}
[![](/img/ico/tex.png)BibTeX]({{ site.data.publications.talek.bibtex }})
