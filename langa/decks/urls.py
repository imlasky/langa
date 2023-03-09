from django.urls import path

from . import views

app_name = "decks"

urlpatterns = [
    path("", views.discover, name="discover"),
    path("my_decks/", views.my_decks, name="my_decks"),
    path("<uuid:deck_id>/", views.deck_detail, name="deck_detail"),
    path("create/", views.create_deck, name="create_deck"),
    path("edit/<uuid:deck_id>/", views.edit_deck, name="edit_deck"),
    path("delete/<uuid:deck_id>/", views.delete_deck, name="delete_deck"),
    path("create/<uuid:deck_id>/", views.create_card, name="create_card"),
]
