---
#
# By default, content added below the "---" mark will appear in the home page
# between the top bar and the list of recent posts.
# To change the home page layout, edit the _layouts/home.html file.
# See: https://jekyllrb.com/docs/themes/#overriding-theme-defaults
#
layout: home
---

<div>
  {% for section in site.sections %}
  <div class="section-box">
    <a href="{{ section.url }}">
      <div>
        <div>{{ section.title }}</div>
        <div>
          <img src="https://via.placeholder.com/350x150?text={{ section.title }} x1">
          <img class="hidden" src="https://via.placeholder.com/350x150?text={{ section.title }} x2">
          <img class="hidden" src="https://via.placeholder.com/350x150?text={{ section.title }} x3">
          <img class="hidden" src="https://via.placeholder.com/350x150?text={{ section.title }} x4">
          <img class="hidden" src="https://via.placeholder.com/350x150?text={{ section.title }} x5">
        </div>
        <div class="loader"></div>
      </div>
    </a>
  </div>
  {% endfor %}
</div>

<script src="/assets/js/index.js"></script>
