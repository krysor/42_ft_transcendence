# Generated by Django 5.0 on 2024-05-17 16:06

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('authentication', '0005_score'),
    ]

    operations = [
        migrations.AlterField(
            model_name='score',
            name='id',
            field=models.AutoField(primary_key=True, serialize=False),
        ),
    ]
