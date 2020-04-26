from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView
from quotes.api.serializer import QuoteSerializer, Quote
from quotes.api.permissions import IsAdminOrReadOnly
from quotes.api.pagination import QuotePagination


class QuoteListCreateAPIView(ListCreateAPIView):
    queryset = Quote.objects.all().order_by("-id")
    serializer_class = QuoteSerializer
    permission_classes = [IsAdminOrReadOnly]
    
    pagination_class = QuotePagination


class QuoteDetailAPIView(RetrieveUpdateDestroyAPIView):
    queryset = Quote.objects.all()
    serializer_class = QuoteSerializer
    permission_classes = [IsAdminOrReadOnly]
