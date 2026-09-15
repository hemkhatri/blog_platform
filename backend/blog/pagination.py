from rest_framework.pagination import PageNumberPagination 
from rest_framework.response import Response

class CustomPageNumberPagination(PageNumberPagination):
    page_size = 10
    page_size_query_param = 'size'
    page_query_param = 'q'
    max_page_size = 100

    def get_paginated_response(self, data):
        return Response({
            'meta':{
                'total_records': self.page.paginator.count,
                'current_page': self.page.number,
                'total_pages': self.page.paginator.num_pages,
                'next_link': self.get_next_link(),
                'previous_link': self.get_previous_link(), 
                'page_size': self.get_page_size(self.request),
            },
            'data': data
        })