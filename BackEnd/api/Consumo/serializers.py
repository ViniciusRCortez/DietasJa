from rest_framework import serializers
from .models import Consumo

class ConsumoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Consumo
        fields = ['id','user_id', 'meta_diaria_id','porcao', 'calorias_total', 'carboidratos_total', 'gorduras_total', 'proteinas_total', 'consumidos_list']
