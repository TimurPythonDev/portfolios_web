# Generated by Django 4.2 on 2023-05-12 08:50

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main_app', '0005_contact_created_contact_is_read_alter_contact_id'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='contact',
            name='created',
        ),
        migrations.RemoveField(
            model_name='contact',
            name='is_read',
        ),
        migrations.AlterField(
            model_name='contact',
            name='id',
            field=models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID'),
        ),
    ]