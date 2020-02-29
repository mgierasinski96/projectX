from .models import User, Profession
from rest_framework import serializers
import math

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'password', 'profession')
        extra_kwargs = {'password': {'write_only': True, 'required': True},
                        'username': {'write_only': True, 'required': False}}

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user


class UserDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        exclude = ('password', 'email', 'date_joined', 'is_staff', 'is_superuser', 'is_admin', )


class ProfessionDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profession
        fields = ('name', 'avatar', )


class DynamicFieldsModelSerializer(serializers.ModelSerializer):
    """
    A ModelSerializer that takes an additional `fields` argument that
    controls which fields should be displayed.
    """

    def __init__(self, *args, **kwargs):
        # Don't pass the 'fields' arg up to the superclass
        fields = kwargs.pop('fields', None)

        # Instantiate the superclass normally
        super(DynamicFieldsModelSerializer, self).__init__(*args, **kwargs)

        if fields is not None:
            # Drop any fields that are not specified in the `fields` argument.
            allowed = set(fields)
            existing = set(self.fields)
            for field_name in existing - allowed:
                self.fields.pop(field_name)


class UserStatsSerializer(DynamicFieldsModelSerializer):
    class Meta:
        model = User
        fields = ('strength', 'wisdom', 'toughness', 'luck',)

    def get_price(self, name, value):
        multiplier  = getattr(self.instance.profession, name)
        return math.floor(math.pow((value - 4), multiplier))

    def update_parameters(self, skill, value):
        print('update parameters')
        print(skill, ' : ', value)
        user = self.instance
        prof = user.profession
        if skill == 'toughness':
            hp  = value * prof.hp_tgh_multi        # hp calculated for new skill value
            hp -= (value - 1) * prof.hp_tgh_multi  # subtract old skill value
            return {'current_hp': hp, 'max_hp': user.max_hp - user.current_hp + hp}
        elif skill == 'wisdom' or skill == 'strength':
            if skill == prof.dmg_stat:
                # update dmg stat
                dmg = 1 + value / 10
                return {'total_damage': dmg}
            else:
                # update def stat
                defense = value / 2
                return {'defense': defense}
        elif skill == 'luck':
            # TODO: Add some fields for luck skill
            return {}

    def validate(self, attrs):
        name, value = list(attrs.items())[0]
        price = self.get_price(name, value)
        if self.instance.gold - price >= 0:
            data = self.update_parameters(name, value+1)
            data[name] = value + 1
            data['gold'] = self.instance.gold - price
            return data
        raise serializers.ValidationError('Not enough money for update!')


class UserExpSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('exp', 'level')
        extra_kwargs = {'level': {'required': False}}

    def get_next_lvl_exp(self, lvl):
        return 10 * (lvl + 1) - 10

    def validate(self, attrs):
        _, request_exp = list(attrs.items())[0]
        lvl = self.instance.level
        exp = self.instance.exp + request_exp
        total_exp = self.instance.total_exp + request_exp
        print(self.get_next_lvl_exp(lvl))
        while True:
            lvl_up_exp = self.get_next_lvl_exp(lvl)
            if exp >= lvl_up_exp:
                exp -= lvl_up_exp
                lvl += 1
            else:
                return {'exp': exp, 'total_exp': total_exp, 'level': lvl}


class GetStatsSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('strength', 'wisdom', 'toughness', 'luck')


class GetStatsPriceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profession
        fields = ('strength', 'wisdom', 'toughness', 'luck')
