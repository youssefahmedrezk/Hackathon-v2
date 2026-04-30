from django.urls import path
from .views import JobListView, MatchedJobsView

urlpatterns = [
    path("", JobListView.as_view(), name="job-list"),
    path("match/", MatchedJobsView.as_view(), name="job-match"),
]
