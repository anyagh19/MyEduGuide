from django.urls import path
from .views import  UserProfileView

urlpatterns = [
    # path('register/', CreateUserView.as_view(), name='register'),
    path('profile/', UserProfileView.as_view(), name='user-profile'),
]
