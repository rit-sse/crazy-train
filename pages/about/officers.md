---
layout: page
title: Officers
permalink: officers/
---
Minutes from weekly Officers meetings are
[available here](/about/officers/minutes).

### Principal Officers

{% for officer in site.data.primary_officers %}
  {{officer.name}}, {{officer.position}}
  <br>
  <{{officer.email}}@sse.se.rit.edu>
{% endfor %}

### Committee Heads

{% for officer in site.data.committee_heads %}
  {{officer.name}}, {{officer.position}}
  <br>
  <{{officer.email}}@sse.se.rit.edu>
{% endfor %}