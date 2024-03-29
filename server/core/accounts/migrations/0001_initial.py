# Generated by Django 5.0.2 on 2024-03-03 17:08

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Account',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=255)),
                ('color', models.CharField(max_length=10)),
                ('type', models.CharField(choices=[('GEN', 'General'), ('CASH', 'Cash'), ('CA', 'Current Account'), ('SA', 'Savings Account'), ('INV', 'Investment Account')], default='GEN', max_length=4)),
                ('balance', models.DecimalField(decimal_places=3, max_digits=19)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('owner', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='accounts', to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'db_table': 'Accounts',
            },
        ),
    ]
