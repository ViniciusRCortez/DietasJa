from rest_framework_simplejwt.views import TokenViewBase
from .serializers import MyTokenObtainPairSerializer, UserSerializer

from rest_framework import permissions
from rest_framework.generics import CreateAPIView
from django.contrib.auth.models import User

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated, IsAdminUser
from rest_framework.response import Response



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
#@permission_classes([IsAuthenticated])
def GetAllUsersView(request):
    users = User.objects.all()
    serializer = UserSerializer(users, many=True)
    return Response(serializer.data)
