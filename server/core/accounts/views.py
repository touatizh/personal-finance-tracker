from rest_framework.viewsets import ModelViewSet

from core.accounts.models import Account
from core.accounts.serializers import AccountSerializer
from core.utils.permissions import IsAdminOrAuthenticatedPermission, AccountPermission

class AccountViewSet(ModelViewSet):
    queryset = Account.objects.all()
    serializer_class = AccountSerializer
    permission_classes = [IsAdminOrAuthenticatedPermission, AccountPermission]
