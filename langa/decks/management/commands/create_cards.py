import random

from django.contrib.auth import get_user_model
from django.core.management.base import BaseCommand

from langa.decks.models import Card, Deck

User = get_user_model()


class Command(BaseCommand):
    help = "Populate the database with sample data"

    def handle(self, *args, **options):
        # Create users
        users = []
        for i in range(10):
            user = User.objects.create_user(
                username=f"user{i+1}",
                password=f"password{i+1}",
                email=f"user{i+1}@example.com",
            )
            users.append(user)

        # Create decks and cards
        for user in users:
            for i in range(5):
                deck = Deck.objects.create(
                    name=f"Deck {i+1}",
                    description=f"This is deck {i+1}",
                    owner=user,
                    private=random.choice([True, False]),
                )
                for j in range(10):
                    Card.objects.create(
                        front_text=f"Front of card {j+1}",
                        back_text=f"Back of card {j+1}",
                        owner=user,
                        deck=deck,
                    )
        self.stdout.write(
            self.style.SUCCESS("Successfully populated the database with sample data.")
        )
