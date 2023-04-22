<template>
   <router-link
          :to="{
            name: 'EventBoardDetailPage',
          }"
           class="router-link-reset"
        >
  <v-card class="mx-auto my-12 eventCard" max-width="360">
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
          </v-img>
   
      </div>
       <v-card-title>{{ event.eventName }}</v-card-title>

    <v-card-text class="black--text">
      <div class="my-4">{{ event.cafeName }}</div>
      <div>이벤트 기간: {{ event.eventStartDate }}~ {{ event.eventEndDate }}</div>
    </v-card-text>
  </v-card>
       </router-link>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
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
  computed: {},
  methods: {},
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
</style>