# Generated by Django 3.0.5 on 2020-04-24 21:34

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('jobs', '0002_auto_20200425_0032'),
    ]

    operations = [
        migrations.AlterField(
            model_name='joboffer',
            name='city',
            field=models.CharField(blank=True, max_length=60),
        ),
    ]
