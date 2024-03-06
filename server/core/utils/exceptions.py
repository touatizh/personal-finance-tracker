from django.utils.translation import gettext_lazy as _
from rest_framework.exceptions import PermissionDenied

class IsNotAccountOwner(PermissionDenied):
    default_detail = _("You are not the owner of this account.")

