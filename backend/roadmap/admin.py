from django.contrib import admin
from .models import Skill, Roadmap, RoadmapSkill

admin.site.register(Skill)
admin.site.register(Roadmap)
admin.site.register(RoadmapSkill)
