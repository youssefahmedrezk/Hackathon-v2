from rest_framework import serializers
from .models import Roadmap, RoadmapSkill, Skill


class SkillSerializer(serializers.ModelSerializer):
    class Meta:
        model = Skill
        fields = "__all__"


class RoadmapSkillSerializer(serializers.ModelSerializer):
    skill = SkillSerializer(read_only=True)

    class Meta:
        model = RoadmapSkill
        fields = ["skill", "allocated_hours", "order"]


class RoadmapSerializer(serializers.ModelSerializer):
    skills = RoadmapSkillSerializer(many=True, read_only=True)

    class Meta:
        model = Roadmap
        fields = ["id", "user", "target_role", "total_hours_available", "generated_at", "skills"]
