from django import forms

from .models import Card, Deck


class CardForm(forms.ModelForm):
    class Meta:
        model = Card
        fields = ["front_text", "back_text"]
        widgets = {
            "front_text": forms.TextInput(attrs={"class": "form-control"}),
            "back_text": forms.TextInput(attrs={"class": "form-control"}),
        }


class DeckForm(forms.ModelForm):
    class Meta:
        model = Deck
        fields = ["name", "description", "private"]
        widgets = {
            "name": forms.TextInput(attrs={"class": "form-control"}),
            "description": forms.Textarea(attrs={"class": "form-control"}),
            "private": forms.CheckboxInput(attrs={"class": "form-check-input"}),
        }
