from .models import User
from rest_framework import serializers


class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'email', 'password', 'profession')
        extra_kwargs = {'password': {'write_only': True, 'required': True},
                        'username': {'write_only': True, 'required': False}}

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user


class UserStatsSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        exclude = ('password', 'email', 'date_joined', 'is_staff', 'is_superuser', 'is_admin', )
