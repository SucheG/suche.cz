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
        <div class="img" style="background-image:url('{{ section.first_image }}')"></div>
        {% for image in section.images %}
          <div class="img hidden" style="background-image:url('{{ image }}')"></div>
        {% endfor %}
        <div class="loader"></div>
      </div>
    </a>
  </div>
  {% endfor %}
</div>

<script src="/assets/js/index.js"></script>


