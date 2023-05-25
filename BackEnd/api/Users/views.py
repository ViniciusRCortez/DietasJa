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



#@api_view(['POST'])
@permission_classes([AllowAny])
class CreateUserView(CreateAPIView):
    model = User
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = UserSerializer


#@api_view(['POST'])
@permission_classes([AllowAny])
class MyTokenObtainPairView(TokenViewBase):
    serializer_class = MyTokenObtainPairSerializer


@api_view(['GET'])
@permission_classes([IsAdminUser])
def GetAllUsersView(request):
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
