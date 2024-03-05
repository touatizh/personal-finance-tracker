import re
from rest_framework import serializers

from core.accounts.models import Account

class AccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = Account
        fields = "__all__"
        extra_kwargs = {
            "owner": {'read_only': True},
            "created_at": {'read_only': True},
            "updated_at":{'read_only': True},
            }
    
    def create(self, validated_data):
        validated_data["owner"] = self.context["request"].user
        new_account = Account.objects.create(**validated_data)
        return new_account
    

