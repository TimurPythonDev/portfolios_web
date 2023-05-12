import uuid
from django.db import models
from ckeditor_uploader.fields import RichTextUploadingField

from datetime import timezone


class ImageHomePage(models.Model):
	image = models.ImageField(upload_to='static/user_img')


class MySocialMedia(models.Model):
	title		= models.CharField(max_length=120)
	icon		= models.CharField(max_length=250)
	icon_info 	= models.CharField(max_length=220)

	def __str__(self):
		return self.title



class AboutMe(models.Model):

	""" About me models """

	name 			= models.CharField(max_length=120,verbose_name='Portfolio name')
	image 			= models.ImageField(upload_to='static/user_img')
	data_brith 		= models.DateField(u'Day of the data brith', help_text=u'Day of the event')
	address 		= models.CharField(max_length=200,verbose_name='Portfolio address')
	email 			= models.CharField(max_length=100,verbose_name='Portfolio email')
	phone_number 	= models.CharField(max_length=20,verbose_name='Portfolio phone number')
	complate_project= models.IntegerField()
	document 		= models.FileField(upload_to='documents/',verbose_name='Upload You CV')

	
	class Meta:
		verbose_name = 'About Me Data'

	def __str__(self):
		return self.name



class Experiance(models.Model):

	""" Experiance models """
	year 			= models.DateField(u'Day of the Experiance', help_text=u'Day of the event')
	posisions 		= models.CharField(max_length=200,verbose_name='Experiance posisions') 
	company_name	= models.CharField(max_length=255,verbose_name='Company name')
	descriptions  	= RichTextUploadingField()


	class Meta:
		verbose_name = 'My Experiance'

	def __str__(self):
		return self.posisions



class LanguageSkills(models.Model):
	""" Language Skills """
	title 			= models.CharField(max_length=100,verbose_name='Skills title')
	skill_style_with= models.CharField(max_length=10,verbose_name='Skills style with')
	skill_style_span= models.CharField(max_length=10,verbose_name='Skills style span')


	class Meta:
		verbose_name = 'Language Skills'


	def __str__(self):
		return self.title



class ProjectForingKeyName(models.Model):
    title =  models.CharField(max_length=255,verbose_name='Project title')

    class Meta:
    	verbose_name = 'Project Name'

    def __str__(self):
          return self.title


class ProjectName(models.Model):

    title 			= models.ForeignKey(ProjectForingKeyName,on_delete=models.CASCADE)
    image 			= models.ImageField(upload_to='static/project_img')
    year_completed  = models.DateTimeField(auto_now_add= True)
    slug 			= models.SlugField(null=True, blank=True)
    created 		= models.DateTimeField(auto_now_add=True)
    tags 			= models.ForeignKey('ProjectTag',on_delete=models.CASCADE)
    description 	= RichTextUploadingField()
    id 				= models.UUIDField(default=uuid.uuid4, unique=True,
                          primary_key=True, editable=False)


    class Meta:
        verbose_name = 'Project Name'

    def yearpublished(self):
        return self.year_completed.strftime('%Y')

    def __str__(self):
        return str(self.title)


class ProjectTag(models.Model):
    name = models.CharField(max_length=200, null=True)
    created = models.DateTimeField(auto_now_add=True)
    id = models.UUIDField(default=uuid.uuid4,  unique=True,
                          primary_key=True, editable=False)

    def __str__(self):
    	return self.name

class BlogTag(models.Model):
    name = models.CharField(max_length=200, null=True)
    created = models.DateTimeField(auto_now_add=True)
    id = models.UUIDField(default=uuid.uuid4,  unique=True,
                          primary_key=True, editable=False)

    def __str__(self):
    	return self.name


class ProjectComment(models.Model):
    project = models.ForeignKey(ProjectName, on_delete=models.CASCADE,related_name='comment_set')
    name = models.CharField(max_length=200)
    body = models.TextField(null=True, blank=True)
    created = models.DateTimeField(auto_now_add=True, null=True)

    def __str__(self):
        return self.body[0:50]


class MyBlog(models.Model):
    title = models.CharField(max_length=200)
    thumbnail = models.ImageField(null=True)
    body = RichTextUploadingField()
    tags = models.ForeignKey(BlogTag,on_delete=models.CASCADE)
    slug = models.SlugField(null=True, blank=True)
    created = models.DateTimeField(auto_now_add=True)

    id = models.UUIDField(default=uuid.uuid4, unique=True,
                          primary_key=True, editable=False)

    def __str__(self):
        return self.title

    class Meta:
        verbose_name = 'My Blog'

    def publish(self):
        self.created = models.DateTimeField(default=timezone.now)
        self.save()



class BlogComment(models.Model):
    project = models.ForeignKey(MyBlog, on_delete=models.CASCADE,related_name='comment_set')
    name = models.CharField(max_length=200)
    body = models.TextField(null=True, blank=True)
    created = models.DateTimeField(auto_now_add=True, null=True)

    def __str__(self):
        return self.name




class Contact(models.Model):
    name = models.CharField(max_length=200, null=True)
    email = models.CharField(max_length=200, null=True)
    body = models.TextField()
    is_read = models.BooleanField(default=False)
    created = models.DateTimeField(auto_now_add=True)
    id = models.UUIDField(default=uuid.uuid4,  unique=True,
                          primary_key=True, editable=False)

    def __str__(self):
        return self.name