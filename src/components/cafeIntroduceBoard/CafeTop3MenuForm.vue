<template>
  <v-container fluid style="max-width: 1200px" class="my-10">
    <div class="ms-2 mb-5">
      <h2 >최다 판매 Top3 메뉴</h2>
    </div>
    <v-layout row wrap justify-center>
      <v-flex
        xs4
        v-for="(menu, index) in top3Product.topProducts"
        :key="index"
        class="pa-3"
      >
        <v-card class="mx-auto" max-width="400">
          <v-layout column align-center>
            <v-flex>
              <v-img
                :src="
                  require(`@/assets/product/uploadImgs/${menu.imageResource}`)
                "
                width="50px"
                height="100px"
                aspect-ratio="1"
              ></v-img>
            </v-flex>
            <v-flex>
              <div class="text-center headling">{{ menu.productName }}</div>
            </v-flex>
            <v-flex>
              <div class="text-center caption">판매량: {{ menu.totalSales }}</div>
            </v-flex>
          </v-layout>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapState, mapActions } from "vuex";
const cafeIntroduceBoardModule = "cafeIntroduceBoardModule";
export default {
  name: "CafeTop3MenuForm",
  props: {
    cafe: {
      type: Object,
      required: true,
    },
  },
  computed: {
    ...mapState(cafeIntroduceBoardModule, ["top3Product"]),
  },
  methods: {
    ...mapActions(cafeIntroduceBoardModule, ["requestTop3MenuToSpring"]),
  },
  watch: {
    cafe(newCafe, oldCafe) {
      if (newCafe !== oldCafe && newCafe.cafeId) {
        this.requestTop3MenuToSpring(newCafe.cafeId);
      }
    },
  },
  created() {
    if (this.cafe && this.cafe.cafeId) {
      this.requestTop3MenuToSpring(this.cafe.cafeId);
    }
  },
};
</script>