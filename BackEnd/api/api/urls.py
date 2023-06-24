"""
URL configuration for api project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path

from Users.views import *
from Alimentos.views import *
from UserMetrics.views import*
from MetaDiaria.views import *
from MetaGamificada.views import *
from Consumo.views import *
from Refeicao.views import *
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView, TokenVerifyView

from rest_framework import permissions
from drf_yasg.views import get_schema_view
from drf_yasg import openapi

schema_view = get_schema_view(
    openapi.Info(
        title="DietasJá API",
        default_version="v1",
        description="API de app de contagem de calorias",
        terms_of_service="https://www.example.com/terms/",
        contact=openapi.Contact(email="contact@example.com"),
        license=openapi.License(name="BSD License"),
    ),
    public=True,
    permission_classes=(permissions.AllowAny,),
)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('swagger/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    path('redoc/', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),
    path('api/login/', MyTokenObtainPairView, name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/token/verify/', TokenVerifyView.as_view(), name='token_verify'),
    path('api/sign-in/', CreateUserView, name='create-user'),
    path('api/get-all/', GetAllUsersView, name='get-all-users'),
    path('api/get-user/', GetUserByUsernameView, name='get-user-by-username'),
    path('api/update-user/', UpdateUserByUsernameView, name='update-user-by-username'),
    path('api/update-user-id/<int:user_id>', UpdateUserByIdView, name='update-another-user-by-id'),
    path('api/delete-user/', DeleteUserByUsernameView, name='delete-user-by-username'),
    path('api/delete-user-id/<int:user_id>', DeleteUserByIdView, name='delete-another-user-by-id'),
    path('api/alimentos/', AlimentosView.as_view(), name="alimentos"),
    path('api/alimentos/<int:idAlimento>', AlimentosView.as_view(), name="atualizar-deletar-alimento-pelo-id"),
    path('api/alimentos-padroes/', AlimentosPadroesView.as_view(), name="alimentos-padroes"),
    path('api/alimentos-padroes/<int:idAlimento>', AlimentosPadroesView.as_view(), name="atualizar-deletar-alimentos-padroes"),
    path('api/meta/', MetaDiariaView.as_view(), name="meta"),
    path('api/meta-gamificada/', MetaGamificadaView.as_view(), name="meta-gamificada"),
    path('api/meta-gamificada/<str:periodo>', MetaGamificadaView.as_view(), name="meta-gamificada"),
    path('api/user-metrics/', UserMetricView.as_view(), name="user-metrics"),
    path('api/new-user-metrics/', NewUserMetricView.as_view(), name="post-user-metrics"),
    path('api/protected-user-metrics/', ProtectedUserMetricView.as_view(), name="admin-user-metrics"),
    path('api/refeicoes/', RefeicoesView.as_view(), name='refeicoes-list'),
    path('api/refeicoes/<int:idRefeicao>/', RefeicoesView.as_view(), name='refeicoes-atualizar-ou-deletar-pelo-id'),
    path('api/refeicoes/<int:idRefeicao>/inserir-alimento/<int:idAlimento>/', RefeicoesView.as_view(), name='refeicoes-inserir-alimento'),
    path('api/refeicoes/<int:idRefeicao>/remover-alimento/<int:idAlimento>/', RefeicoesView.as_view(), name='refeicoes-remover-alimento'),
    path('api/refeicoes-padroes/', RefeicoesPadroesView.as_view(), name='refeicoes-padroes-list'),
    path('api/refeicoes-padroes/<int:idRefeicao>/', RefeicoesPadroesView.as_view(), name='refeicoes-padroes-atualizar-ou-deletar-pelo-id'),
    path('api/refeicoes-padroes/<int:idRefeicao>/inserir-alimento/<int:idAlimento>/', RefeicoesPadroesView.as_view(), name='refeicoes-padroes-inserir-alimento'),
    path('api/refeicoes-padroes/<int:idRefeicao>/remover-alimento/<int:idAlimento>/', RefeicoesPadroesView.as_view(), name='refeicoes-padroes-remover-alimento'),
    path('api/consumos/', ConsumoView.as_view(), name='consumo-list'),
    path('api/consumos/<int:idConsumo>/', ConsumoView.as_view(), name='consumo-atualizar-ou-deletar-pelo-id'),
    path('api/consumos/<int:idConsumo>/refeicoes/<int:idRefeicao>/adicionar/', ConsumoView.as_view(), name='consumo-adicionar-refeicao'),
    path('api/consumos/<int:idConsumo>/refeicoes/<int:idRefeicao>/remover/', ConsumoView.as_view(), name='consumo-remover-refeicao')
]