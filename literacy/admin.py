from django.contrib import admin

from .models import Room, HalfRoom

class RoomAdmin(admin.ModelAdmin):
    readonly_fields=('created_at', 'last_modified')

admin.site.register(Room, RoomAdmin)
admin.site.register(HalfRoom)