from django.http import JsonResponse
from rest_framework_simplejwt.tokens import RefreshToken

class RefreshTokenMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        response = self.get_response(request)

        if "HTTP_AUTHORIZATION" in request.META and request.user.is_authenticated and not request.user.is_anonymous:
            refresh = RefreshToken.for_user(request.user)
            refresh_token = str(refresh)
            response.set_cookie('refresh_token', refresh_token, httponly=True)

        return response
