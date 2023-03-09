import uuid

from django.contrib.auth import get_user_model
from django.db import models

User = get_user_model()


class BaseModel(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True


class Deck(BaseModel):
    name = models.CharField(max_length=255)
    description = models.TextField()
    private = models.BooleanField(default=True)
    owner = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return self.name


class Card(BaseModel):
    front_text = models.TextField()
    back_text = models.TextField()
    deck = models.ForeignKey(Deck, on_delete=models.CASCADE)
    private = models.BooleanField(default=True)
    owner = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return self.question
