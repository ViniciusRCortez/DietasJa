from rest_framework import serializers
from .models import Alimento

class AlimentoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Alimento
        fields = ('id', 'nome', 'qtd_calorias', 'qtd_carboidratos', 'qtd_gorduras', 'qtd_proteinas')