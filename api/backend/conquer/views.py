from django.shortcuts import render
from rest_framework import serializers
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework.exceptions import PermissionDenied
from django.db.models import Q
from django.contrib.auth.models import User

from .models import Chat

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "email"]

class ChatSerializer(serializers.ModelSerializer):
    executive = UserSerializer(read_only=True)
    responsible = UserSerializer(read_only=True)

    class Meta:
        model = Chat
        fields = ["title", "status", "executive", "responsible"]
        

class MyChatsViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]

    queryset = Chat.objects.all()
    serializer_class = ChatSerializer

    def get_queryset(self):
        if not self.request.user:
            raise PermissionDenied({"message":"You don't have permission to access"})
        return Chat.objects.filter(Q(executive=self.request.user)|Q(responsible=self.request.user))

class AllChatsViewSet(viewsets.ModelViewSet):
    queryset = Chat.objects.all()
    serializer_class = ChatSerializer