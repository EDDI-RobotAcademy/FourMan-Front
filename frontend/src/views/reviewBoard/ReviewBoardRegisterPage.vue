<template>
    <v-container>
        <div>
            <review-board-register-form @submit="onSubmit" />
        </div>
    </v-container>
</template>

<script>

import ReviewBoardRegisterForm from "@/components/reviewBoard/ReviewBoardRegisterForm.vue";
import { mapActions } from 'vuex'
import axios from 'axios';

export default {
    components: { ReviewBoardRegisterForm },
    name: "ReviewBoardRegisterPage",
    methods: {
          ...mapActions ([
              'requestCreateReviewBoardToSpring'
          ]),
          async onSubmit (formData) {
              await this.requestCreateReviewBoardToSpring(formData)
              await this.$router.push({
                  name: 'MainPage'
              })
          }
    },
};
</script>

<style>
</style>