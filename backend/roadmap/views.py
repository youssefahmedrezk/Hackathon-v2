import requests
from django.conf import settings
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from users.models import UserProfile
from .models import Roadmap, RoadmapSkill, Skill
from .knapsack import knapsack_roadmap
from .serializers import RoadmapSerializer


class GenerateRoadmapView(APIView):
    """
    POST /api/roadmap/generate/
    Body: { "user_id": 1, "cv_text": "..." }

    1. Calls the AI engine to extract skills from the CV and get demand scores.
    2. Runs the Knapsack algorithm to build a time-optimized roadmap.
    3. Saves and returns the roadmap.
    """

    def post(self, request):
        user_id = request.data.get("user_id")
        cv_text = request.data.get("cv_text", "")

        try:
            user = UserProfile.objects.get(pk=user_id)
        except UserProfile.DoesNotExist:
            return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)

        # Ask AI engine for skill gaps and demand scores
        skills_data = []
        try:
            ai_response = requests.post(
                f"{settings.AI_ENGINE_URL}/analyze",
                json={
                    "cv_text": cv_text,
                    "target_role": user.target_role,
                },
                timeout=10,
            )
            if ai_response.status_code == 200:
                ai_data = ai_response.json()
                skills_data = ai_data.get("skills", [])
        except Exception as e:
            # If AI engine is unavailable, provide default skills based on target role
            print(f"AI Engine unavailable: {str(e)}. Using default skills for {user.target_role}.")
            skills_data = self._get_default_skills(user.target_role)

        if not skills_data:
            skills_data = self._get_default_skills(user.target_role)

        # Run knapsack optimization
        selected_skills = knapsack_roadmap(skills_data, user.available_hours_per_week)

        # Persist roadmap
        roadmap = Roadmap.objects.create(
            user=user,
            target_role=user.target_role,
            total_hours_available=user.available_hours_per_week,
        )
        for item in selected_skills:
            skill_obj, _ = Skill.objects.get_or_create(
                name=item["name"],
                defaults={
                    "demand_score": item["demand_score"],
                    "estimated_hours": item["estimated_hours"],
                },
            )
            RoadmapSkill.objects.create(
                roadmap=roadmap,
                skill=skill_obj,
                allocated_hours=item["allocated_hours"],
                order=item["order"],
            )

        serializer = RoadmapSerializer(roadmap)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def _get_default_skills(self, target_role):
        """Return default skills based on target role for development/testing"""
        default_skills = {
            "frontend developer": [
                {"name": "React", "demand_score": 9.5, "estimated_hours": 40},
                {"name": "JavaScript", "demand_score": 9.8, "estimated_hours": 35},
                {"name": "CSS", "demand_score": 8.5, "estimated_hours": 25},
                {"name": "TypeScript", "demand_score": 8.2, "estimated_hours": 30},
                {"name": "Git", "demand_score": 7.9, "estimated_hours": 15},
            ],
            "backend developer": [
                {"name": "Python", "demand_score": 9.5, "estimated_hours": 45},
                {"name": "Django", "demand_score": 8.8, "estimated_hours": 40},
                {"name": "SQL", "demand_score": 9.2, "estimated_hours": 35},
                {"name": "REST APIs", "demand_score": 8.5, "estimated_hours": 30},
                {"name": "Docker", "demand_score": 7.5, "estimated_hours": 20},
            ],
            "data scientist": [
                {"name": "Python", "demand_score": 9.8, "estimated_hours": 50},
                {"name": "Machine Learning", "demand_score": 9.5, "estimated_hours": 60},
                {"name": "Pandas", "demand_score": 8.9, "estimated_hours": 30},
                {"name": "Statistics", "demand_score": 8.7, "estimated_hours": 40},
                {"name": "TensorFlow", "demand_score": 8.3, "estimated_hours": 45},
            ],
            "full stack developer": [
                {"name": "React", "demand_score": 9.2, "estimated_hours": 40},
                {"name": "Python", "demand_score": 8.9, "estimated_hours": 40},
                {"name": "SQL", "demand_score": 8.8, "estimated_hours": 35},
                {"name": "Django", "demand_score": 8.5, "estimated_hours": 35},
                {"name": "DevOps", "demand_score": 7.8, "estimated_hours": 25},
            ],
        }
        role_lower = target_role.lower() if target_role else "full stack developer"
        return default_skills.get(role_lower, default_skills["full stack developer"])


class RoadmapDetailView(APIView):
    """GET /api/roadmap/<roadmap_id>/"""

    def get(self, request, pk):
        try:
            roadmap = Roadmap.objects.get(pk=pk)
        except Roadmap.DoesNotExist:
            return Response({"error": "Roadmap not found"}, status=status.HTTP_404_NOT_FOUND)
        serializer = RoadmapSerializer(roadmap)
        return Response(serializer.data)
