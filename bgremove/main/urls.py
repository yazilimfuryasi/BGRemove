from django.conf.urls.static import static
from django.conf import settings
from django.contrib import admin
from django.urls import path, include
from .import views

urlpatterns = [
    path('', views.index, name="index"),
    path('admin', admin.site.urls),
    path('upload/', views.yukle, name="image_upload"),
    path('remove/', views.bgremove, name="remove"),
]   + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT) \
    + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
