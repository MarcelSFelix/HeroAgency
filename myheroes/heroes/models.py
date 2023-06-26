from django.db import models

# Create your models here.

class Hero(models.Model):
    name = models.CharField(max_length=30)
    
    def __str__(self) -> str:
        return self.name