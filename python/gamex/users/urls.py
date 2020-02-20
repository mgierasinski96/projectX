from django.conf.urls import url, include
from rest_framework import routers
from rest_framework.authtoken.views import ObtainAuthToken
from . import views

router = routers.DefaultRouter()
router.register(r'users', views.UserViewSet, basename='UserView')

urlpatterns = [
    url(r'^', include(router.urls)),
    url(r'^auth/', ObtainAuthToken.as_view()),
]
