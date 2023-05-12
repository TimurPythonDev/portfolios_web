
from django.urls import path
from .views import (
    HomePage,
    AboutPage,
    download_file,
    ProjectSingle,
    BlogSingle,
    Blog,
    ContactView,
)


urlpatterns = [
	path('',HomePage.as_view(),name='home_page'),
	path('about',AboutPage.as_view(),name='about'),
	path('download_file/',download_file,name='download_file'),
	path('project_single/<str:pk>/',ProjectSingle.as_view(),name='project_single'),
    path('blog_single/<str:pk>/',BlogSingle.as_view(),name='blog_single'),
    path('blog/',Blog.as_view(),name='blog'),

    path('contact/',ContactView,name='contact'),


]

