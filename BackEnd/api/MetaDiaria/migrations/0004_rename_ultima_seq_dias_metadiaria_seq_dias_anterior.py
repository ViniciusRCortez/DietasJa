# Generated by Django 4.2.1 on 2023-06-17 03:28

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('MetaDiaria', '0003_rename_dias_consec_na_meta_metadiaria_seq_dias_atual_and_more'),
    ]

    operations = [
        migrations.RenameField(
            model_name='metadiaria',
            old_name='ultima_seq_dias',
            new_name='seq_dias_anterior',
        ),
    ]
