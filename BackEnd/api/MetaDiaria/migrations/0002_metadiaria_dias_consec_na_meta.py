# Generated by Django 4.2.1 on 2023-06-15 18:45

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('MetaDiaria', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='metadiaria',
            name='dias_consec_na_meta',
            field=models.IntegerField(default=0),
        ),
    ]
