# Generated by Django 5.0 on 2024-05-18 10:28

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('authentication', '0009_alter_score_score'),
    ]

    operations = [
        migrations.AlterField(
            model_name='score',
            name='score',
            field=models.IntegerField(default=0, verbose_name='score'),
        ),
        migrations.CreateModel(
            name='MorpionParties',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('oponent', models.CharField(max_length=20, verbose_name='oponent')),
                ('date', models.DateField(auto_now=True, verbose_name='date of the match')),
                ('winner', models.IntegerField(default=0, verbose_name='state')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='morpion_parties', to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
