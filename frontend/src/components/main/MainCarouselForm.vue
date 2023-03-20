<template>
    <v-container>
      <div>
        <v-carousel :cycle="cycle" :interval="interval" :height="height" v-model="model">
          <v-carousel-item v-for="(picture, idx) in pictures" :key="idx">
            <v-sheet :height="height" tile>
              <v-row class="fill-height" align="center" justify="center">
                <div class="text-h2">
                  <v-img :src="picture.img" :height="height" contain/>
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
    name: "CarouselPage",
    data () {
        return {
            model: 0,
            pictures: [
                { img: require("@/assets/carousel/starbucks01.png") },
                { img: require("@/assets/carousel/starbucks02.png") },
                { img: require("@/assets/carousel/starbucks03.png") },
                { img: require("@/assets/carousel/starbucks04.png") },
                { img: require("@/assets/carousel/starbucks05.png") },
            ],
            cycle: true,
            interval: 4000, // ms 단위
            height: 450,
            width: 600,
        }
    }
}
  </script>