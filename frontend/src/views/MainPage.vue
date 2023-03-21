<template>
    <v-container>
      <main-carousel-form></main-carousel-form>
    </v-container>
</template>

<script>
  import MainCarouselForm from '@/components/main/MainCarouselForm.vue';

  export default {
    name: 'MainPage',

    components: {
      MainCarouselForm
    },
  }
</script>
