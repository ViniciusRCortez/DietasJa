from rest_framework import permissions
from rest_framework.generics import CreateAPIView
from django.contrib.auth.models import User
from .serializers import *

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from rest_framework import status

from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import AccessToken
import jwt
from rest_framework_simplejwt.authentication import JWTAuthentication



@permission_classes([AllowAny])
class NewUserMetricView(APIView):
    def post(self, request, format=None):
        user_metricsQueryDict = request.data.copy() 

        serializer = UserMetricSerializer(data=user_metricsQueryDict)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@permission_classes([IsAuthenticated])
class UserMetricView(APIView):
    def get(self, request, format=None):
        # Obtém o token JWT do cabeçalho Authorization
        token = request.META.get('HTTP_AUTHORIZATION').split(' ')[1]
        
        # Decodifica o token JWT
        decoded_token = jwt.decode(token, options={"verify_signature": False})
        
        # Acessar campos do token JWT
        access_token = AccessToken(token)
        user_id = access_token.payload['user_id']

        # Busca o user
        try:
            userMetric = UserMetric.objects.get(usuario=user_id)
        except UserMetric.DoesNotExist:
            return Response({'error': 'Metricas do Usuário não encontradas.'}, status=404)
        serializer = UserMetricSerializer(userMetric, many=False)

        return Response(serializer.data)
    

    def patch(self, request, format=None):
        # Obtém o token JWT do cabeçalho Authorization
        token = request.META.get('HTTP_AUTHORIZATION').split(' ')[1]
        
        # Decodifica o token JWT
        decoded_token = jwt.decode(token, options={"verify_signature": False})
        
        # Acessar campos do token JWT
        access_token = AccessToken(token)
        user_id = access_token.payload['user_id']

       # Busca o usuário pelo ID
        try:
            userMetric = UserMetric.objects.get(usuario=user_id)
        except UserMetric.DoesNotExist:
            return Response({'error': 'Metricas do Usuário não encontradas.'}, status=404)

        # Atualiza o usuário com os dados fornecidos na solicitação PATCH
        serializer = UserMetricSerializer(userMetric, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=200)
        return Response(serializer.errors, status=400)
    

    def delete(self, request, format=None):
        # Obtém o token JWT do cabeçalho Authorization
        token = request.META.get('HTTP_AUTHORIZATION').split(' ')[1]
        
        # Decodifica o token JWT
        decoded_token = jwt.decode(token, options={"verify_signature": False})
        
        # Acessar campos do token JWT
        access_token = AccessToken(token)
        user_id = access_token.payload['user_id']

         # Busca o usuário pelo ID
        try:
            userMetric = UserMetric.objects.get(usuario=user_id)
        except UserMetric.DoesNotExist:
            return Response({'error': 'Metricas do Usuário não encontradas.'}, status=404)

        # Deleta as metricas do usuário
        userMetric.delete()
        return Response({'message': 'Usuário deletado com sucesso.'}, status=204)


@permission_classes([IsAdminUser])
class ProtectedUserMetricView(APIView):
    def get(self, request, format=None):
        nome = request.query_params.get('nome')
        if nome == None:
            user_metrics = UserMetric.objects.all() 
        else:
            user_metrics = UserMetric.objects.filter(nome__contains=nome)

        if not user_metrics:
            return Response(status=status.HTTP_204_NO_CONTENT)
        
        serializer = UserMetricSerializer(user_metrics, many=True)
        return Response(serializer.data)
    

    def patch(self, request, format=None):
        # Busca o usuário pelo ID
        try:
            user_id = request.query_params.get('user_id')
            if id == None:
                return Response({'error': 'Metricas do Usuário não encontradas.'}, status=404)
            else:
                userMetric = UserMetric.objects.get(usuario=user_id)
        except UserMetric.DoesNotExist:
            return Response({'error': 'Metricas do Usuário não encontradas.'}, status=404)

        # Atualiza o usuário com os dados fornecidos na solicitação PATCH
        serializer = UserMetricSerializer(userMetric, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=200)
        return Response(serializer.errors, status=400)


    def delete(self, request, format=None):
        # Busca o usuário pelo ID
        try:
            user_id = request.query_params.get('user_id')
            if id == None:
                return Response({'error': 'Metricas do Usuário não encontradas.'}, status=404)
            else:
                userMetric = UserMetric.objects.get(usuario=user_id)
        except UserMetric.DoesNotExist:
            return Response({'error': 'Metricas do Usuário não encontradas.'}, status=404)

        # Deleta as metricas do usuário
        userMetric.delete()
        return Response({'message': 'Usuário deletado com sucesso.'}, status=204)
