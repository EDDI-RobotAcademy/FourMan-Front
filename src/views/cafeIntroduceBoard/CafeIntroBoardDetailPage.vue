<template>
  <div>
    <CafeIntroBoardDetailForm :cafe="cafe" />
    <cafe-review-comment-form :cafe="cafe" />
  </div>
</template>

<script>
import {mapActions, mapState} from "vuex";
import CafeIntroBoardDetailForm from "@/components/cafeIntroduceBoard/CafeIntroBoardDetailForm"
import CafeReviewCommentForm from '@/components/cafeIntroduceBoard/CafeReviewCommentForm.vue';

const cafeIntroduceBoardModule= 'cafeIntroduceBoardModule'
export default {
    name: "CafeIntroBoardDetailage",
    components: {
        CafeIntroBoardDetailForm,
        CafeReviewCommentForm

  },
  data(){
    return{
    }
  },
  props: {
    cafeId: {
      type: String,
      required: true
    }
  },
  computed: {
    ...mapState(cafeIntroduceBoardModule,['cafe' ])
  },
   methods: {

    ...mapActions(cafeIntroduceBoardModule, [
        'requestCafeDetailToSpring' ]),
   
  },
  async created () {
        // alert("created!")
        console.log('cafeId: ' + this.cafeId)
        await this.requestCafeDetailToSpring(this.cafeId)
    }
  

}
</script>

<style>

</style>