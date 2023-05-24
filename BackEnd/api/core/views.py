from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import SearchFilter
from rest_framework.permissions import IsAuthenticated
from rest_framework import viewsets

from .models import Alimento
from .serializers import AlimentoSerializer

# Obtêm todos os alimentos cujo nome contém o parâmetro search da URL
class BuscarAlimentosViewSet(viewsets.ModelViewSet):
    queryset = Alimento.objects.all()  # Obtêm todos os alimentos cadastrados
    serializer_class = AlimentoSerializer
    permission_classes = [IsAuthenticated]  # Usuário precisa estar autenticado
    filter_backends = [DjangoFilterBackend, SearchFilter]
    filterset_fields = ['nome']  # Campos expostos para filtragem
    search_fields = ['nome']     # Campos que permitirão a busca