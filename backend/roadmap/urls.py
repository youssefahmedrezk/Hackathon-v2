from django.urls import path
from .views import GenerateRoadmapView, RoadmapDetailView

urlpatterns = [
    path("generate/", GenerateRoadmapView.as_view(), name="roadmap-generate"),
    path("<int:pk>/", RoadmapDetailView.as_view(), name="roadmap-detail"),
]
