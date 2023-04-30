<template>
  <v-container style="max-width: 1000px">
    <div class="wrap productWrap">
      <CafeIntroBoardListForm
        :cafeLists="cafeLists"
        @updateCafe="updateCafeData()"
      ></CafeIntroBoardListForm>
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
    return {};
  },
  methods: {
    ...mapActions(cafeIntroduceBoardModule, ["requestCafeListToSpring"]),
    async updateCafeData() {
      await this.requestCafeListToSpring();
    },
  },

  async created() {
    await this.requestCafeListToSpring();
  },
};
</script>
<style scoped>
</style>