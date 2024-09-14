from django.http import HttpResponse
from django.template import loader
from .models import Member

def members(request):
    member_list=Member.objects.all
    template=loader.get_template('index.html')
    context={
        'member_list':member_list,
    }
    return HttpResponse(template.render(context,request))

