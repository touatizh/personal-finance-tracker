from rest_framework.routers import DefaultRouter
from core.users.views import UserViewSet
from core.accounts.views import AccountViewSet

router = DefaultRouter()

router.register("users", UserViewSet)
router.register("accounts", AccountViewSet)

urlpatterns = router.urls