from rest_framework import serializers, viewsets
from .models import HalfRoom

class HalfRoomSerializer(serializers.HyperlinkedModelSerializer):

    class Meta:
        model = HalfRoom
        fields = ('title', 'description', 'players')

    def create(self, validated_data):
        # import pdb; pdb.set_trace()
        user = self.context['request'].user

        corner = HalfRoom.objects.create(user=user, **validated_data)
        return corner

class HalfRoomViewSet(viewsets.ModelViewSet):
    serializer_class = HalfRoomSerializer
    queryset = HalfRoom.objects.none()

    def get_queryset(self):
        user = self.request.user

        if user.is_anonymous:
            return HalfRoom.objects.none()

        else:
            return HalfRoom.objects.filter(user=user)