from rest_framework_simplejwt.views import TokenViewBase
from .serializers import *

from rest_framework import permissions
from rest_framework.generics import CreateAPIView
from django.contrib.auth.models import User

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated, IsAdminUser
from rest_framework.response import Response

from rest_framework_simplejwt.tokens import AccessToken
import jwt


@api_view(['POST'])
@permission_classes([AllowAny])
def CreateUserView(request):
    #Verifica se o usuario está no formato correto ou já exite
    serializer = UserSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()

        return Response(serializer.data, status=201)

    return Response(serializer.errors, status=400)


@api_view(['POST'])
@permission_classes([AllowAny])
def MyTokenObtainPairView(request):
    #Gera o Token
    serializer = MyTokenObtainPairSerializer(data=request.data)
    #Valida o Token
    serializer.is_valid(raise_exception=True)

    return Response(serializer.validated_data, status=200)


@api_view(['GET'])
@permission_classes([IsAdminUser])
def GetAllUsersView(request):
    #Busca todos os Users
    users = User.objects.all()
    serializer = UserSerializer(users, many=True)
    
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def GetUserByEmailView(request):
    # Obtém o token JWT do cabeçalho Authorization
    token = request.META.get('HTTP_AUTHORIZATION').split(' ')[1]
    
    # Decodifica o token JWT
    decoded_token = jwt.decode(token, options={"verify_signature": False})
    
    # Acessar campos do token JWT
    access_token = AccessToken(token)
    user_email = access_token.payload['user']

    # Busca o user
    user = User.objects.get(username=user_email)
    serializer = UserSerializer(user, many=False)

    return Response(serializer.data)
