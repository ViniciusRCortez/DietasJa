from rest_framework import permissions
from rest_framework.generics import CreateAPIView
from django.contrib.auth.models import User
from .serializers import *

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from rest_framework import status

from rest_framework.views import APIView

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
        nome = request.query_params.get('nome')
        if nome == None:
            user_metrics = UserMetric.objects.all() 
        else:
            user_metrics = UserMetric.objects.filter(nome__contains=nome)

        if not user_metrics:
            return Response(status=status.HTTP_204_NO_CONTENT)
        
        serializer = UserMetricSerializer(user_metrics, many=True)
        return Response(serializer.data)


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


