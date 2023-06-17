from django.db import models

class Alimento(models.Model):
    nome = models.CharField(max_length=200, unique=True)
    porcao = models.FloatField() # Quantidade do alimento, em gramas
    qtd_calorias = models.FloatField()
    qtd_carboidratos = models.FloatField()
    qtd_gorduras = models.FloatField()
    qtd_proteinas = models.FloatField()
    e_padrao = models.BooleanField(default=False) # Define se alimento é padrão ou da comunidade

    def __str__ (self):
        return self.nome