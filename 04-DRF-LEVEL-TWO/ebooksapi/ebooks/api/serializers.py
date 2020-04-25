from rest_framework import serializers
from ebooks.models import Ebook, Review
from django.db.models import Avg

class ReviewSerializer(serializers.ModelSerializer):
    # ebook = serializers.HyperlinkedRelatedField(view_name="ebook-detail",read_only=True)
    
    class Meta:
        model = Review
        # fields = "__all__"
        exclude = ("ebook",)

class EbookSerializer(serializers.ModelSerializer):
    reviews = ReviewSerializer(many=True,read_only=True)
    average_rating = serializers.SerializerMethodField()
    class Meta:
        model = Ebook
        fields = "__all__"

    def get_average_rating(self,Ebook):
        return Ebook.reviews.all().aggregate(Avg('rating'))['rating__avg']