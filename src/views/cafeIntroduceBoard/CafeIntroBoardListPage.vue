<template>
  <v-container style="max-width: 1000px;">
    <div class="wrap productWrap">
      <CafeIntroBoardListForm :cafeLists="cafeLists"></CafeIntroBoardListForm>
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
    ...mapState(cafeIntroduceBoardModule, ["cafeLists"]),
  },
  data() {
    return {
      
    };
  },
  methods: {
    ...mapActions(cafeIntroduceBoardModule, [
      "requestCafeListToSpring",
    ]),

  },


  created() {
    this.requestCafeListToSpring();
  },
};
</script>
<style scoped>
</style>