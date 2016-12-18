{% for pKey in site.data.talks.order.list %}
  **{{ site.data.talks[pKey].title }}**   
  {% for venue in site.data.talks[pKey].venues %} {{ venue.name }}. {{ venue.location }}. {{ venue.date }}     
  {% endfor %}     
  {% for slides in site.data.talks[pKey].slides %} [![](/img/ico/ppt.gif){{ slides.name }}]({{ slides.url }}), {% endfor %}
  {% for video in site.data.talks[pKey].videos %} [![](/img/ico/video.png){{ video.name }}]({{ video.url }}), {% endfor %}
  <hr />
{% endfor %}
