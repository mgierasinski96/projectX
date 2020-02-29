from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager


class Profession(models.Model):
    name = models.CharField(max_length=20, unique=True)
    # ability = # TODO: set unique ability for each class
    avatar = models.TextField()

    # stats price
    strength  = models.FloatField() # WR: 2.6, SC : 2.2
    wisdom    = models.FloatField() # WR: 2.2, SC : 2.6
    luck      = models.FloatField(default=2.4) # WR: 2.4, SC : 2.4
    toughness = models.FloatField(default=2.3) # WR: 2.3, SC : 2.3

    # Health Points
    hp_tgh_multi = models.FloatField(default=12.5)  # WR: 16.5, SC : 12.5
    hp_lvl_diff  = models.FloatField(default=-1)     # WR: -1, SC :

    # Resistances
    def_stat = models.CharField(max_length=20, unique=False) # WR: 'wisdom, SC : 'strength'

    # Damage
    dmg_stat = models.CharField(max_length=20, unique=False) # WR: 'strength, SC : 'wisdom'

    REQUIRED_FIELDS = ['__all__']

    def __str__(self):
        return self.name


class UserManager(BaseUserManager):
    def set_initial_data(self, user, prof):
        # TODO: Calculate initial user data here!
        user_stats = {
            'strength': user.strength,
            'wisdom': user.wisdom,
            'luck': user.luck,
            'toughness': user.toughness
        }
        hp                  = user.toughness * prof.hp_tgh_multi
        dmg                 = 1 + user_stats[prof.dmg_stat] / 10
        resistance          = user_stats[prof.def_stat] / 2
        user.max_hp         = hp
        user.current_hp     = hp
        user.total_damage   = dmg
        user.defense        = resistance
        return user

    def create_user(self, email, username, profession, password=None):
        if not email:
            raise ValueError("User must have an email address")
        if not username:
            raise ValueError("User must have an username")
        if not profession:
            raise ValueError("User must have a profession")

        user = self.model(email=self.normalize_email(email),
                          username=username,
                          profession=profession,)
        user.set_password(password)

        # Set initial user parameters
        user = self.set_initial_data(user, profession)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, username, profession, password):
        user = self.create_user(email=self.normalize_email(email),
                                profession=profession,
                                password=password,
                                username=username, )
        user.is_admin = True
        user.is_staff = True
        user.is_superuser = True
        user.save(using=self._db)
        return user


# Create your models here.
class User(AbstractBaseUser):
    # User info
    email           = models.EmailField(verbose_name='email', max_length=60, unique=True)
    username        = models.CharField(max_length=30, unique=True)
    date_joined     = models.DateTimeField(verbose_name='date joined', auto_now_add=True)
    last_login      = models.DateTimeField(verbose_name='last login', auto_now_add=True)
    is_admin        = models.BooleanField(default=False)
    is_active       = models.BooleanField(default=True)
    is_staff        = models.BooleanField(default=False)
    is_superuser    = models.BooleanField(default=False)

    # Valuables
    gold         = models.IntegerField(default=10)
    premium_curr = models.IntegerField(default=10)

    # Character statistics
    WARRIOR = '1'
    SORCERER = '2'
    PROFESSION_CHOICES = [
        (WARRIOR, 'Warrior'),
        (SORCERER, 'Sorcerer'),
    ]

    profession = models.ForeignKey(Profession, on_delete=models.CASCADE, null=True, blank=True)

    max_hp       = models.FloatField(default=100)
    current_hp   = models.FloatField(default=100)
    level        = models.IntegerField(default=1)
    exp          = models.FloatField(default=0)    # current lvl exp
    total_exp    = models.FloatField(default=0)    # total exp earned from the beginning
    stamina      = models.IntegerField(default=20)
    strength     = models.IntegerField(default=10)
    wisdom       = models.IntegerField(default=10)
    luck         = models.IntegerField(default=10)
    toughness    = models.IntegerField(default=10)
    total_damage = models.FloatField(default=7.5)
    defense      = models.FloatField(default=2.5)

    # Login with email
    USERNAME_FIELD  = 'username'
    REQUIRED_FIELDS = ['email', 'password',]

    objects = UserManager()

    def __str__(self):
        return self.email

    def has_perm(self, perm, obj=None):
        return self.is_admin

    def has_module_perms(self, app_label):
        return True
