<template>
    <v-container>
      <main-carousel-form></main-carousel-form>
      <main-cafe-info-form></main-cafe-info-form>
      <main-review-form></main-review-form>
    </v-container>
</template>

<script>
  import MainCarouselForm from '@/components/main/MainCarouselForm.vue';
import MainReviewForm from '@/components/main/MainReviewForm.vue';
import MainCafeInfoForm from '@/components/main/MainCafeInfoForm.vue';

  export default {
    name: 'MainPage',

    components: {
      MainCarouselForm,
        MainReviewForm,
        MainCafeInfoForm
    },
  }
</script>
