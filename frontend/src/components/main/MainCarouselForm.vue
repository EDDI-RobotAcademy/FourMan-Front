<template>
  <v-container>
    <div>
      <v-carousel
        hide-delimiters
        hide-delimiter-background
        show-arrows-on-hover
        :cycle="cycle"
        :interval="interval"
        :height="height"
        max-height="400px"
        
      >
        <v-carousel-item v-for="(picture, idx) in pictures" :key="idx">
                <v-img :src="picture.img" :height="height" contain  />
        </v-carousel-item>
      </v-carousel>
    </div>
  </v-container>
</template>

  <script>
export default {
  name: "MainCarouselForm",
  data() {
    return {
      pictures: [
        { img: require("@/assets/carousel/starbucks01.png") },
        { img: require("@/assets/carousel/starbucks02.png") },
        { img: require("@/assets/carousel/starbucks03.png") },
        { img: require("@/assets/carousel/starbucks04.png") },
        { img: require("@/assets/carousel/starbucks05.png") },
      ],
      cycle: true,
      interval: 5000, // ms 단위
      height: 400,
      width: 600,
    };
  },
};
</script>