<template>
    <div>
      <v-carousel
        hide-delimiters
        hide-delimiter-background
        show-arrows-on-hover
        :cycle="cycle"
        :interval="interval"
        :height="height"
       
      >
        <v-carousel-item>
          <div class="video-container">
            <video autoplay loop muted>
              <source src="@/assets/carousel/cafe.mp4" type="video/mp4">
            </video>
            <div class="text-container">
              <p style="font-size: 20px;">FOURMAN CAFE</p>
            </div>
          </div>
        </v-carousel-item>
        <v-carousel-item v-for="(picture, idx) in pictures" :key="idx">
                <v-img :src="picture.img" contain  />
        </v-carousel-item>
      </v-carousel>
    </div>
</template>

  <script>
export default {
  name: "MainCarouselForm",
  data() {
    return {
      pictures: [
        { img: require("@/assets/carousel/banner1.png") },
        { img: require("@/assets/carousel/banner2.png") },
      ],
      cycle: true,
      interval: 9999, // ms 단위
      height: 650,
      width: 600,
    };
  },
};
</script>

<style>
.video-container {
  position: relative;
}
.video-container video {
  width: 100%;
  height: auto;
}
.text-container {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #ffffff;
  text-align: center;
}
</style>