# from django.conf.urls import url, include
from django.urls import include, path
from rest_framework import routers
from rest_framework.authtoken.views import ObtainAuthToken
from . import views

router = routers.DefaultRouter()
router.register(r'user', views.UserViewSet, basename='user_view')
router.register(r'create', views.UserRegisterView, basename='user_register')
# router.register(r'training', views.UserStatsUpdateView, basename='user_training')

urlpatterns = [
    path(r'', include(router.urls)),
    path(r'auth/', ObtainAuthToken.as_view()),
    path(r'user/<int:id>/training/', views.UserStatsUpdateView.as_view(), name='train_view'),
    path(r'user/<int:id>/get-stats/', views.GetUserStatsView.as_view({'get': 'list'}), name='get_stats'),
    path(r'user/<int:id>/stats-price/', views.GetStatsPriceView.as_view({'get': 'list'}), name='get_prices'),
    path(r'user/<int:id>/add-exp/', views.UserExpUpdateView.as_view(), name='add_exp_view'),
    path(r'api-auth/', include('rest_framework.urls', namespace='rest_framework')),
]
