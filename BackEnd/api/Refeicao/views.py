from rest_framework import status
from rest_framework.permissions import IsAdminUser, IsAuthenticated
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import RefeicaoSerializer
from .models import Refeicao


@permission_classes([IsAuthenticated])
class RefeicoesView(APIView):
    def get(self, request, format=None):
        refeicao = request.query_params.get('nome')
        if refeicao == None:
            refeicoes = Refeicao.objects.all()
        else:
            refeicoes = Refeicao.objects.filter(nome__contains=refeicao)

        if not refeicoes:  
            return Response(status=status.HTTP_204_NO_CONTENT)  

        serializer = RefeicaoSerializer(refeicoes, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request, format=None):
        refeicao_data = request.data.copy()
        if refeicao_data.__contains__('e_padrao'):
            refeicao_data.__setitem__('e_padrao', False) # Se requisição já tem o campo e_padrao, modifica-o para False
        else: # Caso contrário, adiciona par ('e_padrao', False) ao QueryDict
            refeicao_data["e_padrao"] = False
        
        serializer = RefeicaoSerializer(data=refeicao_data)
        if serializer.is_valid(raise_exception=True):
            nova_refeicao = serializer.save(commit = False)  
            # Aplica a lógica de atualizar campos acumulados na nova refeição
            nova_refeicao.atualizar_campos_acumulados()
            nova_refeicao.save()
            serializer_2 = RefeicaoSerializer(nova_refeicao)
            if serializer_2.is_valid(raise_exception=True):
                return Response(serializer_2.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


    def patch(self, request, idRefeicao = None, format=None):
         # Verificando se conversor de caminho foi informado na requisição
        if idRefeicao == None:
            return Response(['erro: o id da refeição deve ser informado na requisição'], status=status.HTTP_400_BAD_REQUEST)
        # Busca refeição pelo id especificado pelo usuário
        try:
            refeicao_atualizar = Refeicao.objects.get(id=idRefeicao)
        except Refeicao.DoesNotExist:
            return Response({'erro': 'Refeição não encontrada.'}, status=status.HTTP_404_NOT_FOUND)

        if (refeicao_atualizar.e_padrao):
            return Response({'erro': 'Usuário não tem permissão para atualizar a refeição padrão.'}, status=status.HTTP_401_UNAUTHORIZED)

        dados_refeicao = request.data
        dados_refeicao["e_padrao"] = False

        serializer = RefeicaoSerializer(refeicao_atualizar, data=dados_refeicao, partial=True)

        if serializer.is_valid(raise_exception = True):
            refeicao_atualizada = serializer.save(commit=False)
            refeicao_atualizada.atualizar_campos_acumulados()  # Aplica a lógica de atualizar_campos_acumulados()
            refeicao_atualizada.save()  # Salva a refeição atualizada no banco de dados
            serializer_2 = RefeicaoSerializer(refeicao_atualizada)
            if serializer_2.is_valid(raise_exception=True):
                return Response(serializer_2.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, idRefeicao = None, format=None):
        # Verificando se conversor de caminho foi informado na requisição
        if idAlimento == None:
            return Response(['erro: o id do alimento deve ser informado na requisição'], status=status.HTTP_400_BAD_REQUEST)
        
        # Busca alimento pelo id
        try:
            refeicao_excluir = Refeicao.objects.get(id=idRefeicao)
        except Refeicao.DoesNotExist:
            return Response({'erro': 'Refeição não encontrada.'}, status=status.HTTP_404_NOT_FOUND)

        if (refeicao_excluir.e_padrao):
            return Response({'erro': 'Usuário não tem permissão para excluir a refeição padrão.'}, status=status.HTTP_401_UNAUTHORIZED)

        refeicao_excluir.delete()
        return Response({'mensagem': 'Refeição excluída com sucesso.'}, status=status.HTTP_200_OK)

    def inserir_alimento_em_refeicao(self, idRefeicao = None, idAlimento = None):
        # Verificando se conversor de caminho foi informado na requisição
        if idAlimento == None:
            return Response(['erro: o id do alimento deve ser informado na requisição'], status=status.HTTP_400_BAD_REQUEST)
        if idRefeicao == None:
            return Response(['erro: o id da refeicao deve ser informado na requisição'], status=status.HTTP_400_BAD_REQUEST)
        
        try:
            refeicao = Refeicao.objects.get(id=idRefeicao)
            alimento = Alimentos.objects.get(id=idAlimento)
            
        except Refeicao.DoesNotExist:
            return Response("Refeição não encontrada.", status=status.HTTP_404_NOT_FOUND)
        except Alimentos.DoesNotExist:
            return Response("Alimento não encontrado.", status=status.HTTP_404_NOT_FOUND)

        if refeicao.e_padrao:
            return Response({'erro': 'Usuário não tem permissão para atualizar a refeição padrão.'}, status=status.HTTP_401_UNAUTHORIZED)

        refeicao.alimentos_list.add(alimento)
        refeicao.atualizar_campos_acumulados()
        serializer = RefeicaoSerializer(refeicao)
        if serializer.is_valid():
            refeicao.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        

    def remover_alimento_da_refeicao(self, idRefeicao, idAlimento):
        # Verificando se conversor de caminho foi informado na requisição
        if idAlimento == None:
            return Response(['erro: o id do alimento deve ser informado na requisição'], status=status.HTTP_400_BAD_REQUEST)
        if idRefeicao == None:
            return Response(['erro: o id da refeicao deve ser informado na requisição'], status=status.HTTP_400_BAD_REQUEST)
        
        try:
            refeicao = Refeicao.objects.get(id=idRefeicao)
            alimento = Alimentos.objects.get(id=idAlimento)
            
        except Refeicao.DoesNotExist:
            return Response("Refeição não encontrada.", status=status.HTTP_404_NOT_FOUND)
        except Alimentos.DoesNotExist:
            return Response("Alimento não encontrado.", status=status.HTTP_404_NOT_FOUND)

        if refeicao.e_padrao:
            return Response({'erro': 'Usuário não tem permissão para atualizar a refeição padrão.'}, status=status.HTTP_401_UNAUTHORIZED)

        refeicao.alimentos_list.remove(alimento)
        refeicao.atualizar_campos_acumulados()
        serializer = RefeicaoSerializer(refeicao)
        if serializer.is_valid():
            refeicao.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        





@permission_classes([IsAdminUser])
class RefeicoesPadroesView(APIView):

    def post(self, request, format=None):
        refeicao_data = request.data.copy()
        if refeicao_data.__contains__('e_padrao'):
            refeicao_data.__setitem__('e_padrao', True) # Se requisição já tem o campo e_padrao, modifica-o para True
        else: # Caso contrário, adiciona par ('e_padrao', True) ao QueryDict
            refeicao_data["e_padrao"] = True
        serializer = RefeicaoSerializer(data=refeicao_data)
        if serializer.is_valid(raise_exception=True):
            nova_refeicao = serializer.save(commit = False)  
            # Aplica a lógica de atualizar campos acumulados na nova refeição
            nova_refeicao.atualizar_campos_acumulados()
            nova_refeicao.save()
            serializer_2 = RefeicaoSerializer(nova_refeicao)
            if serializer_2.is_valid(raise_exception=True):
                return Response(serializer_2.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def patch(self, request, idRefeicao = None, format=None):
        if idRefeicao == None:
            return Response(['erro: o id da refeicao deve ser informado na requisição'], status=status.HTTP_400_BAD_REQUEST)
        
        try:
            refeicao_atualizar = Refeicao.objects.get(id=idRefeicao)
        except Refeicao.DoesNotExist:
            return Response({'erro': 'Refeição não encontrada.'}, status=status.HTTP_404_NOT_FOUND)

        serializer = RefeicaoSerializer(refeicao_atualizar, data=request.data, partial=True)
        if serializer.is_valid(raise_exception=True):
            refeicao_atualizada = serializer.save(commit=False)
            refeicao_atualizada.atualizar_campos_acumulados()  # Aplica a lógica de atualizar_campos_acumulados()
            refeicao_atualizada.save()  # Salva a refeição atualizada no banco de dados
            serializer_2 = RefeicaoSerializer(refeicao_atualizada)
            if serializer_2.is_valid(raise_exception=True):
                return Response(serializer_2.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, idRefeicao = None, format=None):
        if idRefeicao == None:
            return Response(['erro: o id da refeicao deve ser informado na requisição'], status=status.HTTP_400_BAD_REQUEST)
        
        try:
            refeicao_excluir = Refeicao.objects.get(id=idRefeicao)
        except Refeicao.DoesNotExist:
            return Response({'erro': 'Refeição não encontrada.'}, status=status.HTTP_404_NOT_FOUND)

        refeicao_excluir.delete()
        return Response({'mensagem': 'Refeição excluída com sucesso.'}, status=status.HTTP_200_OK)

    def inserir_alimento_em_refeicao(self, idRefeicao = None, idAlimento = None):
        if idAlimento == None:
            return Response(['erro: o id do alimento deve ser informado na requisição'], status=status.HTTP_400_BAD_REQUEST)
        if idRefeicao == None:
            return Response(['erro: o id da refeicao deve ser informado na requisição'], status=status.HTTP_400_BAD_REQUEST)
        
        try:
            refeicao = Refeicao.objects.get(id=idRefeicao)
            alimento = Alimentos.objects.get(id=idAlimento)
            
        except Refeicao.DoesNotExist:
            return Response("Refeição não encontrada.", status=status.HTTP_404_NOT_FOUND)
        except Alimento.DoesNotExist:
            return Response("Alimento não encontrado.", status=status.HTTP_404_NOT_FOUND)

        
        refeicao.alimentos_list.add(alimento)
        refeicao.atualizar_campos_acumulados()
        serializer = RefeicaoSerializer(refeicao)
        if serializer.is_valid(raise_exception=True):
            refeicao.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def remover_alimento_da_refeicao(self, idRefeicao = None, idAlimento = None):
        if idAlimento == None:
            return Response(['erro: o id do alimento deve ser informado na requisição'], status=status.HTTP_400_BAD_REQUEST)
        if idRefeicao == None:
            return Response(['erro: o id da refeicao deve ser informado na requisição'], status=status.HTTP_400_BAD_REQUEST)
        
        try:
            refeicao = Refeicao.objects.get(id=idRefeicao)
            alimento = Alimento.objects.get(id=idAlimento)
            
        except Refeicao.DoesNotExist:
            return Response("Refeição não encontrada.", status=status.HTTP_404_NOT_FOUND)
        except Alimento.DoesNotExist:
            return Response("Alimento não encontrado.", status=status.HTTP_404_NOT_FOUND)

        
        refeicao.alimentos_list.remove(alimento)
        refeicao.atualizar_campos_acumulados()
        serializer = RefeicaoSerializer(refeicao)
        if serializer.is_valid(raise_exception=True):
            refeicao.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


