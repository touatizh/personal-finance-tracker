from rest_framework.routers import DefaultRouter
from core.users.views import UserViewSet
from core.accounts.views import AccountViewSet
from core.transactions.views import TransactionViewSet

router = DefaultRouter()

router.register("users", UserViewSet)
router.register("accounts", AccountViewSet)
router.register("transactions", TransactionViewSet)

urlpatterns = router.urls