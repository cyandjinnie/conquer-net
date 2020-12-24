from django.shortcuts import render
from rest_framework import serializers
from rest_framework import viewsets, mixins
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from rest_framework.exceptions import PermissionDenied
from rest_framework.permissions import IsAdminUser
from django.db.models import Q
from django.contrib.auth.models import User

from .models import Chat, Message

# Serializers 


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "email", "first_name", "last_name"]


class UserIdSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id"]


class ChatSerializer(serializers.ModelSerializer):
    executive = UserIdSerializer
    responsible = UserIdSerializer

    class Meta:
        model = Chat
        fields = ["id", "title", "status", "executive", "responsible"]
        

class MessageSerializer(serializers.ModelSerializer):
    chat = ChatSerializer
    from_user = UserIdSerializer

    class Meta:
        model = Message
        fields = ["id", "text", "chat", "from_user", "datetime"]


class ChatMessagesListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Chat
        fields = ["id", "title", "status", "message_set"]


# Viewsets


class UserList(mixins.ListModelMixin,
               mixins.RetrieveModelMixin,
               viewsets.GenericViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAdminUser]


class MyChatsViewSet(mixins.ListModelMixin,
                     mixins.RetrieveModelMixin,
                     mixins.CreateModelMixin,
                     viewsets.GenericViewSet):
    permission_classes = [IsAuthenticated]

    queryset = Chat.objects.all()
    serializer_class = ChatSerializer

    def get_queryset(self):
        if not self.request.user:
            raise PermissionDenied({"message":"You don't have permission to access"})
        
        return Chat.objects.filter(Q(executive=self.request.user)|Q(responsible=self.request.user))


class AllChatsViewSet(mixins.ListModelMixin,
                      mixins.RetrieveModelMixin,
                      viewsets.GenericViewSet):
    queryset = Chat.objects.all()
    serializer_class = ChatSerializer


class ChatMessagesList(mixins.ListModelMixin,
                       mixins.RetrieveModelMixin,
                       mixins.CreateModelMixin,
                       viewsets.GenericViewSet):
    queryset = Chat.objects.all()
    serializer_class = ChatMessagesListSerializer

    def get_queryset(self):
        if not self.request.user:
            raise PermissionDenied({"message": "You don't have permission to access"})

        return Chat.objects.all()


class MessagesList(mixins.ListModelMixin,
                   mixins.RetrieveModelMixin,
                   mixins.CreateModelMixin,
                   viewsets.GenericViewSet):
    queryset = Message.objects.all()
    serializer_class = MessageSerializer

    def get_queryset(self):
        if not self.request.query_params:
            raise PermissionDenied({"message": "Required GET parameter: 'chat_id'"})

        chat_id = self.request.query_params.get('chat_id')

        target_chat = Chat.objects.get(id=chat_id)
        chat_peers = (target_chat.executive, target_chat.responsible)

        if self.request.user not in chat_peers:
            raise PermissionDenied({"message": "No permission"})

        return Message.objects.filter( 
            Q(chat=chat_id)
        ).order_by('datetime')
        

class UserPersonalInfo(mixins.ListModelMixin,
                       viewsets.GenericViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return User.objects.filter(Q(id=self.request.user.id))