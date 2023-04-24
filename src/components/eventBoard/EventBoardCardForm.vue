<template>
  <router-link
    :to="{
      name: 'EventBoardDetailPage',
      params: { eventId: event.eventId.toString() },
    }"
    class="router-link-reset"
  >
   <v-container fluid>
    <v-card  style="height: 430px;" class="mx-auto my-12 eventCard d-flex flex-column" min-width="290px" elevation="3">
      <template slot="progress">
        <v-progress-linear
          color="brown darken-2"
          height="10"
          indeterminate
        ></v-progress-linear>
      </template>

      <div class="thumb">
        <v-img
          v-if="event"
          height="200"
          class="white--text align-end"
          :src="
            require(`../../assets/event/uploadImgs/${event.thumbnailFileName}`)
          "
        >
          <div v-if="isEventExpired()" class="overlay">이벤트 종료</div>
        </v-img>
      </div>
      
      <v-card-title  style="min-height:120px;">{{ event.eventName }}</v-card-title>

      <v-card-text class="black--text">
        <div class="my-4">{{ event.cafeName }}</div>
        <div>
          이벤트 기간: {{ event.eventStartDate }}~ {{ event.eventEndDate }}
        </div>
      </v-card-text>
   
    </v-card>
   </v-container>
  </router-link>
</template>

<script>
const eventBoardModule = "eventBoardModule";

export default {
  name: "EventBoardCardForm",
  props: {
    event: {
      type: Object,
      required: true,
    },
  },

  data: () => ({}),
  methods: {
    isEventExpired() {
      const currentDate = new Date();
      const eventEndDate = new Date(this.event.eventEndDate);
      return currentDate > eventEndDate;
    },
  },
};
</script>

<style scoped>
.eventCard {
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.eventCard:hover {
  box-shadow: 0 10px 15px rgba(0, 0, 0, 0.15);
  transform: translateY(-3px);
}

.router-link-reset {
  text-decoration: none;
  color: inherit;
}

.router-link-reset:hover {
  text-decoration: none;
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24px;
  color: white;
  font-weight: bold;
}
</style>