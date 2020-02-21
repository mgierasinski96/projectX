from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from .models import User
from .serializers import UserSerializer, UserStatsSerializer


# Create your views here.
class UserRegisterView(viewsets.ModelViewSet):
    queryset = User.objects.none()
    serializer_class = UserSerializer


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.none()
    serializer_class = UserStatsSerializer
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)

    def list(self, request, *args, **kwargs):
        user = User.objects.filter(username=self.request.user.username)
        serializer = UserStatsSerializer(user, many=True)
        return Response(serializer.data)
