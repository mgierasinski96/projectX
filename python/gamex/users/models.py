from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager


class UserManager(BaseUserManager):
    def create_user(self, email, username, profession, password=None):
        if not email:
            raise ValueError("User must have an email address")
        if not username:
            raise ValueError("User must have an username")
        user = self.model(email=self.normalize_email(email),
                          username=username,
                          profession=profession,)
        user.set_password(password)
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
    email = models.EmailField(verbose_name='email', max_length=60, unique=True)
    username = models.CharField(max_length=30, unique=True)
    date_joined = models.DateTimeField(verbose_name='date joined', auto_now_add=True)
    last_login = models.DateTimeField(verbose_name='last login', auto_now_add=True)
    is_admin = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)

    # Valuables
    gold = models.IntegerField(default=10)
    premium_curr = models.IntegerField(default=10)

    # Character statistics
    WARRIOR = 'WR'
    SORCERER = 'SC'
    PROFESSION_CHOICES = [
        (WARRIOR, 'Warrior'),
        (SORCERER, 'Sorcerer'),
    ]
    profession = models.CharField(max_length=20,
                                  choices=PROFESSION_CHOICES,
                                  default=WARRIOR)  # TODO: change to relation with professions' table
    max_hp = models.IntegerField(default=100)
    current_hp = models.IntegerField(default=100)
    level = models.IntegerField(default=1)
    exp = models.FloatField(default=0)  # current lvl exp
    total_exp = models.FloatField(default=0)  # total exp earned from the beginning
    stamina = models.IntegerField(default=20)
    strength = models.IntegerField(default=10)
    wisdom = models.IntegerField(default=10)
    luck = models.IntegerField(default=10)
    toughness = models.IntegerField(default=10)
    total_damage = models.FloatField(default=7.5)
    defense = models.FloatField(default=2.5)

    # Login with email
    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = ['email', 'profession',]

    objects = UserManager()

    def __str__(self):
        return self.email

    def has_perm(self, perm, obj=None):
        return self.is_admin

    def has_module_perms(self, app_label):
        return True
