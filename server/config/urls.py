from django.contrib import admin
from django.urls import path, include

from api.v1.urls import urlpatterns as v1
from core.users.views import LogoutAPIView, MyTokenObtainPairView, MyTokenRefreshView


urlpatterns = [
    path('admin/', admin.site.urls),
    path("api/v1/", include(v1)),
    path('auth/token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('auth/token/refresh/', MyTokenRefreshView.as_view(), name='token_refresh'),
    path('auth/logout/', LogoutAPIView.as_view(), name='logout'),
]
