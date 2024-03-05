import re
from rest_framework.validators import ValidationError

def HexColorValidator(color):
    if not re.match(r'^#(?:[0-9a-fA-F]{3}){1,2}$', color):
        raise ValidationError("This field must be a hex color code.")