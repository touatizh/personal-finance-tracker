from django.db import models
from core.utils.choices import TransactionType, Currency, Category
from core.accounts.models import Account
from core.utils.validators import TransactionAmountValidator, TransactionTimeValidator

class Transaction(models.Model):
    id = models.AutoField(primary_key=True)
    account = models.ForeignKey(Account, on_delete=models.CASCADE, related_name="transactions")
    type = models.CharField(max_length=16, choices=TransactionType.choices, default=TransactionType.EXP)
    category = models.CharField(max_length=48, choices=Category.choices)
    amount = models.DecimalField(max_digits=19, decimal_places=3, validators=[TransactionAmountValidator])
    currency = models.CharField(max_length=5, choices=Currency.choices)
    date_time = models.DateTimeField(validators=[TransactionTimeValidator])
    description = models.TextField(blank=True, null=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = "Transactions"
        verbose_name = "Transaction"
        verbose_name_plural = "Transactions"

    def __str__(self) -> str:
        return f"{self.type}({self.category}): {self.currency}{self.amount} [{self.date_time}]"

