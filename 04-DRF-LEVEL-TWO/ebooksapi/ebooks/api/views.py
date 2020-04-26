from rest_framework import generics, mixins
from rest_framework.generics import get_object_or_404
from ebooks.models import Ebook, Review
from ebooks.api.serializers import EbookSerializer, ReviewSerializer
from rest_framework import permissions
from ebooks.api.permissions import IsAdminUserOrReadOnly, IsReviewAuthorOrReadOnly
from rest_framework.exceptions import ValidationError

class EbookListCreateAPIView(generics.ListCreateAPIView):
    queryset = Ebook.objects.all()
    serializer_class = EbookSerializer
    permission_classes = [IsAdminUserOrReadOnly]


class EbookDetailAPIView(generics.RetrieveUpdateDestroyAPIView):

    queryset = Ebook.objects.all()
    serializer_class = EbookSerializer
    permission_classes = [IsAdminUserOrReadOnly]



class ReviewCreateAPIView(generics.CreateAPIView):
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        ebook_pk = self.kwargs.get('ebook_pk')
        ebook = get_object_or_404(Ebook,pk=ebook_pk)

        review_author = self.request.user

        review_queryset = Review.objects.filter(ebook=ebook,review_author=review_author)
        if review_queryset.exists():
            raise ValidationError("You have already reviewed this ebook")
        serializer.save(ebook=ebook,review_author=review_author)


class ReviewDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer
    permission_classes = [IsReviewAuthorOrReadOnly]