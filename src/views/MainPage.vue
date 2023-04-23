<template>
  <div>
      <main-carousel-form></main-carousel-form>
      <main-cafe-info-form></main-cafe-info-form>
      <main-event-form></main-event-form>
      <main-review-form></main-review-form>
      <popup-form ></popup-form>
  </div>
</template>

<script>
  import MainCarouselForm from '@/components/main/MainCarouselForm.vue';
  import MainReviewForm from '@/components/main/MainReviewForm.vue';
  import MainCafeInfoForm from '@/components/main/MainCafeInfoForm.vue';
  import MainEventForm from '@/components/main/MainEventForm.vue';
  import PopupForm from '@/components/popup/PopupForm.vue'

  export default {
    name: 'MainPage',

    components: {
      MainCarouselForm,
        MainReviewForm,
        MainEventForm,
        MainCafeInfoForm,
        PopupForm
    },
  }
</script>
