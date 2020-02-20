from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from .models import User
from .serializers import UserSerializer, UserStatsSerializer


# Create your views here.
class UserViewSet(viewsets.ModelViewSet):
    serializer_class = UserSerializer
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)

    def list(self, request, *args, **kwargs):
        user = User.objects.filter(username=self.request.user.username)
        print(user)
        serializer = UserStatsSerializer(user, many=True)
        # return User.objects.filter(username=self.request.user.username)
        return Response(serializer.data)
