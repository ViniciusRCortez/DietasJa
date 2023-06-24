# Generated by Django 4.2.1 on 2023-05-26 13:55

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Alimento',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nome', models.CharField(max_length=200)),
                ('qtd_calorias', models.FloatField()),
                ('qtd_carboidratos', models.FloatField()),
                ('qtd_gorduras', models.FloatField()),
                ('qtd_proteinas', models.FloatField()),
                ('e_padrao', models.BooleanField()),
            ],
        ),
    ]