from django.db import models
from core.users.models import User

from core.utils.choices import Currency, AccountType
from core.utils.validators import HexColorValidator

class Account(models.Model):
    id = models.AutoField(primary_key=True)
    owner = models.ForeignKey(User, on_delete=models.CASCADE, related_name="accounts")
    name = models.CharField(max_length=255)
    color = models.CharField(max_length=10, validators=[HexColorValidator])
    type = models.CharField(max_length=4, choices=AccountType.choices, default=AccountType.GENERAL)
    balance = models.DecimalField(max_digits=19, decimal_places=3)
    currency = models.CharField(max_length=5, choices=Currency.choices, default=Currency.USD)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = "Accounts"

    def __str__(self) -> str:
        return f"{self.owner.get_full_name()}'s {self.type}: {self.name}"