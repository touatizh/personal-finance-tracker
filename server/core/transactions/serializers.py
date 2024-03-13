from decimal import Decimal
from rest_framework import serializers

from core.transactions.models import Transaction, TransactionType
from core.utils.exceptions import IsNotAccountOwner
from core.utils.currency_converter import currency_converter
from core.accounts.serializers import AccountSerializer

class TransactionSerializer(serializers.ModelSerializer):
    account = AccountSerializer(read_only=True)
    class Meta:
        model = Transaction
        fields = "__all__"
        extra_kwargs = {
            "created_at": {'read_only': True},
            "updated_at":{'read_only': True},
        }

    def create(self, validated_data):
        if not validated_data["account"].owner == self.context["request"].user:
            raise IsNotAccountOwner
        
        if validated_data["currency"] != validated_data["account"].currency:
            validated_data["amount"] = currency_converter(validated_data["currency"], validated_data["account"].currency, validated_data["amount"])

        match validated_data["type"]:
            case TransactionType.EXP:
                validated_data["account"].balance -= validated_data["amount"]

            case TransactionType.INC:
                validated_data["account"].balance += validated_data["amount"]
            #! transfer feature to be added
                
        validated_data["account"].save()
        return super().create(validated_data)
    
    def update(self, instance, validated_data):
        operation = validated_data.get("type", instance.type)
        amount = validated_data.get("amount", instance.amount)
        account = validated_data.get("account", instance.account)
        currency = validated_data.get("currency", instance.currency)
        
        if not account.owner == self.context["request"].user:
            raise IsNotAccountOwner()

        if instance.currency != account.currency:
            instance.amount = currency_converter(instance.currency, account.currency, instance.amount)
            
        if instance.type == TransactionType.EXP:
            instance.account.balance += instance.amount
        else:
            instance.account.balance -= instance.amount
        instance.account.save()       

        if account != instance.account:
            instance.account = account
        
        if currency != account.currency:
            amount = currency_converter(currency, account.currency, amount)
        if operation == TransactionType.EXP:
            instance.account.balance -= amount
        else:
            instance.account.balance += amount
        instance.account.save()
        
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()
        
        return instance
