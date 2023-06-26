from django.urls import path
from . import views

urlpatterns = [
    path('api/heroes/', views.heroes_list),
    path('api/heroes/<int:pk>/', views.hero_function),
    path('api/accounts/logout/', views.logout_user),
    path('api/accounts/login/', views.login_user),
]
