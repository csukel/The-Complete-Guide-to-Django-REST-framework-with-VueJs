from django.db import models
from django_countries.fields import CountryField
# Create your models here.

class JobOffer(models.Model):
    company_name = models.CharField(max_length=60)
    company_email = models.EmailField(max_length=60)
    job_title = models.CharField(max_length=30)
    job_description = models.TextField()
    salary = models.DecimalField(max_digits=10, decimal_places=2)
    city = models.CharField(max_length=60,blank=True)
    # country = models.CharField(max_length=60)
    country = CountryField(blank_label='(Select country)')
    created_at = models.DateTimeField(auto_now_add=True)
    available = models.BooleanField(default=True)

    def __str__(self):
        return f"{ self.company_name }: { self.job_title }, { self.city }, { self.country }"
