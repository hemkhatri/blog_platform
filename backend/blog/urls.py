from django.urls import path
from .views import PostListView, PostDetailView

urlpatterns = [
    path('posts/', PostListView.as_view(), name = 'list_view'),
    path('posts/<slug:slug>', PostDetailView.as_view(), name = 'detail_view'),
]