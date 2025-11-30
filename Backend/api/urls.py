from django.urls import path
from .views import  UserProfileView , SuggestCoursesView , ProgressView , GenerateQuizView ,UpdateQuizResultView , generate_user_report , AdminUserListView , AdminDeleteUser , admin_login

urlpatterns = [
    # path('register/', CreateUserView.as_view(), name='register'),
    path('profile/', UserProfileView.as_view(), name='user-profile'),
    path("suggest-courses/", SuggestCoursesView.as_view(), name="suggest-courses"),
    path('progress/', ProgressView.as_view(), name='user-progress'),
    path("generate-quiz/", GenerateQuizView.as_view()),
    path("progress/<int:pk>/update-quiz/", UpdateQuizResultView.as_view(), name="update-quiz"),
    path("generate-report/", generate_user_report, name="generate-report"),
    path("admin/login/", admin_login),
    path("admin/users/", AdminUserListView.as_view()),
    path('admin/delete/<int:pk>/', AdminDeleteUser.as_view()),

]
