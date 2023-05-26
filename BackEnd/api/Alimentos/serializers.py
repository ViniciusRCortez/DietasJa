# from django.contrib.auth.models import Alimento
from .models import Alimento
from rest_framework import serializers

class AlimentoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Alimento
        fields = {'nome', 'qtd_calorias', 'qtd_carboidratos', 'qtd_gorduras', 'qtd_proteinas', 'e_padrao'}