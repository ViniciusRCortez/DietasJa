from .models import Alimento
from rest_framework import serializers

class AlimentoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Alimento
        fields = ['id', 'nome', 'porcao', 'qtd_calorias', 'qtd_carboidratos', 'qtd_gorduras', 'qtd_proteinas', 'e_padrao']