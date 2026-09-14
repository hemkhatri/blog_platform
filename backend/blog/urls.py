from django.urls import path
from .views import PostListView, PostDetailView

urlpatterns = [
    path('', PostListView.as_view(), name = 'list_view'),
    path('<int:year>/<int:month>/<int:day>/<slug:post>/', PostDetailView.as_view(), name = 'detail_view'),
    # path('posts/<slug:slug>', PostDetailView.as_view(), name = 'detail_view'),
]