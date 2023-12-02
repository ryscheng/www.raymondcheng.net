{% for pKey in site.data.talks.order.shortlist %}

**{{ site.data.talks[pKey].title }}**    
{% for slides in site.data.talks[pKey].slides %} [![ppt](/img/ico/ppt.gif){{ slides.name }}]({{ slides.url }}) {% endfor %}{% for video in site.data.talks[pKey].videos %} [![video](/img/ico/video.png){{ video.name }}]({{ video.url }}) {% endfor %}   
{% for venue in site.data.talks[pKey].venues %}{% if venue.url != null and venue.url != blank %}[{{ venue.name }}]({{ venue.url }}).{% else %}{{ venue.name }}.{% endif %}{% if venue.location != null and venue.location != blank %} {{ venue.location }}.{% endif %}{% if venue.date != null and venue.date != blank %} {{ venue.date }}.{% endif %}{% if venue.videourl != null and venue.videourl != blank %} [![video](/img/ico/video.png)Watch]({{ venue.videourl }}){% endif %}   
{% endfor %}   
<hr />

{% endfor %}

*For the complete list, click [here](/about/publications/#talks)*
