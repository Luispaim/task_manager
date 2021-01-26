from django.urls import path

from .views import (
    RegisterView,
    TaskViewSet
)

urlpatterns = [
    path("register/", RegisterView.as_view(), name='register'),
    # Tasks
    path("tasks/", TaskViewSet.as_view({"post": "create", "get": "list"})),
    path("tasks/<int:pk>", TaskViewSet.as_view({"get": "retrieve", "put": "update", "delete": "destroy"})),
]
