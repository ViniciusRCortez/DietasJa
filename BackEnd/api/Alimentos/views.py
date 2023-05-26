from rest_framework import permissions
from rest_framework.generics import CreateAPIView
from django.contrib.auth.models import User
from .serializers import *

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated, IsAdminUser
from rest_framework.response import Response

# @api_view(['GET'])
@permission_classes([IsAuthenticated]) # View permitida para usuário autenticado
class BuscarAlimentosView(CreateAPIView):
    alimentos = Alimento.objects.all()
    serializers = AlimentoSerializer(alimentos, many=True)