from django.http import HttpResponse
from django.template import loader
from .models import Student
from .models import Teacher

def Student_view(request):
    StudentList= Student.objects.all()
    context={
        'StudentList':StudentList
    }
    template=loader.get_template('student.html')

    return HttpResponse(template.render(context,request))
def student_detail(request,id):
    singleStudent=Student.objects.get(id=id)
    data={
        'singleStudent':singleStudent,
    }
    template=loader.get_template('details.html')
    return HttpResponse(template.render(data,request))
def main(request):
    template=loader.get_template('main.html')
    return HttpResponse(template.render())

def teacher_view(request):
    template=loader.get_template('teacher.html')
    teacher_list=Teacher.objects.all()
    context={
        'teacher':teacher_list,
    }
    return HttpResponse(template.render(context,request))

def teacher_detail(request,id):
    template=loader.get_template('teacher_detail.html')
    singleTeacher=Teacher.objects.get(id=id)
    context={
        'teacher':singleTeacher,
    }
    return HttpResponse(template.render(context,request))