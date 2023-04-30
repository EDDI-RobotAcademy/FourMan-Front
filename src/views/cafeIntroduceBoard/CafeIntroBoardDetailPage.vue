<template>
  <div>
    <CafeIntroBoardDetailForm :cafe="cafe"   @updateCafe="updateCafeData()" />
    <CafeTop3MenuForm :cafe="cafe" />
    <cafe-review-comment-form :cafe="cafe" />
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import CafeIntroBoardDetailForm from "@/components/cafeIntroduceBoard/CafeIntroBoardDetailForm";
import CafeReviewCommentForm from "@/components/cafeIntroduceBoard/CafeReviewCommentForm.vue";
import CafeTop3MenuForm from "@/components/cafeIntroduceBoard/CafeTop3MenuForm.vue";

const cafeIntroduceBoardModule = "cafeIntroduceBoardModule";
export default {
  name: "CafeIntroBoardDetailage",
  components: {
    CafeIntroBoardDetailForm,
    CafeReviewCommentForm,
    CafeTop3MenuForm,
  },
  data() {
    return {};
  },
  props: {
    cafeId: {
      type: String,
      required: true,
    },
  },
  computed: {
    ...mapState(cafeIntroduceBoardModule, ["cafe"]),
  },
  methods: {
    async updateCafeData() {
     await this.requestCafeDetailToSpring(this.cafeId);
    },

    ...mapActions(cafeIntroduceBoardModule, ["requestCafeDetailToSpring"]),
  },
  async created() {
    // alert("created!")
    console.log("cafeId: " + this.cafeId);
    await this.requestCafeDetailToSpring(this.cafeId);
  },
};
</script>

<style>
</style>