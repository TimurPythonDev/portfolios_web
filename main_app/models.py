from django.db import models




class AboutMe(models.Model):

	""" About me models """

	name 			= models.CharFields(max_length=120,verbose_name='Portfolio name')
	data_brith 		= models.DateField(u'Day of the data brith', help_text=u'Day of the event')
	address 		= models.CharFields(max_length=200,verbose_name='Portfolio address')
	email 			= models.CharFields(max_length=100,verbose_name='Portfolio email')
	phone_number 	= models.CharFields(max_length=20,verbose_name='Portfolio phone number')
	complate_project= models.IntegerField()
	document 		= models.FileField(upload_to='documents/',verbose_name='Upload You CV')

	
	class Meta:
		verbose_name = 'About Me Data'

	def __str__(self):
		return self.name



class Experiance(models.Model):

	""" Experiance models """
	year 			= models.DateField(u'Day of the Experiance', help_text=u'Day of the event')
	posisions 		= models.CharFields(max_length=200,verbose_name='Experiance posisions') 
	company_name	= models.CharFields(max_length=255,verbose_name'Company name')
	descriptions  	= RichTextUploadingField()


	class Meta:
		verbose_name = 'My Experiance'

	def __str__(self):
		return self.posisions



class LanguageSkills(models.Model):
	""" Language Skills """
	title 			= models.CharFields(max_length=100,verbose_name='Skills title')
	skill_style_with= models.CharFields(max_length=10,verbose_name='Skills style with')
	skill_style_span= models.CharFields(max_length=10,verbose_name='Skills style span')


	class Meta:
		verbose_name = 'Language Skills'


	def __str__(self):
		return self.title
					
