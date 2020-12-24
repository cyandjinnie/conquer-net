from django.db import models
from django.utils.translation import gettext_lazy as _
from django.contrib.auth.models import User
from django.utils.timezone import now
from datetime import datetime

class Chat(models.Model):
    class TaskStatus(models.TextChoices):
        IN_PROGRESS = 'IP', _('In progress')
        ISSUES = 'IS', _('Issues')
        ON_HOLD = 'OH', _('On hold')

    title = models.CharField(max_length=100)
    status = models.CharField(
        max_length=2,
        choices=TaskStatus.choices,
        default=TaskStatus.IN_PROGRESS
    )
    executive = models.ForeignKey(User, on_delete=models.CASCADE, related_name='exec')
    responsible = models.ForeignKey(User, on_delete=models.CASCADE, related_name='resp')

    def __str__(self):
        return self.title[0:10] + "..."

class Message(models.Model):
    text = models.TextField()
    # datetime = models.DateTimeField()
    chat = models.ForeignKey(Chat, on_delete=models.CASCADE, related_name="chat")
    from_user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="sender")
    datetime = models.DateTimeField(default=datetime.now, blank=True)

    def __str__(self):
        return self.text[0:10] + "..."