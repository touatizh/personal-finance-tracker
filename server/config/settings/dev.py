import os
from .base import *

DEBUG = True

DB_NAME = os.environ.get("DEV_DB_NAME")
JWT_SECRET_KEY = os.environ.get("DEV_JWT_SECRET_KEY")

# Database

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': DB_NAME,
        'USER': 'root',
        'PASSWORD': '',
        'HOST': 'localhost',
        'PORT': '3306',
    }
}

import os
from .base import *

DEBUG = True

DB_NAME = os.environ.get("DEV_DB_NAME")
JWT_SECRET_KEY = os.environ.get("DEV_JWT_SECRET_KEY")

# Database

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': DB_NAME,
        'USER': 'root',
        'PASSWORD': '',
        'HOST': 'localhost',
        'PORT': '3306',
    }
}

SIMPLE_JWT.update({
    'SIGNING_KEY': JWT_SECRET_KEY,
})