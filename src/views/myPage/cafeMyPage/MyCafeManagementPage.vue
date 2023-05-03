<template>
  <div class="d-flex">
    <my-page-side-bar-form />

    <v-container style="width: 1000px">
      <my-cafe-management-form :myCafeInfo="myCafeInfo" />
      <cafe-intro-board-detail-form :cafe="cafe" :myPage="true" />
    </v-container>
  </div>
</template>

<script>
import MyCafeManagementForm from "@/components/myPage/cafeMyPage/MyCafeManagementForm.vue";
import MyPageSideBarForm from "@/components/myPage/MyPageSideBarForm.vue";
import CafeIntroBoardDetailForm from "@/components/cafeIntroduceBoard/CafeIntroBoardDetailForm.vue";

import { mapActions, mapState } from "vuex";
const myPageModule = "myPageModule";
const cafeIntroduceBoardModule = "cafeIntroduceBoardModule";
export default {
  name: "MyCafeManagementPage",
  components: {
    MyCafeManagementForm,
    MyPageSideBarForm,
    CafeIntroBoardDetailForm,
  },
  computed: {
    ...mapState(cafeIntroduceBoardModule, ["cafe"]),
    ...mapState(myPageModule, ["myCafeInfo"]),
  },
  async created() {
    const cafeId = JSON.parse(localStorage.getItem("userInfo")).cafeId;
    console.log("cafeId: " + cafeId);
    await this.requestCafeDetailToSpring(cafeId);
    await this.requestMyCafeInfoToSpring({ cafeId });
  },
  methods: {
    ...mapActions(cafeIntroduceBoardModule, ["requestCafeDetailToSpring"]),

    ...mapActions(myPageModule, ["requestMyCafeInfoToSpring"]),
  },
};
</script>

<style>
</style>