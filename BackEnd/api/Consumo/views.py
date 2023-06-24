from django.shortcuts import render
from rest_framework.permissions import IsAdminUser, IsAuthenticated
from rest_framework.decorators import api_view, permission_classes
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Consumo
from .serializers import ConsumoSerializer

@permission_classes([IsAuthenticated])
class ConsumoView(APIView):
    def get(self, request,format = None):
        consumo_id = request.query_params.get('id')
        if consumo_id is None:
            consumos = Consumo.objects.all()
        else:
            consumos = Consumo.objects.filter(id=consumo_id)
        serializer = ConsumoSerializer(consumos, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    def post(self, request,format = None):
        consumo_data = request.data.copy()
        serializer = ConsumoSerializer(data=consumo_data)
        if serializer.is_valid(raise_exception=True):
            novo_consumo = serializer.save(commit = False)
            novo_consumo.atualizar_valores_acumulados()
            novo_consumo.save()
            serializer_2 = ConsumoSerializer(novo_consumo)
            if serializer_2.is_valid(raise_exception=True):
                return Response(serializer_2.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def patch(self, request, idConsumo = None,format = None):
        # Verificando se conversor de caminho foi informado na requisição
        if idConsumo == None:
            return Response(['erro: o id da refeição deve ser informado na requisição'], status=status.HTTP_400_BAD_REQUEST)
        # Busca refeição pelo id especificado pelo usuário
        try:
            consumo = Consumo.objects.get(id=idConsumo)
        except Consumo.DoesNotExist:
            return Response({'erro': 'Consumo não encontrado.'}, status=status.HTTP_404_NOT_FOUND)
        
        serializer = ConsumoSerializer(consumo, data=request.data,partial = True)
        if serializer.is_valid(raise_exception=True):
            novo_consumo = serializer.save(commit = False)
            novo_consumo.atualizar_valores_acumulados()
            novo_consumo.save()
            serializer_2 = ConsumoSerializer(novo_consumo)
            if serializer_2.is_valid(raise_exception=True):
                return Response(serializer_2.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def delete(self, request, idConsumo = None, format = None):
        # Verificando se conversor de caminho foi informado na requisição
        if idConsumo == None:
            return Response(['erro: o id do consumo deve ser informado na requisição'], status=status.HTTP_400_BAD_REQUEST)
        # Busca refeição pelo id especificado pelo usuário
        try:
            consumo = Consumo.objects.get(id=idConsumo)
        except Consumo.DoesNotExist:
            return Response({'erro': 'Consumo não encontrado.'}, status=status.HTTP_404_NOT_FOUND)

        consumo.delete()
        return Response({'mensagem': 'Consumo excluído com sucesso.'}, status=status.HTTP_200_OK)

    def remover_refeicao_de_Consumo(self, idConsumo = None, idRefeicao=None,format = None):
        # Verificando se conversor de caminho foi informado na requisição
        if idConsumo == None:
            return Response(['erro: o id do alimento deve ser informado na requisição'], status=status.HTTP_400_BAD_REQUEST)
        if idRefeicao == None:
            return Response(['erro: o id da refeicao deve ser informado na requisição'], status=status.HTTP_400_BAD_REQUEST)
        
        try:
            consumo = Consumo.objects.get(id=idConsumo)
            refeicao = Refeicao.objects.get(id=idRefeicao)
        except Consumo.DoesNotExist:
            return Response("Consumo não encontrado", status=status.HTTP_404_NOT_FOUND)
        except Refeicao.DoesNotExist:
            return Response("Refeição não encontrada", status=status.HTTP_404_NOT_FOUND)
        

        consumo.consumidos_list.remove(refeicao)
        consumo.atualizar_valores_acumulados()
        serializer = ConsumoSerializer(consumo)
        if serializer.is_valid(raise_exception=True):
            consumo.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def adc_refeicao_em_Consumo(self, idConsumo = None, idRefeicao = None,format = None):
        # Verificando se conversor de caminho foi informado na requisição
        if idConsumo == None:
            return Response(['erro: o id do alimento deve ser informado na requisição'], status=status.HTTP_400_BAD_REQUEST)
        if idRefeicao == None:
            return Response(['erro: o id da refeicao deve ser informado na requisição'], status=status.HTTP_400_BAD_REQUEST)
        
        try:
            consumo = Consumo.objects.get(id=idConsumo)
            refeicao = Refeicao.objects.get(id=idRefeicao)
        except Consumo.DoesNotExist:
            return Response("Consumo não encontrado", status=status.HTTP_404_NOT_FOUND)
        except Refeicao.DoesNotExist:
            return Response("Refeição não encontrada", status=status.HTTP_404_NOT_FOUND)

        consumo.consumidos_list.add(refeicao)
        consumo.atualizar_valores_acumulados()
        serializer = ConsumoSerializer(consumo)
        if serializer.is_valid(raise_exception=True):
            consumo.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

