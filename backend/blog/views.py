from rest_framework import generics
from .models import Post
from .serializers import PostSerializer
from rest_framework.generics import get_object_or_404
from .pagination import CustomPageNumberPagination

class PostListView(generics.ListCreateAPIView):
    # queryset = Post.published.all()
    queryset = Post.objects.filter(status = Post.Status.PUBLISHED)
    serializer_class = PostSerializer
    pagination_class = CustomPageNumberPagination

class PostDetailView(generics.RetrieveAPIView):
    serializer_class = PostSerializer

    def get_object(self):
        return get_object_or_404(
            Post,
            publish__year=self.kwargs['year'],
            publish__month=self.kwargs['month'],
            publish__day=self.kwargs['day'],
            slug=self.kwargs['post']
        )