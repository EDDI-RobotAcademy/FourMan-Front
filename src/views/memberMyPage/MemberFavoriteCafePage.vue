<template>
  <div class="d-flex">
    <my-page-side-bar-form/>
    <v-container style="max-width: 1000px">
      <div class="wrap productWrap">
        <CafeIntroBoardListForm :cafeLists="cafeLists"></CafeIntroBoardListForm>
      </div>
    </v-container>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import MyPageSideBarForm from '@/components/memberMyPage/MyPageSideBarForm.vue'
import CafeIntroBoardListForm from "@/components/cafeIntroduceBoard/CafeIntroBoardListForm.vue";
const cafeIntroduceBoardModule = "cafeIntroduceBoardModule";
export default {
  name: "MemberFavoriteCafePage",
  components: {
    CafeIntroBoardListForm, MyPageSideBarForm
  },
  computed: {
    ...mapState(cafeIntroduceBoardModule, ["cafeLists"]),
  },
  data() {
    return {};
  },
  methods: {
    ...mapActions(cafeIntroduceBoardModule, ["requestFavoriteCafeListToSpring"]),
  },

  created() {
     const memberId = JSON.parse(localStorage.getItem('userInfo')).id
      console.log('memberId : ' + memberId)
    this.requestFavoriteCafeListToSpring(memberId);
  },
};
</script>
<style scoped>
</style>