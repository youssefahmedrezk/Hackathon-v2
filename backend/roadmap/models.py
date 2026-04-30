from django.db import models
from users.models import UserProfile


class Skill(models.Model):
    name = models.CharField(max_length=200)
    demand_score = models.FloatField(default=0.0)
    estimated_hours = models.PositiveIntegerField(default=5)

    def __str__(self):
        return f"{self.name} (demand: {self.demand_score})"


class Roadmap(models.Model):
    user = models.ForeignKey(UserProfile, on_delete=models.CASCADE, related_name="roadmaps")
    target_role = models.CharField(max_length=200)
    total_hours_available = models.PositiveIntegerField()
    generated_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Roadmap for {self.user.username} → {self.target_role}"


class RoadmapSkill(models.Model):
    roadmap = models.ForeignKey(Roadmap, on_delete=models.CASCADE, related_name="skills")
    skill = models.ForeignKey(Skill, on_delete=models.CASCADE)
    allocated_hours = models.PositiveIntegerField()
    order = models.PositiveIntegerField()

    class Meta:
        ordering = ["order"]
