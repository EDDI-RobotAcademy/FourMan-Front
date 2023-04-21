<template>
  <v-container fluid>
    <div class="wrap productWrap">
      <CafeIntroBoardListForm :cafeLists="cafeLists"></CafeIntroBoardListForm>
    </div>

    <div v-if="cafePass == 'CAFE'">
      <!-- <router-link :to="{ name: 'CafeIntroBoardRegisterPage' }">
        카페 등록
      </router-link> -->
      <v-btn
        type="button"
        class="brown darken-2 white--text"
        @click="checkCafeNum"
        large
        style="width: 100px; font-size: 18px"
        >카페 등록
      </v-btn>
    </div>
  </v-container>
</template>

<script>
import { mapState, mapActions } from "vuex";
import CafeIntroBoardListForm from "@/components/cafeIntroduceBoard/CafeIntroBoardListForm.vue";
const cafeIntroduceBoardModule = "cafeIntroduceBoardModule";
export default {
  name: "CafeIntroBoardListPage",
  components: {
    CafeIntroBoardListForm,
  },
  computed: {
    ...mapState(cafeIntroduceBoardModule, ["cafeLists", "cafeCheck"]),
  },
  data() {
    return {
      cafePass: JSON.parse(localStorage.getItem("userInfo")).authorityName,
    };
  },
  methods: {
    ...mapActions(cafeIntroduceBoardModule, [
      "requestCafeListToSpring",
      "requestCafeNumToSpring",
    ]),

    async checkCafeNum() {
      if (
        JSON.parse(localStorage.getItem("userInfo")).authorityName == "CAFE"
      ) {
        await this.requestCafeNumToSpring();
        await this.changeNum();
      }
    },

    changeNum() {
      if (this.cafeCheck == true) {
        // this.$store.state.cafeCheck도 가능
        alert("이미 등록된 카페가 있습니다.");
      } else {
        this.$router.push("/cafe-board-register-page");
      }
    },
  },

  // beforeRouteEnter(to, from, next) {
  //   store
  //     .dispatch("cafeIntroduceBoardModule/requestCafeListToSpring")
  //     .then(() => {
  //       next();
  //     });
  // },
  // beforeRouteUpdate(to, from, next) {
  //   this.requestCafeListToSpring().then(() => {
  //     next();
  //   });
  // },

  created() {
    this.requestCafeListToSpring();
  },
};
</script>
<style scoped>
</style>