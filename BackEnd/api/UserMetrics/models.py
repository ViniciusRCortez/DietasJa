from django.db import models
from django.contrib.auth.models import User

class UserMetric(models.Model):
    GENERO_CHOICES = [
        ('M', 'Masculino'),
        ('F', 'Feminino'),
    ]

    nome = models.CharField(max_length=200)
    genero = models.CharField(max_length=200, choices=GENERO_CHOICES)
    altura = models.FloatField()
    peso = models.FloatField()
    idade = models.IntegerField()
    imc = models.FloatField(blank=True)
    tmb = models.FloatField(blank=True)
    usuario = models.OneToOneField(User, on_delete=models.CASCADE)

    def calcular_imc(self):
        self.imc = self.peso / (self.altura ** 2)

    def calcular_tmb(self):
        if self.genero == 'M':
            self.tmb = 66.5 + (13.75 * self.peso) + (5.003 * self.altura * 100) - (6.755 * self.idade)
        elif self.genero == 'F':
            self.tmb = 655.1 + (9.563 * self.peso) + (1.850 * self.altura * 100) - (4.676 * self.idade)
        else:
            # Caso o gênero não seja válido, atribuir um valor padrão para TMB
            # O TMB medio de um adulto é entre 1200-2400 cal
            self.tmb = 2000

    def save(self, *args, **kwargs):
        self.calcular_imc()
        self.calcular_tmb()
        super().save(*args, **kwargs)