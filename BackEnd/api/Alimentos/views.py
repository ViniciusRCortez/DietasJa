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
class AlimentosView(APIView):
    # Função que retorna todos os alimentos cujo nome contenha um critério de busca especificado ou todos os alimentos, caso o critério de busca não seja especificado pelo usuário
    def get(self, request, format=None):
        alimentoBuscado = request.query_params.get('nome')
        if alimentoBuscado == None:
            alimentos = Alimento.objects.all() # Nenhum critério de busca para nome especificado, retorna todos os alimentos
        else:
            alimentos = Alimento.objects.filter(nome__contains=alimentoBuscado) # Retorna todos os alimentos cujo nome contém alimentoBuscado
        
        if not alimentos:  # Verifica se a lista de alimentos está vazia
            return Response(status=status.HTTP_204_NO_CONTENT)  # Retorna a resposta 204 - "No Content"
        
        serializer = AlimentoSerializer(alimentos, many=True)
        return Response(serializer.data)
    
    # Função que insere um alimento da comunidade
    def post(self, request, format=None):
        alimentoQueryDict = request.data.copy() # Cópia para que QueryDict seja mutável
        # Tornando alimento a ser inserido obrigatoriamente como da comunidade
        if alimentoQueryDict.__contains__('e_padrao'):
            alimentoQueryDict.__setitem__('e_padrao', False) # Se requisição já tem o campo e_padrao, modifica-o para False
        else: # Caso contrário, adiciona par ('e_padrao', False) ao QueryDict
            alimentoQueryDict["e_padrao"] = False
        
        serializer = AlimentoSerializer(data=alimentoQueryDict)
        if serializer.is_valid(raise_exception=True):
            serializer.save() # Salva o alimento no banco e retorna status de sucesso (criado)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST) # Retorna erro

@permission_classes([IsAdminUser])
class AlimentosPadroesView(APIView):
    # Função que insere um alimento padrão
    def post(self, request, format=None):
        alimentoQueryDict = request.data.copy() # Cópia para que QueryDict seja mutável
        # Tornando alimento a ser inserido obrigatoriamente como padrão
        if alimentoQueryDict.__contains__("e_padrao"):
            alimentoQueryDict.__setitem__("e_padrao", True) # Se requisição já tem o campo e_padrao, modifica-o para True
        else: # Caso contrário, adiciona par ('e_padrao', True) ao QueryDict
            alimentoQueryDict["e_padrao"] = True
        
        serializer = AlimentoSerializer(data=alimentoQueryDict)
        if serializer.is_valid(raise_exception=True):
            serializer.save() # Salva o alimento no banco e retorna status de sucesso (criado)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST) # Retorna erro