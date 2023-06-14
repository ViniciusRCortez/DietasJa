from django.db import models
from django.contrib.auth.models import User

class MetaGamificada(models.Model):
    id_usuario = models.ForeignKey(User, on_delete=models.CASCADE, related_name='possui')
    data = models.DateField()
    calorias_consumidas = models.FloatField()
    meta_cumprida = models.BooleanField(default=True)

    def __str__ (self):
        return str(self.data)