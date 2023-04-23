<template>
  <v-container fluid>
    <div class="wrap productWrap">
      <EventBoardListForm :eventLists="eventLists"></EventBoardListForm>
    </div>
     <!-- <div v-if="cafePass == 'CAFE'">
      <v-btn
        type="button"
        class="brown darken-2 white--text mb-10 ml-5"
        @click="register"
        large
        style="width: 150px; font-size: 18px"
        >이벤트 등록
      </v-btn>
    </div> -->
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
      //  cafePass: JSON.parse(localStorage.getItem("userInfo")).authorityName,
     
    
    };
  },
  methods: {
    ...mapActions(eventBoardModule, [
      "requestEventListToSpring",
    ]),

    //  register() {
    //   this.$router.push("/event-board-register-page");
    //   } 
  },
   async created() {
    await this.requestEventListToSpring();
    console.log("this.eventLists.length" ,this.eventLists.length)
  },
};
</script>
<style scoped>
</style>