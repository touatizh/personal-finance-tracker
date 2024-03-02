from django.contrib import admin
from django.urls import path, include

from api.v1.urls import urlpatterns as v1


urlpatterns = [
    path('admin/', admin.site.urls),
    path("api/v1/", include(v1))
]
