from django.contrib import admin


from .models import (
	AboutMe,
	MySocialMedia,
	Experiance,
	LanguageSkills,
	ProjectForingKeyName,
	ProjectName,
	ProjectTag,
	ProjectComment,
	MyBlog,
	BlogTag,
	BlogComment,
	MySocialMedia,
	Contact
	)




@admin.register(AboutMe)
class AboutMeAdmin(admin.ModelAdmin):
	list_display = ['name','data_brith','address','email','phone_number']
	list_editable = ['address','phone_number']

@admin.register(Experiance)
class ExperianceAdmin(admin.ModelAdmin):
	list_display = ('posisions','company_name','year')
	list_editable = ['company_name','year']


@admin.register(LanguageSkills)
class LanguageSkillsAdmins(admin.ModelAdmin):
	list_display = ('title','skill_style_with','skill_style_span')
	list_editable = ['skill_style_with','skill_style_span']
	
admin.site.register(MyBlog)
admin.site.register(BlogTag)


admin.site.register(ProjectForingKeyName)
admin.site.register(ProjectName)
admin.site.register(ProjectTag)
admin.site.register(ProjectComment)

admin.site.register(BlogComment)
admin.site.register(Contact)
admin.site.register(MySocialMedia)


