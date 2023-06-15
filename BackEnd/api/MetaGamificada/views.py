from .serializers import *

from rest_framework.decorators import permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
import datetime
from datetime import timedelta

from rest_framework.views import APIView

from MetaDiaria.views import getMetaCalorias

@permission_classes([IsAuthenticated])
class MetaGamificadaView(APIView):
    # Função que retorna a meta diária do dia atual ou dos últimos sete dias referente ao usuário logado
    def get(self, request, periodo=None, format=None):
        idUsuarioLogado = request.user.id
        hoje = datetime.date.today()

        if periodo == None or periodo == 'dia':
            # Busca e retorna o consumo do usuário logado no dia de hoje (se periodo não for informado na requisição, considera periodo == 'dia)
            try:
                metaGamificada = MetaGamificada.objects.get(id_usuario=idUsuarioLogado, data=hoje)
            except MetaGamificada.DoesNotExist:
                return Response(['usuário logado não possui uma meta gamificada para o dia de hoje'], status=status.HTTP_204_NO_CONTENT)
            
            serializer = MetaGamificadaSerializer(metaGamificada, many=False)
            return Response(serializer.data, status=status.HTTP_200_OK)
    
        # Se periodo == semana, busca e retorna o consumo do usuário logado nos últimos sete dias
        dataInicio = hoje - timedelta(days=7) # Definindo data de início como 7 dias atrás
        dataFim = hoje - timedelta(days=1) # Definindo data de fim como sendo um dias antes do dia atual

        metas = (MetaGamificada.objects.filter(id_usuario=idUsuarioLogado)).filter(data__range = [dataInicio, dataFim])  ## Filtrando as metas do usuário logado referentes aos últimos setes dias

        if not metas:
            return Response(['usuário não possui nenhuma meta gamificada cadastrada nos últimos sete dias'], status=status.HTTP_204_NO_CONTENT)

        serializer = MetaGamificadaSerializer(metas, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    # Função que atualiza o consumo de calorias diárias do usuário logado ou insere um novo registro na tabela de MetaGamificada, caso registro do dia atual não esteja cadastrado
    def patch(self, request, format=None):
        idUsuarioLogado = request.user.id
        metaCalorias = getMetaCalorias(idUsuario=idUsuarioLogado) ## Obtém meta de calorias diárias do usuário logado
        hoje = datetime.date.today()
        
        if metaCalorias == -1.0:
            # O usuário não tem uma meta diária cadastrada, retorna erro
            return Response(['erro: usuário não tem uma meta diária cadastrada. Cadastre uma meta diária e tente novamente'], status=status.HTTP_400_BAD_REQUEST)

        ## Obtendo o consumo informado na requisição com base nos macronutrientes
        try:
            qtd_carboidratos = request.data['qtd_carboidratos']
            qtd_proteinas    = request.data['qtd_proteinas']
            qtd_gorduras     = request.data['qtd_gorduras']

            consumoInformado = 4000*(qtd_carboidratos + qtd_proteinas) + 9000*(qtd_gorduras)
        except KeyError:
            return Response(['erro: os macronutrientes (qtd_carboidratos, qtd_proteinas, qtd_gorduras) devem ser informados na requisição'], status=status.HTTP_400_BAD_REQUEST)

        try:
            ## Obtendo a meta gamificada do usuário logado referente ao dia de hoje
            metaGamificada = MetaGamificada.objects.get(data=datetime.date.today(), id_usuario=idUsuarioLogado)
        except MetaGamificada.DoesNotExist:
            # Como usuário logado não possui meta gamificada para o dia de hoje, faz o post da meta com o consumo informado na requisição
            novaMetaGamificada = {}
            novaMetaGamificada['id_usuario'] = idUsuarioLogado
            novaMetaGamificada['data'] = hoje
            novaMetaGamificada['calorias_consumidas'] = consumoInformado
            novaMetaGamificada['qtd_carboidratos'] = qtd_carboidratos
            novaMetaGamificada['qtd_proteinas'] = qtd_proteinas
            novaMetaGamificada['qtd_gorduras'] = qtd_gorduras

            if consumoInformado > metaCalorias:
                novaMetaGamificada['meta_cumprida'] = False
            else:
                novaMetaGamificada['meta_cumprida'] = True

            serializer = MetaGamificadaSerializer(data=novaMetaGamificada)
            if serializer.is_valid(raise_exception=True):
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)

            return Response(['erro: não foi possível cadastrar a meta gamificada para o dia de hoje'], status=status.HTTP_400_BAD_REQUEST)
    
        ## Atualizando MetaGamificada com o novo consumo e novo status meta_cumprida
        novaMetaGamificada = request.data.copy()
        novaMetaGamificada['id_usuario'] = idUsuarioLogado # Garantindo que meta gamificada continua vinculada ao usuário logado
        novaMetaGamificada['data'] = hoje # Garantindo que data continua sendo a atual

        ## Obtendo o consumo já realizado no dia pelo usuário logado
        consumoAntigo = metaGamificada.calorias_consumidas
        ## Adicionando o consumo informado via requisição ao consumo que já está registrado no banco (consumoAntigo)
        novoConsumo = max(0, consumoAntigo + consumoInformado) ## Novo consumo não pode ser negativo        
        
        novaMetaGamificada['calorias_consumidas'] = novoConsumo
        # Setando os novos valores dos macronutrientes com base na meta gamificada "antiga" e no que foi informado na requisição
        novaMetaGamificada['qtd_carboidratos'] = metaGamificada.qtd_carboidratos  + qtd_carboidratos
        novaMetaGamificada['qtd_proteinas'] = metaGamificada.qtd_proteinas + qtd_proteinas
        novaMetaGamificada['qtd_gorduras'] = metaGamificada.qtd_gorduras + qtd_gorduras
        
        # Verificando o status da meta diária (se continua ou não dentro da meta diária) após atualização do consumo
        if novoConsumo > metaCalorias:
            novaMetaGamificada['meta_cumprida'] = False
        else:
            novaMetaGamificada['meta_cumprida'] = True
        
        # Atualizando a tupla da tabela MetaGamificada para constar o consumo atualizado
        serializer = MetaGamificadaSerializer(metaGamificada, novaMetaGamificada, partial=True)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)