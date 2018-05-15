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

<h2>Meetup Events</h2>
<blockquote class="embedly-card">
  <h4>
    <a href="https://www.meetup.com/Taiwanese-American-Professionals-Boston/events/249929016/">TAP Boston 6th Annual Spring Gala</a>
  </h4>
  <p>
    TAP Boston 6th Annual Spring GalaServing Our Communities. Growing Tomorrow's Leaders.Saturday, May 19th, 7 to 9 PM Thank you for your overwhelming support - we are completely sold out! There will be NO at-the-door tickets. If you'd like to be placed on the waitlist, please email Anthony Wu ([masked]) or Jen Tsang ([masked]).
  </p>
</blockquote>

<script async src="//cdn.embedly.com/widgets/platform.js" charset="UTF-8"></script>