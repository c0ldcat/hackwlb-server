---
layout: pure
title: 项目
permalink: /projects/
---

<div class="projects-list">
  <ul>
    {% if site.projects.size == 0 %}
    <h2>No project found</h2>
    {% else %}
    {% if list-project-limit == null %} {% assign list-project-limit = site.projects.size %} {% endif %}
    {% for project in site.projects limit:list-project-limit %}
    <li>
      <h2>
        <a href="{{ project.link }}" class="post-title">
          <span>{{ project.name | markdownify | remove: "<p>" | remove: "</p>" }}</span>
        </a>
      </h2>
      {% if project.description %} <p>{{ project.description }}</p> {% endif %}
    </li>
    {% endfor %}
    {% endif %}
  </ul>
</div>