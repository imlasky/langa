from django.contrib import messages
from django.contrib.auth.decorators import login_required
from django.shortcuts import get_object_or_404, redirect, render

from .forms import CardForm, DeckForm
from .models import Deck


def discover(request):
    decks = Deck.objects.filter(private=False)
    print(decks)
    return render(request, "decks/discover.html", {"decks": decks})


@login_required
def my_decks(request):
    decks = Deck.objects.filter(owner=request.user)
    return render(request, "decks/my_decks.html", {"decks": decks})


@login_required
def deck_detail(request, deck_id):
    deck = get_object_or_404(Deck, id=deck_id)
    if deck.private and deck.owner != request.user:
        messages.error(request, "You do not have permission to view this deck.")
        return redirect("decks:home")
    cards = deck.card_set.all()
    return render(request, "decks/deck_detail.html", {"deck": deck, "cards": cards})


@login_required
def create_deck(request):
    if request.method == "POST":
        form = DeckForm(request.POST)
        if form.is_valid():
            deck = form.save(commit=False)
            deck.owner = request.user
            deck.save()
            messages.success(request, "Deck created successfully.")
            return redirect("decks:my_decks")
    else:
        form = DeckForm()
    return render(request, "decks/create_deck.html", {"form": form})


@login_required
def edit_deck(request, deck_id):
    deck = get_object_or_404(Deck, id=deck_id)
    if deck.owner != request.user:
        messages.error(request, "You do not have permission to edit this deck.")
        return redirect("decks:home")
    if request.method == "POST":
        form = DeckForm(request.POST, instance=deck)
        if form.is_valid():
            deck = form.save()
            messages.success(request, "Deck updated successfully.")
            return redirect("decks:deck_detail", deck_id=deck.id)
    else:
        form = DeckForm(instance=deck)
    return render(request, "decks/edit_deck.html", {"form": form, "deck": deck})


@login_required
def delete_deck(request, deck_id):
    deck = get_object_or_404(Deck, id=deck_id)
    if deck.owner != request.user:
        messages.error(request, "You do not have permission to delete this deck.")
        return redirect("decks:home")
    if request.method == "POST":
        deck.delete()
        messages.success(request, "Deck deleted successfully.")
        return redirect("decks:my_decks")
    return render(request, "decks/delete_deck.html", {"deck": deck})


@login_required
def create_card(request, deck_id):
    deck = get_object_or_404(Deck, id=deck_id)
    if deck.owner != request.user:
        messages.error(
            request, "You do not have permission to create cards for this deck."
        )
        return redirect("decks:home")
    if request.method == "POST":
        form = CardForm(request.POST)
        if form.is_valid():
            card = form.save(commit=False)
            card.deck = deck
            card.owner = request.user
            card.save()
            messages.success(request, "Card created successfully.")
            return redirect("decks:deck_detail", deck_id=deck.id)
    else:
        form = CardForm()
    return render(request, "decks/create_card.html", {"form": form, "deck": deck})
