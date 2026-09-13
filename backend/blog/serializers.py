from rest_framework import serializers
from .models import Post

class PostSerializer(serializers.ModelSerializer):
    author_name = serializers.ReadOnlyField(source = 'author.username')
    status_display = serializers.CharField(source = 'get_status_display', read_only = True)
    class Meta:
        model = Post
        fields = ['id', 'title', 'slug', 'author_name', 'body', 'publish', 'created_at', 'updated_at', 'status', 'status_display']