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
          <img class="" src="https://via.placeholder.com/350x150?text={{ section.title }} x1">
          {% for image in section.images %}
            <img class="hidden" src="{{ image }}">
          {% endfor %}
        </div>
        <div class="loader"></div>
      </div>
    </a>
  </div>
  {% endfor %}
</div>

<script src="/assets/js/index.js"></script>


