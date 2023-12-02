---
layout: default
title: Projects
permalink: /about/projects/
---

## Ongoing Work

{% for i in site.data.about.order.projects_ongoing %}
  {% markdown {{i}} %}
  <hr>
{% endfor %}


## Mature Projects

{% for i in site.data.about.order.projects_mature %}
  {% markdown {{i}} %}
  <hr>
{% endfor %}

{% include projects-previous.html %}

## Hacks

{% for i in site.data.about.order.projects_hacks %}
  {% markdown {{i}} %}
  <hr>
{% endfor %}

{% include projects-hacks.html %}
