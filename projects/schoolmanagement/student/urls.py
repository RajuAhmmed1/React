from django.urls import path
from . import views

urlpatterns = [
    path ('',views.main, name='main'),
    path('student/', views.Student_view, name='student_view'),  # Student list view
    path('student/detail/<int:id>/', views.student_detail, name='student_detail'),  # Detail view with trailing slash
    path('teacher/', views.teacher_view,name='teacher_view'),
    path('teacher/detail/<int:id>/', views.teacher_detail, name='teacher_detail')
]
