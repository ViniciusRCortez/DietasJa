from django.db import models
from django.contrib.auth.models import User
from MetaDiaria.models import MetaDiaria
from Refeicao.models import Refeicao
from django.db.models import Sum


class Consumo(models.Model):
    user_id = models.ForeignKey(User, on_delete = models.SET_NULL,null = True)
    meta_diaria_id= models.OneToOneField(MetaDiaria, on_delete=models.SET_NULL,null=True)
    # campos para acumulação
    porcao = models.FloatField(default = 0)
    calorias_total = models.FloatField(default=0)
    carboidratos_total = models.FloatField(default=0)
    gorduras_total = models.FloatField(default=0)
    proteinas_total = models.FloatField(default=0)
    # outros campos do modelo
    consumidos_list = models.ManyToManyField(Refeicao, related_name='consumos')

    def atualizar_valores_acumulados(self):
        # calcular os valores acumulados
        self.calorias_total = self.consumidos_list.aggregate(Sum('calorias_total'))['calorias_total__sum'] or 0
        self.carboidratos_total = self.consumidos_list.aggregate(Sum('carboidratos_total'))['carboidratos_total__sum'] or 0
        self.porcao = self.consumidos_list.aggregate(Sum('porcao'))['porcao__sum'] or 0
        self.gorduras_total = self.consumidos_list.aggregate(Sum('gorduras_total'))['gorduras_total__sum'] or 0
        self.proteinas_total = self.consumidos_list.aggregate(Sum('proteinas_total'))['proteinas_total__sum'] or 0

