from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/users/", include("users.urls")),
    path("api/roadmap/", include("roadmap.urls")),
    path("api/jobs/", include("jobs.urls")),
]
