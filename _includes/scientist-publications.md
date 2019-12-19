[//]: # (jekyll-scholar)

[//]: # (Custom)
{% for pKey in site.data.publications.order.list %}

  **{{ site.data.publications[pKey].title }}**   
  {% for aKey in site.data.publications[pKey].authors %} {{ site.data.links[aKey].name }}, {% endfor %}     
  [{{ site.data.publications[pKey].venue.name }}]({{ site.data.publications[pKey].venue.url }}).
  {{ site.data.publications[pKey].year }}.   
  {% for pdf in site.data.publications[pKey].paper %} [![](/img/ico/pdf.gif){{ pdf.name }}]({{ pdf.url }}) {% endfor %}
  {% if site.data.publications[pKey].bibtex != null and site.data.publications[pKey].bibtex != blank %}[![](/img/ico/tex.png)BibTeX]({{ site.data.publications[pKey].bibtex }}){% endif %}


{% endfor %}
