from rest_framework.permissions import BasePermission

class IsAdminOrAuthenticatedPermission(BasePermission):
    """
    Custom permission to only allow admins or an authenticated user to access the view.
    """
    def has_permission(self, request, view):
        # Allow admins only to list all users
        if view.action == "list" and request.user.is_superuser:
            return True
        # Allow admins and users only to retrieve their own user instance
        elif view.action in ["create","retrieve", "update", "partial_update", "destroy"]:
            return request.user.is_authenticated
        return False

class UserPermission(BasePermission):
    """
    Custom permission to only allow admins or the user to access the user object.
    """
    def has_object_permission(self, request, view, user_obj):
        # Allow admins and users only to retrieve their own user instance
        if view.action in ["retrieve", "update", "partial_update", "destroy"]:
            return user_obj == request.user or request.user.is_superuser
        return False

class AccountPermission(BasePermission):
    """
    Custom permission to only allow admins or account owner to access the account object.
    """
    def has_object_permission(self, request, view, account_obj):
        # Allow admins and account owner only to retrieve their own account instance
        if view.action in ["retrieve", "update", "partial_update", "destroy"]:
            return account_obj.owner == request.user or request.user.is_superuser
        return False

class TransactionPermission(BasePermission):
    """
    Custom permission to only allow admins or transaction's related-account owner to access the account object.
    """
    def has_object_permission(self, request, view, transaction_obj):
        # Allow admins and account owner only to retrieve their own account instance
        if view.action in ["retrieve", "update", "partial_update", "destroy"]:
            return transaction_obj.account.owner == request.user or request.user.is_superuser
        return False