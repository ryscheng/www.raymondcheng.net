![radiatus.io](/img/projects/radiatus.png){: .projectlogo}
**Radiatus: a Shared-Nothing Server-Side Web Architecture**  
[{{ site.data.links.uwnetlab.name }}]({{ site.data.links.uwnetlab.url }}) - 
{% for author in site.data.publications.radiatus.authors %}[{{ site.data.links[author].name }}]({{ site.data.links[author].url }}), {% endfor %}  
Radiatus is a decentralized web framework for designing more secure web apps.
In Radiatus, all application-specific computation running on the server is
executed within a sandbox with the privileges of the end-user.
By strongly isolating users we protect user data and service
availability from application vulnerabilities.  
Published in [{{ site.data.publications.radiatus.venue.name }}]({{ site.data.publications.radiatus.venue.url }}) {{ site.data.publications.radiatus.year }}   
{% for pdf in site.data.publications.radiatus.paper %} [![pdf](/img/ico/pdf.gif){{ pdf.name }}]({{ pdf.url }}), {% endfor %}
[![tex](/img/ico/tex.png)BibTeX]({{ site.data.publications.radiatus.bibtex }})  
[![www](/img/ico/website.png)Website](http://www.radiatus.io)
[![code](/img/ico/code.png)GitHub](https://github.com/freedomjs/radiatus)
