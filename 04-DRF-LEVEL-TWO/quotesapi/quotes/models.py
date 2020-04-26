from django.db import models

# Create your models here.
class Quote(models.Model):
    quote_author = models.CharField(max_length=30)
    quote_body = models.TextField()
    context = models.CharField(max_length=50,blank=True)
    source = models.URLField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.quote_author}: {self.context}"