from django.db import models

# Create your models here.
class Student(models.Model):
    first_name=models.CharField(max_length=255)
    last_name=models.CharField(max_length=255)
    roll=models.IntegerField()
    #def __str__(self):
     #   return f"{self.first_name} {self.last_name} {self.roll}"

class Teacher(models.Model):
    fname=models.CharField(max_length=255)
    lname=models.CharField(max_length=255)
    teacherId=models.IntegerField()
    