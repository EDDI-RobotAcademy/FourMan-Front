<template>
  <v-container>
    <v-card class="mx-auto overflow-hidden" style="max-width: 1200px">
      <v-row>
        <v-col cols="6">
          <v-img
            :style="{ height: '350px', width: '100%' }"
            :src="
              require(`../../assets/cafe/uploadImgs/${allImages[selectedImageIndex]}`)
            "
          />
        </v-col>
        <v-col class="d-flex" cols="6">
          <v-carousel
            cycle
            hide-delimiters
            show-arrows-on-hover
            :style="{ height: '350px' }"
            interval="5000"
          >
            <v-carousel-item
              v-for="(imageName, index) in allImages"
              :key="index"
            >
              <v-row class="align-center justify-center">
                <v-col v-for="n in 3" :key="n" cols="4">
                  <v-img
                    :style="{
                      height: '100px',
                      width: '100%',
                      cursor: 'pointer',
                    }"
                    :src="
                      getImagePath(
                        allImages[(index + n - 1) % allImages.length]
                      )
                    "
                    @click="
                      selectedImageIndex = (index + n - 1) % allImages.length
                    "
                  />
                </v-col>
              </v-row>
            </v-carousel-item>
          </v-carousel>
        </v-col>
      </v-row>

      <v-card-text class="">
        <v-row class="mx-0" align="center">
          <v-col cols="auto">
            <span class="text-h5">{{ cafe.cafeName }}</span
            >&nbsp;
          </v-col>
          <v-col cols="auto">
            <v-rating
              :value="rating"
              color="amber"
              dense
              half-increments
              readonly
              size="14"
              background-color="gray"
            ></v-rating>
          </v-col>
          <v-col cols="auto" class="d-flex align-center">
            <div class="grey--text">
              <span v-if="rating">{{ rating.toFixed(1) }}</span>
              <span v-else>0</span>
              <span> ({{ totalRating }})</span>
            </div>
          </v-col>
        </v-row>

        <v-row class="mx-0 d-flex justify-space-between" align="center">
          <v-col cols="auto">
            <div class="grey--text">
              <span>{{ cafe.cafeAddress }} , {{ cafe.cafeTel }}</span> &nbsp;
              <span>영업 시간: {{ cafe.startTime }} ~ {{ cafe.endTime }}</span>
              &nbsp;
              <span
                :class="{
                  'green--text': isOperating,
                  'red--text': !isOperating,
                  'font-weight-bold': true,
                }"
              >
                {{ isOperating ? "영업중" : "영업종료" }}
              </span>
            </div>
          </v-col>
          <v-col cols="auto" class="d-flex align-center">
            <v-btn
              class="brown darken-2 white--text mr-10"
              text
              @click="reserve"
            >
              예약하기
            </v-btn>
            <div>
              <!-- 수정 아이콘 -->
              <router-link
                v-if="isCafeOwner"
                :to="{
                  name: 'CafeIntroBoardListPage',
                  params: { cafetId: cafe.cafeId.toString() },
                }"
              >
                <v-icon>mdi-pencil</v-icon>
              </router-link>

              <!-- 삭제 아이콘 -->
              <v-icon v-if="isCafeOwner" @click="deleteCafe" class="mx-5"
                >mdi-delete</v-icon
              >
            </div>

            <!-- 공유를 눌렀을때 나오는거 -->

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
          </v-col>
        </v-row>

        <v-row class="mx-0" align="center">
          <v-col cols="12">
            <p class="subtitle-2 my-5">{{ cafe.cafeInfo.subTitle }}</p>
          </v-col>
        </v-row>
      </v-card-text>

      <v-divider></v-divider>
      <br /><br />

      <div class="pa-4 pt-0 text-body-2">
        {{ cafe.cafeInfo.description }}
      </div>
    </v-card>
    <br />
    <div id="app">
      <div ref="map" style="width: 100%; height: 400px"></div>
    </div>
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
  async mounted() {
    await this.loadKakaoMapsSDK();
    this.initializeMap();
  },
  data: () => ({
    selectedImageIndex: 0,
    map: null,
    marker: null,

    copied: false,
    dialog: false,
    shareUrl: "",
  }),

  methods: {
    getImagePath(imageName) {
      if (imageName) {
        return require(`../../assets/cafe/uploadImgs/${imageName}`);
      }
      return null;
    },
    async deleteCafe() {},
    loadKakaoMapsSDK() {
      return new Promise((resolve, reject) => {
        const script = document.createElement("script");
        script.type = "text/javascript";
        script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=1b9ab9c85ce4696e324d95f2d27458e2&libraries=services`;
        script.onload = () => {
          if (window.kakao && window.kakao.maps) {
            resolve();
          } else {
            reject(new Error("Failed to load Kakao Map API"));
          }
        };
        script.onerror = reject;
        document.head.appendChild(script);
      });
    },

    async initializeMap() {
      this.map = new window.kakao.maps.Map(this.$refs.map, {
        center: new window.kakao.maps.LatLng(37.5665, 126.978),
        level: 3,
      });
      this.marker = new window.kakao.maps.Marker({
        position: this.map.getCenter(),
      });
      this.marker.setMap(this.map);

      await this.setMapCenter(this.cafe.cafeAddress);
    },
    // async setMapCenter(address) {
    //   const geocoder = new window.kakao.maps.services.Geocoder();
    //   geocoder.addressSearch(address, (result, status) => {
    //     if (status === window.kakao.maps.services.Status.OK) {
    //       const addressName = result[0].address_name;
    //       const coords = new window.kakao.maps.LatLng(result[0].y, result[0].x);
    //       this.map.setCenter(coords);
    //       this.marker.setPosition(coords);
    //       console.log("Address name: ", addressName);
    //     } else {
    //       console.error("Geocoder failed due to: " + status);
    //     }
    //   });
    // },
    async setMapCenter(cafeName) {
      const places = new window.kakao.maps.services.Places();
      places.keywordSearch(cafeName, (result, status) => {
        if (status === window.kakao.maps.services.Status.OK) {
          const coords = new window.kakao.maps.LatLng(result[0].y, result[0].x);
          this.map.setCenter(coords);
          this.marker.setPosition(coords);
          console.log("Cafe name: ", cafeName);
        } else {
          console.error("Keyword search failed due to: " + status);
        }
      });
    },
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
    allImages() {
      if (!this.cafe || !this.cafe.cafeInfo) {
        return [];
      }

      const images = [
        this.cafe.cafeInfo.thumbnailFileName,
        ...this.cafe.cafeInfo.cafeImagesName,
      ];

      // 이미지 배열에서 정의되지 않은 요소를 제거합니다.
      return images.filter((image) => {
        try {
          require(`../../assets/cafe/uploadImgs/${image}`);
          return true;
        } catch (e) {
          console.error(`Cannot find image: ${image}`);
          return false;
        }
      });
    },
    isOperating() {
      const currentTime = new Date();
      const startTime = new Date(
        currentTime.toDateString() + " " + this.cafe.startTime
      );
      const endTime = new Date(
        currentTime.toDateString() + " " + this.cafe.endTime
      );

      if (endTime < startTime) {
        endTime.setDate(endTime.getDate() + 1);
      }

      return currentTime >= startTime && currentTime <= endTime;
    },

    isCafeOwner() {
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));
      return userInfo && userInfo.cafeId === this.cafe.cafeId;
    },
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