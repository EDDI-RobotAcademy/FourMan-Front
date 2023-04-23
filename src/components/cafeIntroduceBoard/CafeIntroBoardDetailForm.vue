<template>
  <v-container>
    <v-card class="mx-auto overflow-hidden" style="max-width: 1200px">
      <!-- test -->
      <v-row>
        <v-col class="d-flex" cols="6">
          <v-carousel
            hide-delimiters
            cycle
            hide-delimiter-background
            show-arrows-on-hover
            max-height="400px;"
          >
            <v-carousel-item
              contain
              v-for="(imageName, i) in cafe.cafeInfo.cafeImagesName"
              :key="i"
              :src="require(`../../assets/cafe/uploadImgs/${imageName}`)"
            ></v-carousel-item>
          </v-carousel>
        </v-col>
        <v-col cols="6">
          <v-img
            contain
            :src="
              require(`../../assets/cafe/uploadImgs/${cafe.cafeInfo.thumbnailFileName}`)
            "
          />
        </v-col>
      </v-row>
      <v-card-title class="align-start">
        <div>
          <v-row align="center" class="mx-0">
            <span class="text-h5">{{ cafe.cafeName }}</span
            >&nbsp; &nbsp; &nbsp;
            <v-rating
              :value="rating"
              color="amber"
              dense
              half-increments
              readonly
              size="14"
              background-color="gray"
            ></v-rating>

            <div class="grey--text ms-4">
              <span v-if="rating">{{ rating.toFixed(1) }}</span>
              <span v-else>0</span>
              <span> ({{ totalRating }})</span>
              <!-- 별점과 참여자수 업뎃요망 -->
            </div>
          </v-row>
          <br />
          <v-row>
            <div class="grey--text">
              <span>{{ cafe.cafeAddress }} , {{ cafe.cafeTel }}</span> &nbsp;
              &nbsp; &nbsp;
              <span>영업 시간: {{ cafe.startTime }} ~ {{ cafe.endTime }}</span>
              &nbsp; &nbsp; &nbsp;
              <v-btn class="brown darken-2 white--text" text @click="reserve">
                예약하기
              </v-btn>
            </div>
          </v-row>
          <v-row>
            <p class="subtitle-2 ml-5 my-5">{{ cafe.cafeInfo.subTitle }}</p>
          </v-row>
        </div>

        <!-- 공유를 눌렀을때 나오는거 -->
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" width="400">
          <template v-slot:activator="{ on }">
            <v-icon v-on="on"> mdi-share-variant </v-icon>
          </template>
          <v-card>
            <v-card-title>
              <span class="text-h6 font-weight-bold">Share</span>
              <v-spacer></v-spacer>
              <v-btn class="mx-0" icon @click="dialog = false">
                <v-icon>mdi-close-circle-outline</v-icon>
              </v-btn>
            </v-card-title>
            <v-list>
              <v-list-item @click="shareOnFacebook">
                <v-list-item-action>
                  <v-icon color="indigo">mdi-facebook</v-icon>
                </v-list-item-action>
                <v-card-title>Facebook</v-card-title>
              </v-list-item>

              <v-list-item @click="shareOnTwitter">
                <v-list-item-action>
                  <v-icon color="cyan">mdi-twitter</v-icon>
                </v-list-item-action>
                <v-card-title>Twitter</v-card-title>
              </v-list-item>

              <v-list-item @click="shareByEmail">
                <v-list-item-action>
                  <v-icon>mdi-email</v-icon>
                </v-list-item-action>
                <v-card-title>Email</v-card-title>
              </v-list-item>
            </v-list>

            <v-text-field
              ref="link"
              :label="copied ? 'Link copied' : 'Click to copy link'"
              class="pa-4"
              readonly
              :value="shareUrl"
              @click="copy"
            ></v-text-field>
          </v-card>
        </v-dialog>
      </v-card-title>
      <v-divider></v-divider>
      <v-spacer></v-spacer><br /><br />

      <div class="pa-4 pt-0 text-body-2">
        {{ cafe.cafeInfo.description }}
      </div>
    </v-card>
  </v-container>
</template>

<script>
import axios from "axios";
export default {
  name: "CafeIntroBoardDetailForm",
  props: {
    cafe: {
      type: Object,
      required: true,
    },
  },
  data: () => ({
    copied: false,
    dialog: false,
    shareUrl: "",
  }),

  methods: {
    shareOnFacebook() {
      const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
        this.shareUrl
      )}`;
      window.open(url, "_blank");
    },
    shareOnTwitter() {
      const url = `https://twitter.com/intent/tweet?url=${encodeURIComponent(
        this.shareUrl
      )}&text=${encodeURIComponent("Check out this cafe!")}`;
      window.open(url, "_blank");
    },
    shareByEmail() {
      const url = `mailto:?subject=${encodeURIComponent(
        "Check out this cafe!"
      )}&body=${encodeURIComponent(this.shareUrl)}`;
      window.location.href = url;
    },
    async copy() {
      try {
        await navigator.clipboard.writeText(this.shareUrl);
        this.copied = true;
      } catch (err) {
        console.error("Failed to copy text: ", err);
        this.copied = false;
      }
    },

    reserve() {
      this.$router.push({
        name: "HallSeatPage",
        params: {
          cafe: this.cafe,
        },
      });
    },
  },

  computed: {
    rating() {
      return Number(this.$route.query.rating);
    },
    totalRating() {
      return this.$route.query.totalRating;
    },
  },
  created() {
    this.shareUrl = window.location.href;
  },
};
</script>

<style scoped>
</style>