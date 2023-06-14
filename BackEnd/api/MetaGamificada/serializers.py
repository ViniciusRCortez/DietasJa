from rest_framework import serializers
from .models import MetaGamificada

class MetaGamificadaSerializer(serializers.ModelSerializer):
    class Meta:
        model = MetaGamificada
        fields = ['id', 'id_usuario', 'data', 'calorias_consumidas', 'meta_cumprida']