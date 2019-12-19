**Diamond: Automating Data Management and Storage for Wide-area Reactive Applications.**  
[{{ site.data.links.uwsyslab.name }}]({{ site.data.links.uwsyslab.url }}) - 
{% for author in site.data.publications.diamond.authors %}[{{ site.data.links[author].name }}]({{ site.data.links[author].url }}), {% endfor %}  
Diamond is a new data management system for wide-area, reactive applications. 
Reactive applications give users the illusion of continuous synchronization 
across mobile devices and the cloud server. Diamond simplifies this task by providing 
applications with persistent cloud storage, reliable synchronization between storage and mobile devices, 
and automated execution of application code in response to shared data updates.  
Published in [{{ site.data.publications.diamond.venue.name }}]({{ site.data.publications.diamond.venue.url }}) {{ site.data.publications.diamond.year }}   
{% for pdf in site.data.publications.diamond.paper %} [![](/img/ico/pdf.gif){{ pdf.name }}]({{ pdf.url }}), {% endfor %}
[![](/img/ico/tex.png)BibTeX]({{ site.data.publications.diamond.bibtex }})  
[![](/img/ico/website.png)Website](http://sapphire.cs.washington.edu/research/project/diamond.html)
[![](/img/ico/code.png)GitHub](https://github.com/UWSysLab/diamond)

