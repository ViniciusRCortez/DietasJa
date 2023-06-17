from .serializers import *

from rest_framework.decorators import permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status

from rest_framework.views import APIView

@permission_classes([IsAuthenticated])
class MetaDiariaView(APIView):
    # Função que obtém a meta do usuário logado
    def get(self, request, format=None):
        idUsuarioLogado = request.user.id # Obtém id do usuário com base no solicitante da requsisição
        meta = MetaDiaria.objects.filter(id_usuario=idUsuarioLogado) # Filtra a meta do usuário logado
        if not meta:
            return Response(['nenhuma meta diária foi encontrada para o usuário logado'], status=status.HTTP_204_NO_CONTENT)
        
        serializer = MetaDiariaSerializer(meta, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    # Função que cadastra uma nova meta para o usuário logado
    def post(self, request, format=None):
        idUsuarioLogado = request.user.id
        dadosMeta = request.data
        dadosMeta["id_usuario"] = idUsuarioLogado # Garantindo que usuário só fará post da própria meta
        # Garantindo que as sequências de dias dentro da meta iniciam zeradas
        dadosMeta['seq_dias_anterior'] = 0
        dadosMeta['seq_dias_atual'] = 0
        serializer = MetaDiariaSerializer(data=dadosMeta, many=False)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    # Função que atualiza a meta do usuário logado
    def patch(self, request, format=None):
        idUsuarioLogado = request.user.id
        try:
            metaAntiga = MetaDiaria.objects.get(id_usuario=idUsuarioLogado)
        except MetaDiaria.DoesNotExist:
            return Response(['erro: usuário não tem uma meta diária definida para atualizar'], status=status.HTTP_400_BAD_REQUEST)

        dadosMeta = request.data
        dadosMeta["id_usuario"] = idUsuarioLogado # Garante que meta atualizada continua vinculada ao usuário logado
        # Garantindo que as sequências de dias dentro da meta não serão alteradas (são de gestão interna)
        dadosMeta['seq_dias_anterior'] = metaAntiga.seq_dias_anterior
        dadosMeta['seq_dias_atual'] = metaAntiga.seq_dias_atual

        serializer = MetaDiariaSerializer(metaAntiga, data=dadosMeta, partial=True)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# Função que retorna a meta de calorias com base no id do usuário
def getMetaCalorias(idUsuario):
    try:
        meta = MetaDiaria.objects.get(id_usuario=idUsuario)
    except MetaDiaria.DoesNotExist:
        return -1.0 # Usuário não tem uma meta diária cadastrada
    return meta.qtd_calorias

# Função que seta a quantidade de dias da sequência atual ou da última (dependendo da chave do dicionário passada)
def setSeqDias(idUsuario, qtdDias):
    try:
        meta = MetaDiaria.objects.get(id_usuario=idUsuario)
    except MetaDiaria.DoesNotExist:
        return -1.0 # Usuário não tem uma meta diária cadastrada
    serializer = MetaDiariaSerializer(meta, data=qtdDias, partial=True)
    
    if serializer.is_valid(raise_exception=True):
        serializer.save()
        return 0
    else:
        return -2.0 # Falha ao atualizar a meta diária

def setSeqDiasAtual(idUsuario, qtdDias):
    return setSeqDias(idUsuario=idUsuario, qtdDias={'seq_dias_atual': qtdDias})

def setSeqDiasAnterior(idUsuario, qtdDias):
    return setSeqDias(idUsuario=idUsuario, qtdDias={'seq_dias_anterior': qtdDias})

def getSeqDias(idUsuario, tipoSequencia):
    try:
        meta = MetaDiaria.objects.get(id_usuario=idUsuario)
    except MetaDiaria.DoesNotExist:
        return -1.0 # Usuário não tem uma meta diária cadastrada
    if tipoSequencia == 'atual':
        return meta.seq_dias_atual
    return meta.seq_dias_anterior

def getSeqDiasAtual(idUsuario):
    return getSeqDias(idUsuario=idUsuario, tipoSequencia='atual')

def getSeqDiasAnterior(idUsuario):
    return getSeqDias(idUsuario=idUsuario, tipoSequencia='anterior')