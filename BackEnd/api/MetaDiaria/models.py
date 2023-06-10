from django.db import models
from django.contrib.auth.models import User

class MetaDiaria(models.Model):
    id_usuario = models.OneToOneField(User, on_delete=models.SET_NULL, null=True)
    qtd_calorias = models.FloatField()

    def __str__ (self):
        return str(self.qtd_calorias)