from rest_framework import generics, permissions, viewsets
from rest_framework.decorators import permission_classes
from rest_framework.permissions import IsAuthenticated

from tasks.models import Task
from account.models import CustomUser

from .serializers import (
    RegisterSerializer,
    TaskSerializer,
)


@permission_classes([IsAuthenticated])
class TaskViewSet(viewsets.ModelViewSet):
    """
    Permite criar, alterar, listar e apagar as tarefas.
    """

    queryset = Task.objects.all()
    serializer_class = TaskSerializer


class RegisterView(generics.CreateAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = RegisterSerializer
    authentication_classes = []
    permission_classes = [permissions.AllowAny]
