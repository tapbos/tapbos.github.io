---
title: Spinner
layout: default-no-bg
permalink: /programs/spinner
---

<div id="myModal" class="modal">
  <div class="modal-content">
    <span class="close">&times;</span>
    <p id="myModalResult"></p>
    <p id="myModalInfo"></p>
  </div>
</div>

<div class="main-contents-area">
  <h3 class="no-bg">{{ page.title }}</h3>
  <input type="button" value="Go!" style="float:left;" id='spin' />
  <canvas id="canvas" width="500" height="500"></canvas>
  <script src="{{ site.baseurl }}/assets/js/spinner.js"></script>
</div>