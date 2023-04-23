<template>
  <v-container fluid>
    <div class="wrap productWrap">
      <EventBoardListForm :eventLists="eventLists"></EventBoardListForm>
    </div>
  
  </v-container>
</template>

<script>
import { mapState, mapActions } from "vuex";
import EventBoardListForm from "@/components/eventBoard/EventBoardListForm.vue";
const eventBoardModule = "eventBoardModule";

export default {
  name: "EventBoardListPage",
  components: {
    EventBoardListForm
  },
  computed: {
    ...mapState(eventBoardModule, ["eventLists"]),
  },
  data() {
    return { 

    
    };
  },
  methods: {
    ...mapActions(eventBoardModule, [
      "requestEventListToSpring",
    ]),


  },
   async created() {
    await this.requestEventListToSpring();
    console.log("this.eventLists.length" ,this.eventLists.length)
  },
};
</script>
<style scoped>
</style>