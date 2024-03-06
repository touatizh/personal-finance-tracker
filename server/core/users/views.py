from datetime import timedelta
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

class MyTokenObtainPairView(TokenObtainPairView):
    """
    Custom implementation of the TokenObtainPairView to store refresh token in cookies instead of returning it in response body.
    """
    def post(self, request: Request, *args, **kwargs):
        response = super().post(request, *args, **kwargs)

        refresh_token = response.data.pop("refresh", None)
        if refresh_token:
            refresh_lifetime = settings.SIMPLE_JWT["REFRESH_TOKEN_LIFETIME"]
            cookie_expiry = timezone.now() + refresh_lifetime + timedelta(days=1)
            response.set_cookie(
                key="refresh_token", 
                value=refresh_token,
                expires=cookie_expiry, #! cookie will live for 1 day longer than the refresh token
                httponly=True, #! prevents JS access
                secure=True, #! ensures cookie is sent over HTTPS only
                samesite="Lax", #! Strict or Lax recommended for CSRF prevention
                path="/auth" #! ensure cookie is only accessible from the auth endpoint
            )
        return response

class MyTokenRefreshView(TokenRefreshView):
    """
    Custom implementation of the TokenRefreshView to store refresh token in cookies instead of returning it in res
    """
    def post(self, request, *args, **kwargs):
        request.data.update({"refresh": request.COOKIES.get("refresh_token")})
        response = super().post(request, *args, **kwargs)

        refresh_token = response.data.pop("refresh", None)
        if refresh_token:
            refresh_lifetime = settings.SIMPLE_JWT["REFRESH_TOKEN_LIFETIME"]
            cookie_expiry = timezone.now() + refresh_lifetime + timedelta(days=1)
            response.set_cookie(
                key="refresh_token", 
                value=refresh_token,
                expires=cookie_expiry, #! cookie will live for 1 day longer than the refresh token
                httponly=True, #! prevents JS access
                secure=True, #! ensures cookie is sent over HTTPS only
                samesite="Lax", #! Strict or Lax recommended for CSRF prevention
                path="/auth" #! ensure cookie is only accessible from the auth endpoint
            )
        return response

class LogoutAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        refresh_token = request.COOKIES.get("refresh_token")
        if refresh_token:
            try:
                token = RefreshToken(refresh_token)
                token.blacklist()
                response = JsonResponse({"detail": "Logged out successfully."}, status=status.HTTP_204_NO_CONTENT)
                response.delete_cookie("refresh_token")
                return response
            except Exception as e:
                return Response({"detail": str(e)}, status=status.HTTP_400_BAD_REQUEST)
        return Response({"detail": "Invalid refresh token."}, status=status.HTTP_400_BAD_REQUEST)