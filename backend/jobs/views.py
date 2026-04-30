from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.response import Response

from .models import Job
from .serializers import JobSerializer


class JobListView(generics.ListAPIView):
    queryset = Job.objects.all().order_by("-scraped_at")
    serializer_class = JobSerializer


class MatchedJobsView(APIView):
    """
    GET /api/jobs/match/?skills=Python,Django,SQL
    Returns jobs whose required_skills overlap with the user's current skills.
    """

    def get(self, request):
        skills_param = request.query_params.get("skills", "")
        user_skills = [s.strip().lower() for s in skills_param.split(",") if s.strip()]

        matched = []
        for job in Job.objects.all():
            job_skills = [s.lower() for s in job.required_skills]
            if any(skill in job_skills for skill in user_skills):
                matched.append(job)

        serializer = JobSerializer(matched, many=True)
        return Response(serializer.data)
