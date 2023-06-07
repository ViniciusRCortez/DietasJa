from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
import datetime 

from django.contrib.auth.models import User
from rest_framework import serializers
from django.contrib.auth.hashers import make_password


class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True)
    is_superuser = serializers.BooleanField(read_only=True)
    id = serializers.IntegerField(read_only=True)

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'password', 'is_superuser']

    def create(self, validated_data):
        validated_data['password'] = make_password(validated_data.get('password'))
        validated_data['is_superuser'] = False
        return super().create(validated_data)

    def update(self, instance, validated_data):
        password = validated_data.pop('password', None)
        if password:
            validated_data['password'] = make_password(password)
        return super().update(instance, validated_data)

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token['iat'] = datetime.datetime.now()
        token['user'] = user.username
        token['date'] = str(datetime.date.today())
        token['isAdmin'] = user.is_superuser

        return token
