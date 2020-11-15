from rest_framework import generics
from .models import Note
from .serializers import NoteSerializer

class ListNotes(generics.ListAPIView):
  queryset = Note.objects.all()
  serializer_class = NoteSerializer

class DetailNote(generics.RetrieveAPIView):
  queryset = Note.objects.all()
  serializer_class = NoteSerializer

class PostList(generics.ListCreateAPIView):
  queryset = Note.objects.all()
  serializer_class = NoteSerializer

class PostDetail(generics.RetrieveUpdateDestroyAPIView):
  queryset = Note.objects.all()
  serializer_class = NoteSerializer