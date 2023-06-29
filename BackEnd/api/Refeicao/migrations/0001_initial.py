# Generated by Django 4.2.1 on 2023-06-18 23:47

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('Alimentos', '0007_alimento_porcao'),
    ]

    operations = [
        migrations.CreateModel(
            name='Refeicao',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nome', models.CharField(max_length=100, unique=True)),
                ('porcao', models.FloatField(default=0)),
                ('calorias_total', models.FloatField(default=0)),
                ('carboidratos_total', models.FloatField(default=0)),
                ('e_padrao', models.BooleanField(default=False)),
                ('gorduras_total', models.FloatField(default=0)),
                ('proteinas_total', models.FloatField(default=0)),
                ('alimentos_list', models.ManyToManyField(related_name='refeicoes', to='Alimentos.alimento')),
            ],
        ),
    ]