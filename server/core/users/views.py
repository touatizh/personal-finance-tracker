from datetime import timedelta
import requests
from rest_framework import status
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from rest_framework_simplejwt.exceptions import InvalidToken, TokenError
from django.http import JsonResponse
from django.conf import settings
from django.utils import timezone

from core.users.models import User
from core.users.serializers import UserSerializer
from core.utils.permissions import UserPermission

class UserViewSet(ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [UserPermission]

    def create(self, request, *args, **kwargs):
        response = super().create(request, *args, **kwargs)
        user = User.objects.get(id=response.data["id"])
        token = RefreshToken.for_user(user)
        response.data["tokens"] = {
            "refresh": str(token),
            "access": str(token.access_token),
        }
        return response

class LogoutAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        refresh_token = request.data.get("refresh", None)
        if refresh_token:
            try:
                token = RefreshToken(refresh_token)
                token.blacklist()
                response = JsonResponse({"detail": "Logged out successfully."}, status=status.HTTP_204_NO_CONTENT)
                return response
            except Exception as e:
                return Response({"detail": str(e)}, status=status.HTTP_400_BAD_REQUEST)
        return Response({"detail": "Invalid refresh token."}, status=status.HTTP_400_BAD_REQUEST)