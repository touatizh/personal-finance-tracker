from rest_framework.viewsets import ModelViewSet
from rest_framework import status
from rest_framework.response import Response

from core.transactions.models import Transaction
from core.transactions.serializers import TransactionSerializer, TransactionType
from core.utils.permissions import TransactionPermission
from core.utils.exceptions import IsNotAccountOwner

class TransactionViewSet(ModelViewSet):
    queryset = Transaction.objects.all()
    serializer_class = TransactionSerializer
    permission_classes = [TransactionPermission]

    def get_queryset(self):
        return super().get_queryset().filter(account__owner=self.request.user)
    
    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        if not instance.account.owner == request.user:
            raise IsNotAccountOwner()
        
        if instance.type == TransactionType.EXP:
            instance.account.balance += instance.amount
        else:
            instance.account.balance -= instance.amount
        instance.account.save()

        self.perform_destroy(instance)
        return Response({"deleted"}, status=status.HTTP_204_NO_CONTENT)
