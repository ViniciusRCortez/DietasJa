from rest_framework_simplejwt.views import TokenViewBase
from .serializers import MyTokenObtainPairSerializer

class MyTokenObtainPairView(TokenViewBase):
    serializer_class = MyTokenObtainPairSerializer
