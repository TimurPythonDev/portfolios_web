from django.forms import ModelForm
from .models import ProjectComment,MyBlog,BlogComment




class ProjectCommentForm(ModelForm):
    class Meta:
        model = ProjectComment
        fields = '__all__'
        exclude = ['project']

    def __init__(self, *args, **kwargs):
        super(ProjectCommentForm, self).__init__(*args, **kwargs)
        self.fields['name'].widget.attrs.update(
            {'class': 'form-control'})
        self.fields['body'].widget.attrs.update(
            {'class': 'form-control', })
        

class MyBlogCommentForm(ModelForm):
    class Meta:
        model = BlogComment
        fields = '__all__'
        exclude = ['project']

    def __init__(self, *args, **kwargs):
        super(MyBlogCommentForm, self).__init__(*args, **kwargs)
        self.fields['name'].widget.attrs.update(
            {'class': 'form-control'})
        self.fields['body'].widget.attrs.update(
            {'class': 'form-control', })