from django.contrib import admin
from .models import Student,Teacher

class StudentAdmin(admin.ModelAdmin):
    list_display=("first_name","last_name","roll")

admin.site.register(Student,StudentAdmin)

class TeacherAdmin(admin.ModelAdmin):
    list_display=("fname","lname","teacherId")

admin.site.register(Teacher,TeacherAdmin)
