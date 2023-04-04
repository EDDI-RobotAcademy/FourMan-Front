<template>
    <v-container>
      <main-carousel-form></main-carousel-form>
      <main-review-form></main-review-form>
    </v-container>
</template>

<script>
  import MainCarouselForm from '@/components/main/MainCarouselForm.vue';
import MainReviewForm from '@/components/main/MainReviewForm.vue';

  export default {
    name: 'MainPage',

    components: {
      MainCarouselForm,
        MainReviewForm
    },
  }
</script>
