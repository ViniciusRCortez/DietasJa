from django.db import models
from Alimentos.models import Alimento

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
        self.calorias = self.alimentos_list.aggregate(Sum('qtd_calorias'))['calorias__sum'] or 0
        self.porcao = self.refeicoes_list.aggregate(Sum('porcao'))['porcao__sum'] or 0
        self.carboidratos = self.alimentos_list.aggregate(Sum('qtd_carboidratos'))['carboidratos__sum'] or 0
        self.gorduras = self.alimentos_list.aggregate(Sum('qtd_gorduras'))['gorduras__sum'] or 0
        self.proteinas = self.alimentos_list.aggregate(Sum('qtd_proteinas'))['proteinas__sum'] or 0
    
    def __str__ (self):
        return self.nome

    

