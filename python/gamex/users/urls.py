# from django.conf.urls import url, include
from django.urls import include, path
from rest_framework import routers
from rest_framework.authtoken.views import ObtainAuthToken
from . import views

router = routers.DefaultRouter()
router.register(r'user', views.UserViewSet, basename='userView')
router.register(r'create', views.UserRegisterView, basename='userRegister')

urlpatterns = [
    path(r'', include(router.urls)),
    path('auth/', ObtainAuthToken.as_view()),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),
]
