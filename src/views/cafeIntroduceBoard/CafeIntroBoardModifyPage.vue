<template>
  <v-container class="detailWrap">
    <h2>카페 수정</h2>
    <CafeIntroBoardModifyForm :cafe="cafe" class="mt-15" @submit="onSubmit" />
  </v-container>
</template>

<script>
import CafeIntroBoardModifyForm from "@/components/cafeIntroduceBoard/CafeIntroBoardModifyForm.vue";
import { mapActions, mapState } from "vuex";
const cafeIntroduceBoardModule = "cafeIntroduceBoardModule";
export default {
  components: { CafeIntroBoardModifyForm },
  name: "CafeIntroBoardModifyPage",
  props: {
    cafeId: {
      type: String,
      required: true,
    },
  },
  computed: {
    ...mapState(cafeIntroduceBoardModule, ["cafe"]),
  },
  created: function () {
    if (JSON.parse(localStorage.getItem("userInfo")).authorityName !== "CAFE") {
      console.log(
        "JSON.parse(localStorage.getItem('userInfo')).authorityName :",
        JSON.parse(localStorage.getItem("userInfo")).authorityName
      );
      this.$router.push({
        name: "CafeIntroBoardListPage",
      });
    }
    this.requestCafeDetailToSpring(this.cafeId);
  },
  methods: {
    ...mapActions(cafeIntroduceBoardModule, ["requestModifyCafeToSpring"]),
    ...mapActions(cafeIntroduceBoardModule, ["requestCafeDetailToSpring"]),
    async onSubmit(formData) {
      //formData도착
      const cafeId = this.cafeId;
      await this.requestModifyCafeToSpring({ formData,cafeId });
      await this.$router.push({
        name: "CafeIntroBoardListPage",
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