from rest_framework import serializers
from .models import MetaDiaria

class MetaDiariaSerializer(serializers.ModelSerializer):
    class Meta:
        model = MetaDiaria
        fields = ['id', 'id_usuario', 'qtd_calorias', 'seq_dias_anterior', 'seq_dias_atual']