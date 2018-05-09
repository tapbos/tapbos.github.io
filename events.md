---
title: Events
date: 2018-04-25T18:30:34+00:00
author: tapboston
layout: default
permalink: /events/
---

<h1>eventbrite api</h1>

<h2>Posts</h2>
<ul>
  {% for post in site.posts %}
  <li>
    <a href="{{ post.url }}">{{ post.title }}</a>
  </li>
  {% endfor %}
</ul>