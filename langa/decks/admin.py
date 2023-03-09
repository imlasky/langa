from django.contrib import admin

from .models import Card, Deck


class CardInline(admin.StackedInline):
    model = Card


@admin.register(Deck)
class DeckAdmin(admin.ModelAdmin):
    list_display = ("id", "name", "owner", "created_at", "updated_at", "private")
    list_filter = ("private", "created_at", "updated_at")
    search_fields = ("name",)
    inlines = [CardInline]


@admin.register(Card)
class CardAdmin(admin.ModelAdmin):
    list_display = ("id", "front_text", "deck", "owner", "created_at", "updated_at")
    list_filter = ("deck", "created_at", "updated_at")
    search_fields = ("front_text", "back_text")
