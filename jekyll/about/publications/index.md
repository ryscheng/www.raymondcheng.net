---
layout: default
title: Publications
permalink: /about/publications/
---

## Publications

{% for pKey in site.data.publications.order.list %}

**{{ site.data.publications[pKey].title }}**   
{% for aKey in site.data.publications[pKey].authors %} {{ site.data.links[aKey].name }}, {% endfor %}     
[{{ site.data.publications[pKey].venue.name }}]({{ site.data.publications[pKey].venue.url }}). {{ site.data.publications[pKey].year }}.    
{% for pdf in site.data.publications[pKey].paper %}[![pdf](/img/ico/pdf.gif){{ pdf.name }}]({{ pdf.url }}) {% endfor %}
{% if site.data.publications[pKey].bibtex != null and site.data.publications[pKey].bibtex != blank %}[![tex](/img/ico/tex.png)BibTeX]({{ site.data.publications[pKey].bibtex }}){% endif %}

{% endfor %}

## Talks

{% for pKey in site.data.talks.order.list %}

**{{ site.data.talks[pKey].title }}**    
{% for slides in site.data.talks[pKey].slides %} [![ppt](/img/ico/ppt.gif){{ slides.name }}]({{ slides.url }}) {% endfor %}{% for video in site.data.talks[pKey].videos %} [![video](/img/ico/video.png){{ video.name }}]({{ video.url }}) {% endfor %}   
{% for venue in site.data.talks[pKey].venues %}{% if venue.url != null and venue.url != blank %}[{{ venue.name }}]({{ venue.url }}).{% else %}{{ venue.name }}.{% endif %}{% if venue.location != null and venue.location != blank %} {{ venue.location }}.{% endif %}{% if venue.date != null and venue.date != blank %} {{ venue.date }}.{% endif %}{% if venue.videourl != null and venue.videourl != blank %} [![video](/img/ico/video.png)Watch]({{ venue.videourl }}){% endif %}   
{% endfor %}   
<hr />

{% endfor %}

## Press

{% markdown "projects-press.md" %}
