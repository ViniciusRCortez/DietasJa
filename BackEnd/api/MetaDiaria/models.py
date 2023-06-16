from django.db import models
from django.contrib.auth.models import User

class MetaDiaria(models.Model):
    id_usuario = models.OneToOneField(User, on_delete=models.SET_NULL, null=True)
    qtd_calorias = models.FloatField()
    seq_dias_anterior = models.IntegerField(default=0) # Para recuperar a quantidade de dias dentro da meta mesmo após a sequência atual ter sido zerada
    seq_dias_atual = models.IntegerField(default=0)

    def __str__ (self):
        return str(self.id_usuario)