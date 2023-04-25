<template>
    <v-container>
        <div>
            <review-board-register-form @submit="onSubmit" :reviewCafeName="reviewCafeName"/>
        </div>
    </v-container>
</template>

<script>

import ReviewBoardRegisterForm from "@/components/reviewBoard/ReviewBoardRegisterForm.vue";
import { mapActions } from 'vuex'
const reviewBoardModule= 'reviewBoardModule'

export default {
    components: { ReviewBoardRegisterForm },
    name: "ReviewBoardRegisterPage",
    methods: {
          ...mapActions (reviewBoardModule,[
              'requestCreateReviewBoardToSpring'
          ]),
          async onSubmit (formData) {
              await this.requestCreateReviewBoardToSpring(formData)
              await this.$router.push({
                  name: 'ReviewBoardListPage'
              })
          }
    },
    props: {
        reviewCafeName: {
            type: String,
        }
    }
};
</script>

<style>
</style>