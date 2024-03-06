import re
from rest_framework.validators import ValidationError
from django.utils import timezone

def HexColorValidator(color):
    if not re.match(r'^#(?:[0-9a-fA-F]{3}){1,2}$', color):
        raise ValidationError("This field must be a hex color code.")

def TransactionAmountValidator(amount):
    if amount < 0:
        raise ValidationError("This field must be greater than 0.")
    
def TransactionTimeValidator(time):
    if time > timezone.now():
        raise ValidationError("This field must not be in the future.")