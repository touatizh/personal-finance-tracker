from rest_framework import status
from rest_framework.viewsets import ModelViewSet

from core.users.models import User
from core.users.serializers import UserSerializer
from core.utils.permissions import IsAdminOrAuthenticatedPermission, UserPermission

class UserViewSet(ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAdminOrAuthenticatedPermission, UserPermission]
