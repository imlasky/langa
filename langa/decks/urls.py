from django.urls import path

from . import views

app_name = "decks"

urlpatterns = [
    path("", views.discover, name="discover"),
    path("my_decks/", views.deck_list, name="my_decks"),
    path("<uuid:deck_id>/", views.deck_detail, name="deck_detail"),
    path("create/", views.deck_create, name="deck_create"),
    path("update/<uuid:deck_id>/", views.deck_update, name="deck_update"),
    path("delete/<uuid:deck_id>/", views.deck_delete, name="deck_delete"),
    path("create/<uuid:deck_id>/", views.card_create, name="card_create"),
]
