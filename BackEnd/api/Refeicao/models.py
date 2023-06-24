from django.db import models
from Alimentos.models import Alimento
from django.db.models import Sum

class Refeicao(models.Model):
    nome = models.CharField(max_length = 100)
    porcao = models.FloatField(default = 0)
    calorias_total = models.FloatField(default=0)
    carboidratos_total = models.FloatField(default=0)
    e_padrao = models.BooleanField(default=False) # Define se a refeição é padrão ou da comunidade
    gorduras_total = models.FloatField(default=0)
    proteinas_total = models.FloatField(default=0)
    alimentos_list = models.ManyToManyField(Alimento, related_name="refeicoes")

    def atualizar_campos_acumulados(self):
        # Atualiza os campos de informações nutricionais da refeição antes de salvar
        self.calorias_total = self.alimentos_list.aggregate(Sum('qtd_calorias'))['qtd_calorias__sum'] or 0
        self.porcao = self.alimentos_list.aggregate(Sum('porcao'))['porcao__sum'] or 0
        self.carboidratos_total = self.alimentos_list.aggregate(Sum('qtd_carboidratos'))['qtd_carboidratos__sum'] or 0
        self.gorduras_total = self.alimentos_list.aggregate(Sum('qtd_gorduras'))['qtd_gorduras__sum'] or 0
        self.proteinas_total = self.alimentos_list.aggregate(Sum('qtd_proteinas'))['qtd_proteinas__sum'] or 0
    
    def __str__ (self):
        return self.nome

    

