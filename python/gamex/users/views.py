from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.generics import UpdateAPIView
from django.http import QueryDict

from .models import User
from .serializers import (
    UserSerializer,
    UserDetailSerializer,
    UserStatsSerializer,
    UserExpSerializer,
    GetStatsSerializer,
    GetStatsPriceSerializer
    )
import math


# Create your views here.
class UserRegisterView(viewsets.ModelViewSet):
    queryset = User.objects.none()
    serializer_class = UserSerializer


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserDetailSerializer
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)

    def list(self, request, *args, **kwargs):
        user = User.objects.filter(id=request.user.id)
        # user = User.objects.all()
        serializer = UserDetailSerializer(user, many=True)
        return Response(serializer.data)


class UserStatsUpdateView(UpdateAPIView):
    queryset = User.objects.all()
    serializer_class = UserStatsSerializer
    lookup_field = 'id'
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)

    @classmethod
    def get_extra_actions(cls):
        return []

    # def get_object(self, id):
    #     return User.objects.filter(id=id).first()

    def patch(self, request, is_item=False, *args, **kwargs):
        model = request.user
        skill_name = request.data['skill']
        value = getattr(model, skill_name)
        data = {skill_name: value}
        serializer = UserStatsSerializer(model, fields=(request.data['skill'],), data=data, partial=True)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
        return Response(serializer.data)


class UserExpUpdateView(UpdateAPIView):
    queryset = User.objects.none()
    serializer_class = UserExpSerializer
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)

    @classmethod
    def get_extra_actions(cls):
        return []

    def patch(self, request, *args, **kwargs):
        model = request.user
        serializer = UserExpSerializer(model, data=request.data, partial=True)

        if serializer.is_valid():
            print('save')
            serializer.save()

        return Response(serializer.data)


class GetUserStatsView(viewsets.ModelViewSet):
    queryset = User.objects.none()
    serializer_class = GetStatsSerializer
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)

    def list(self, request, *args, **kwargs):
        user = User.objects.filter(id=request.user.id)
        serializer = GetStatsSerializer(user, many=True)
        return Response(serializer.data)


class GetStatsPriceView(viewsets.ModelViewSet):
    queryset = User.objects.none()
    serializer_class = GetStatsPriceSerializer
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)

    def get_price(self, prof, name, value):
        multiplier  = getattr(prof, name)
        return math.floor(math.pow((value - 4), multiplier))

    def list(self, request, *args, **kwargs):
        user = User.objects.filter(id=request.user.id)
        prof = user.first().profession
        serializer = GetStatsPriceSerializer(user, many=True)
        return_data = {name: self.get_price(prof, name, value) for (name, value) in serializer.data[0].items()}

        return Response(return_data)
