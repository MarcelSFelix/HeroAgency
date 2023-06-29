from django.forms.models import model_to_dict
from django.http import JsonResponse
import json
from django.contrib.auth.decorators import login_required

from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User


from django.views.decorators.csrf import csrf_exempt

from .models import Hero


@login_required
def list_or_create_hero(request):
    if not request.user or not request.user.is_authenticated:
        return JsonResponse({'message': 'User does not exist or is not authenticated'}, status=403)
    if request.method == "GET":
        heroes = list(Hero.objects.values())
        return JsonResponse(heroes, safe=False, status=200)

    elif request.method == "POST":
        hero_data = handle_errors_json(request)
        hero = Hero(name=hero_data.get('name'))
        hero.save()
        response_data = {'name': hero.name, 'id': hero.pk}
        return JsonResponse(response_data, status=201)

@login_required
def get_or_update_hero(request, pk):
    if not request.user or not request.user.is_authenticated:
        return JsonResponse({'message': 'User does not exist or is not authenticated'}, status=403)
    if request.method == "GET":
            hero = handle_error_get_hero(request, pk)
            hero_data = model_to_dict(hero)
            return JsonResponse(hero_data, status=200)
    elif request.method == "PUT":
        hero_data = handle_errors_json(request)
        hero = handle_error_get_hero(request, pk)      
        hero.name = hero_data.get('name')
        hero.save()
        response_data = {'name': hero.name, 'id': hero.pk}
        return JsonResponse(response_data, status=200)
    elif request.method == "DELETE":
        hero = handle_error_get_hero(request, pk) 
        hero.delete()
        return JsonResponse({'message': 'Hero deleted successfully'}, status=200)
    else:
        return JsonResponse({'error': 'Invalid request method'}, status=405)
    
 
def handle_errors_json(request, requested_key=None):
    try:
        hero_data = json.loads(request.body)
        if 'name' not in hero_data:
                raise KeyError("Attribute 'name' does not exist")
    except json.JSONDecodeError:
                return JsonResponse({'error': 'Could not decode JSON - check formatting'}, status=400)
    except KeyError as e:
         return JsonResponse({'error': e}, status=422)
    return hero_data

def handle_error_get_hero(request, pk):
     try:
        return Hero.objects.get(pk=pk)
     except Hero.DoesNotExist:
        return JsonResponse({'error': f'Hero with ID {pk} does not exist'}, status=404)

@csrf_exempt
def login_user(request):
    try:
        login_data = json.loads(request.body)
        input_username = login_data.get("username")
        input_password = login_data.get("password")
        user = authenticate(request, username=input_username, password=input_password)
        if user is not None:
            login(request, user)
            return JsonResponse({'message': 'Login successful', 'username': input_username}, status=200)
        else:
            return JsonResponse({'error': 'Username or Password incorrect'}, status=403)
    except json.JSONDecodeError:
        return JsonResponse({'error': 'Invalid JSON data'}, status=400)

@login_required
def logout_user(request):
    logout(request)
    return JsonResponse({'message': 'Logout successful'}, status=200)
