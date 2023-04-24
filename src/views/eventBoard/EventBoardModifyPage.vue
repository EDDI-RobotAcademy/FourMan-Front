<template>
  <v-container class="detailWrap">
    <h2>이벤트 수정</h2>
    <EventBoardModifyForm :event="event" class="mt-15" @submit="onSubmit" />
  </v-container>
</template>

<script>
import EventBoardModifyForm from "@/components/eventBoard/EventBoardModifyForm.vue";
import { mapActions,mapState} from "vuex";
const eventBoardModule = "eventBoardModule";
export default {
  components: { EventBoardModifyForm },
  name: "EventBoardModifyPage",
  props:{
    eventId:{
      type:String,
      required:true,
    }
  },
  computed:{
    ...mapState( eventBoardModule,['event'])
  },
  created: function () {
    if (JSON.parse(localStorage.getItem("userInfo")).authorityName !== "CAFE") {
      console.log(
        "JSON.parse(localStorage.getItem('userInfo')).authorityName :",
        JSON.parse(localStorage.getItem("userInfo")).authorityName
      );
      this.$router.push({
        name: "EventBoardListPage",
      });
    }

    this.requestEventDetailToSpring(this.eventId)
  },
  methods: {
    ...mapActions(eventBoardModule, ["requestModifyEventToSpring"]),
    ...mapActions(eventBoardModule, ["requestEventDetailToSpring"]),
    async onSubmit(formData) {
      const eventId=this.eventId
      await this.requestModifyEventToSpring({formData,eventId});
      await this.$router.push({
        name: "EventBoardListPage",
      });
    },
  },
};
</script>

<style scoped>
.detailWrap {
  width: 1200px;
  margin: 0 auto;
  padding: 40px 0;
}
</style>