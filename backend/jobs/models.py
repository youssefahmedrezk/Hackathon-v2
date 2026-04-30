from django.db import models


class Job(models.Model):
    title = models.CharField(max_length=300)
    company = models.CharField(max_length=200)
    location = models.CharField(max_length=200, blank=True)
    job_type = models.CharField(
        max_length=20,
        choices=[("internship", "Internship"), ("fulltime", "Full-Time")],
        default="fulltime",
    )
    required_skills = models.JSONField(default=list)
    source_url = models.URLField(blank=True)
    source = models.CharField(max_length=50, blank=True)
    scraped_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.title} @ {self.company}"
