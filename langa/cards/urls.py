from django.urls import path

from langa.cards.views import index

app_name = "cards"
urlpatterns = [
    path("", view=index, name="index"),
]
