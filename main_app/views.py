import os
from django.shortcuts import render
from django.views.generic import View,ListView
from django.views.generic import TemplateView
from django.http import HttpResponse
from .models import AboutMe,MySocialMedia,Experiance,LanguageSkills,ProjectName,MyBlog,BlogTag,Contact
from .forms import ProjectCommentForm,MyBlogCommentForm
from django.contrib import messages
from datetime import timezone
from django.shortcuts import redirect
import requests
from django.conf import settings
from django.shortcuts import render
from django.contrib import messages
from django.shortcuts import redirect


class HomePage(View):
	def get(self,request):
		my_socials = MySocialMedia.objects.all()

		context = {
			'my_socials':my_socials
		}	
		return render(request,'index.html',context)

	

def ContactView(request):
	contact = Contact.objects.all()
	if request.method == 'POST':
		Contact.objects.create(
			name = request.POST.get('name'),
            email = request.POST.get('email'),
            body = request.POST.get('body'),
        )
		token = settings.TELEGRAM_BOT_CHAT_ID
		text_contact =  f"🆘Message constructor CONTACT \n Support @Timur4047 \n \n"
		text_contact += f"🗣Name: {request.POST.get('name')} \n"  
		text_contact += f"📧Email: {str(request.POST.get('email'))}\n" 
		text_contact += f"📝Message: {request.POST.get('body')}\n"
			
		url = f"https://api.telegram.org/bot"  + token + "/sendMessage?chat_id="
		requests.get(url + str(5040196062) + '&text=' + text_contact) 
		return redirect('/')
	context = {
        'contact':contact,
    }
	return render(request,'contact.html',context)
    
class AboutPage(View):
	def get(self,request):
		about_me = AboutMe.objects.get()
		social_media = MySocialMedia.objects.all()
		experiances = Experiance.objects.all()
		skills = LanguageSkills.objects.all()
		project_name = ProjectName.objects.all().order_by('-created')
		my_blogs = MyBlog.objects.all().order_by('-created')


		context = {
			'about_me':about_me,
			'social_media':social_media,
			'experiances':experiances,
			'skills':skills,
			'project_name':project_name,
			'my_blogs':my_blogs
		}
		return  render(request,'about.html',context)


class ProjectSingle(View):
	model = ProjectName
	def get(self,request,pk):
		project_single = ProjectName.objects.get(id=pk)
		count= project_single.comment_set.count()
		project_comment = project_single.comment_set.all().order_by('created')
		blog_random_object = MyBlog.objects.order_by('?')[:3]


		form = ProjectCommentForm()
		if request.method == 'POST':
			form = ProjectCommentForm(request.POST)
			if form.is_valid():
				comment = form.save(comment=False)
				comment.project_single = project_single
				comment.save()
				messages.success(request, 'Your comment was successfully added!')
		context = {
			'project_single': project_single,
        	'form':form,
        	'project_comment':project_comment,
        	'count':count,
			'blog_random_object':blog_random_object,
		}
		return render(request,'project_singl.html', context)

class Blog(View):

	def get(self,request):
		blogs = MyBlog.objects.all().order_by('-created')
		

		context = {
			'blogs':blogs,
			
		}
		return render(request,'blog.html',context)


class BlogSingle(View):
	model = MyBlog
	def get(self,request,pk):
		blog_singles = MyBlog.objects.get(id=pk)
		blog_random_object = MyBlog.objects.order_by('?')[:3]
		blog_tag = BlogTag.objects.all()
		count = blog_singles.comment_set.count()
		comments = blog_singles.comment_set.all().order_by('-created')
		
		form = MyBlogCommentForm()

		if request.method == 'POST':
			form = MyBlogCommentForm(request.POST)
			if form.is_valid():
				comment = form.save(commit=False)
				comment.blog_singles = blog_singles
				comment.save()
				messages.success(request, 'Your comment was successfully added!')
			return redirect('blog_single')
			
		context = {
			'blog_singles':blog_singles,
			'blog_random_object':blog_random_object,
			'count':count,
			'comments':comments,
			'form':form,
			'blog_tag':blog_tag
		}

		return render(request,'single.html',context)
	
		

	
def download_file(request):
	file_path = 'media/documents/timur-portfolios.pdf'
	with open(file_path, 'rb') as fh:
		response = HttpResponse(fh.read(), content_type="application/pdf")
		response['Content-Disposition'] = 'inline; filename=' + os.path.basename(file_path)
	return response					