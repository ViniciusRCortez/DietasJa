from rest_framework import permissions
from rest_framework.generics import CreateAPIView
from django.contrib.auth.models import User
from .serializers import *

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from rest_framework import status

from rest_framework.views import APIView

@permission_classes([IsAuthenticated])
# @permission_classes([AllowAny])
class MetaDiariaView(APIView):
    # Função que obtém a meta do usuário logado
    def get(self, request, format=None):
        idUsuarioLogado = request.user.id # Obtém id do usuário com base no solicitante da requsisição
        meta = MetaDiaria.objects.filter(id_usuario=idUsuarioLogado) # Filtra a meta do usuário logado
        if not meta:
            return Response(['nenhuma meta foi encontrada para o usuário logado'], status=status.HTTP_204_NO_CONTENT)
        
        serializer = MetaDiariaSerializer(meta, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    # Função que cadastra uma nova meta para o usuário logado
    def post(self, request, format=None):
        idUsuarioLogado = request.user.id
        dadosMeta = request.data
        dadosMeta["id_usuario"] = idUsuarioLogado # Garantindo que usuário só fará post da própria meta
        serializer = MetaDiariaSerializer(data=dadosMeta, many=False)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    # Função que atualiza a meta do usuário logado
    def patch(self, request, format=None):
        idUsuarioLogado = request.user.id
        try:
            metaAntiga = MetaDiaria.objects.get(id_usuario=idUsuarioLogado)
        except MetaDiaria.DoesNotExist:
            return Response(['erro: usuário não tem uma meta definida para editar'], status=status.HTTP_400_BAD_REQUEST)    

        dadosMeta = request.data
        dadosMeta["id_usuario"] = idUsuarioLogado # Garante que meta atualizada continua vinculada ao usuário logado
        serializer = MetaDiariaSerializer(metaAntiga, data=dadosMeta, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)