from django.urls import path
from . import views

urlpatterns = [
    path('api/heroes/', views.list_or_create_hero),
    path('api/heroes/<int:pk>/', views.get_or_update_hero),
    path('api/accounts/logout/', views.logout_user),
    path('api/accounts/login/', views.login_user),
]
