# Generated by Django 3.0.5 on 2020-04-24 21:52

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('jobs', '0003_auto_20200425_0034'),
    ]

    operations = [
        migrations.AlterField(
            model_name='joboffer',
            name='company_email',
            field=models.EmailField(max_length=60),
        ),
    ]
