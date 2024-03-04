from django.contrib.auth.hashers import make_password
from rest_framework import serializers

from core.users.models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = "__all__"
        extra_kwargs = {
            "password": {'write_only': True},
            "is_active": {'read_only': True},
            "is_superuser": {'read_only': True},
            "is_staff":{'read_only': True},
            "date_joined": {'read_only': True},
            "last_login": {'read_only': True},
            "groups": {'read_only': True},
            "user_permissions": {'read_only': True},
            }
    
    def create(self, validated_data):
        new_user = User.objects.create_user(**validated_data)
        return new_user
    
    def update(self, instance, validated_data):
        password = validated_data.pop("password", None)
        if password:
            instance.password = make_password(password)

        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        
        instance.save()
        return instance
