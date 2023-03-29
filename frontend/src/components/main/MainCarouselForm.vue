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
      >
        <v-carousel-item v-for="(picture, idx) in pictures" :key="idx">
          <v-sheet :height="height" tile >
            <v-row class="fill-height" align="center" justify="center">
              <div class="">
                <v-img :src="picture.img" :height="height" contain />
              </div>
            </v-row>
          </v-sheet>
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
      interval: 4000, // ms 단위
      height: 800,
      width: 600,
    };
  },
};
</script>