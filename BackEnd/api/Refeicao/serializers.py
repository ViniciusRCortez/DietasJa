from rest_framework import serializers
from .models import Refeicao

class RefeicaoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Refeicao
        fields = ['id','nome','porcao','calorias_total', 'carboidratos_total', 'e_padrao', 'gorduras_total', 'proteinas_total', 'alimentos_list']
