from rest_framework.routers import DefaultRouter
from core.users.views import UserViewSet

router = DefaultRouter()

router.register("users", UserViewSet)

urlpatterns = router.urls