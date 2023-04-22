<template>
  <div>
    <EventBoardDetailForm :event="event" />
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import EventBoardDetailForm from "@/components/eventBoard/EventBoardDetailForm";

const eventBoardModule = "eventBoardModule";
export default {
  name: "EventBoardDetailage",
  components: {
    EventBoardDetailForm,
  },
  data() {
    return {};
  },
  props: {
    eventId: {
      type: String,
      required: true,
    },
  },
  computed: {
    ...mapState(eventBoardModule, ["event"]),
  },
  methods: {
    ...mapActions(eventBoardModule, ["requestEventDetailToSpring"]),

    fetchEvent() {
      console.log("eventId: " + this.eventId);
      this.requestEventDetailToSpring(this.eventId);
    },
  },

  watch: {
    $route(to, from) {
      this.fetchEvent();
    },
  },

  async created() {
    // alert("created!")
    console.log("eventId: " + this.eventId);
    await this.requestEventDetailToSpring(this.eventId);
  },
};
</script>

<style>
</style>