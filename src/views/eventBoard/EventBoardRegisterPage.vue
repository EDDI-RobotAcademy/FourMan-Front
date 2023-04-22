<template>
  <v-container class="detailWrap">
    <h2>이벤트 등록</h2>
    <EventBoardRegisterForm class="mt-15" @submit="onSubmit" />
  </v-container>
</template>

<script>
import EventBoardRegisterForm from "@/components/eventBoard/EventBoardRegisterForm.vue";
import { mapActions } from "vuex";
const eventBoardModule = "eventBoardModule";
export default {
  components: { EventBoardRegisterForm },
  name: "EventBoardRegisterPage",
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
  },
  methods: {
    ...mapActions(eventBoardModule, ["requestCreateEventToSpring"]),

    async onSubmit(formData) {
      await this.requestCreateEventToSpring(formData);
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