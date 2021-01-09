---
title: Spinner
layout: default-no-bg
permalink: /resources/spinner
---

<div id="myModal" class="modal">
  <div class="modal-content">
    <span class="close">&times;</span>
    <p id="myModalResult"></p>
    <p id="myModalImage"></p>
    <p id="myModalInfo"></p>
  </div>
</div>

<div class="main-contents-area">
  <h3 class="no-bg">Let's eat at...</h3>
  <canvas class="spinner-canvas" id="canvas" width="500" height="500"></canvas>
  <input class="spinner-input" type="button" value="&#11118;" id='spin'/>	
  <script src="{{ site.baseurl }}/assets/js/spinner.js"></script>
</div>