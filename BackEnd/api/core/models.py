from django.db import models

# Create your models here.

class Alimento(models.Model):
    nome = models.CharField(max_length=200)
    qtd_calorias = models.FloatField()
    qtd_carboidratos = models.FloatField()
    qtd_gorduras = models.FloatField()
    qtd_proteinas = models.FloatField()

    def __str__ (self):
        return self.nome