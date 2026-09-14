from django.db import models
from django.utils import timezone
from django.conf import settings

# Create your models here.

class PublishedManager(models.Manager):
    def get_queryset(self):
        return (
            super().get_queryset().filter(status = Post.Status.PUBLISHED)
        )

class Post(models.Model):
    class Status(models.TextChoices):
        DRAFT = ('DF', 'Draft')
        PUBLISHED = ('PB', 'Published')
    title = models.CharField(max_length = 250)
    slug = models.SlugField(max_length = 250, unique_for_date = 'publish')
    author = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete = models.CASCADE, related_name = 'blog_posts')
    body = models.TextField()
    publish = models.DateTimeField(default = timezone.now)
    created_at = models.DateTimeField(auto_now_add = True)
    updated_at = models.DateTimeField(auto_now = True)
    status = models.CharField(max_length = 2, choices = Status, default = Status.DRAFT)
    objects = models.Manager()
    published = PublishedManager()

    class Meta:
        ordering = ['-publish']
        indexes = [
            models.Index(fields = ['-publish'])
        ]
    def __str__(self):
        return self.title
    


# from django.db import models
# from django.conf import settings
# from django.utils import timezone

# class PublishManager(models.Manager):
#     def get_queryset(self):
#         return(
#             super().get_queryset().filter(status = Post.StatusChoices.PUBLISHED)
#         )
    
# class Post(models.Model):
#     class StatusChoices(models.TextChoices):
#         PUBLISHED = 'PB', 'Published'
#         DRAFT = 'DF', 'Draft'

#     title = models.CharField(max_length = 100)
#     slug = models.SlugField(max_length = 100)
#     status = models.CharField(max_length = 2, choices = StatusChoices, default = StatusChoices.DRAFT)
#     body = models.TextField()
#     author = models.ForeignKey(settings.DEFAULT_AUTH_MODEL, on_delete = models.CASCADE, related_name = 'blog_posts')
#     publish = models.DateTimeField(timezone.now)
#     created_at = models.DateTimeField(auto_now = True)
#     updated_at = models.DateTimeField(auto_now_add = True)
#     objects = models.Manager()
#     published = PublishManager()
#     class Meta:
#         ordering = ['-publish']
#         indexes = [
#             models.Index(fields = ['-publish'])
#         ]

#     def __str__(self):
#         return self.title
    