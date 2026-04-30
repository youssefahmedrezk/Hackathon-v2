from django.db import models


class UserProfile(models.Model):
    username = models.CharField(max_length=150, unique=True)
    email = models.EmailField(unique=True)
    target_role = models.CharField(max_length=200, blank=True)
    available_hours_per_week = models.PositiveIntegerField(default=10)
    goal = models.CharField(
        max_length=20,
        choices=[
            ("internship", "Summer Internship"),
            ("fulltime", "Full-Time Job"),
            ("upskill", "Career Switch"),
            ("freelance", "Freelancing"),
        ],
        default="internship",
    )
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.username
