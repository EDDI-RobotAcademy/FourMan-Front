<template>
  <v-container style="max-width: 1200px">
    <v-card class="mx-auto overflow-hidden" style="max-width: 1200px">
      <v-row>
        <v-col cols="6">
          <!-- aws S3 사용을 위한 주석 -->
          <!-- <v-img
            :style="{ height: '350px', width: '100%' }"
            :src="
              require(`../../../public/assets/cafe/uploadImgs/${allImages[selectedImageIndex]}`)
            "
          /> -->
          <v-img
            :style="{ height: '350px', width: '100%' }"
            :src="`https://vue-s3-test-fourman.s3.ap-northeast-2.amazonaws.com/${allImages[selectedImageIndex]}`"
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
                <v-col v-for="n in 9" :key="n" cols="4">
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
              :value="cafe.avgRating"
              color="amber"
              dense
              half-increments
              readonly
              size="14"
              background-color="gray"
            ></v-rating>
          </v-col>
          <v-col cols="auto" class="d-flex align-center">
            <div>
              <span>{{ cafe.avgRating.toFixed(1) }}</span>
              <span> ({{ cafe.totalRating }})</span>
            </div>
            <v-icon
              v-if="!isFavorite"
              class="ml-5"
              color="grey"
              @click="toggleFavorite"
            >
              mdi-heart-outline
            </v-icon>
            <v-icon v-else class="mx-2" color="red" @click="toggleFavorite">
              mdi-heart
            </v-icon>
            ({{ cafe.favorites }})
            <v-dialog v-model="favoritedialog" persistent max-width="290">
              <v-card>
                <v-card-title class="headline"
                  >로그인이 필요합니다</v-card-title
                >
                <v-card-text>로그인 페이지로 이동하시겠습니까?</v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn
                    class="brown darken-2 white--text"
                    text
                    @click="goToLoginPage"
                    >예</v-btn
                  >
                  <v-btn
                    class="brown darken-2 white--text"
                    text
                    @click="favoritedialog = false"
                    >아니오</v-btn
                  >
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-col>
        </v-row>

        <v-row class="mx-0 d-flex justify-space-between" align="center">
          <v-col cols="auto">
            <div>
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
              v-if="!myPage"
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
                  name: 'CafeIntroBoardModifyPage',
                  params: { cafeId: cafe.cafeId.toString() },
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
import { v4 as uuidv4 } from "uuid";
import { mapActions, mapState } from "vuex";
const memberModule = "memberModule";
const cafeIntroduceBoardModule = "cafeIntroduceBoardModule";
export default {
  name: "CafeIntroBoardDetailForm",
  props: {
    cafe: {
      type: Object,
      required: true,
    },
    myPage: {
      type: Boolean,
    },
  },
  async mounted() {
    await this.loadKakaoMapsSDK();
    this.initializeMap();
  },
  data: () => ({
    selectedImageIndex: 0,
    isFavorite: false,
    map: null,
    marker: null,
    favoritedialog: false,
    copied: false,
    dialog: false,
    shareUrl: "",

    awsBucketName: "vue-s3-test-fourman",
    awsBucketRegion: "ap-northeast-2",
    awsIdentityPoolId: "ap-northeast-2:ce9c61fa-af5d-4ed1-8e3d-9b8d460ee927",
    s3: null,
  }),

  methods: {
    ...mapActions(cafeIntroduceBoardModule, ["requestDeleteCafeToSpring"]),
    ...mapActions(memberModule, [
      "requestMemberToSpring",
      "sendFavoriteStatusToSpring",
      "checkFavoriteStatus",
    ]),
    goToLoginPage() {
      this.favoritedialog = false;
      this.$router.push({ name: "SignInPage" });
    },
    awsS3Config() {
      AWS.config.update({
        region: this.awsBucketRegion,
        credentials: new AWS.CognitoIdentityCredentials({
          IdentityPoolId: this.awsIdentityPoolId,
        }),
      });

      this.s3 = new AWS.S3({
        apiVersion: "2006-03-01",
        params: {
          Bucket: this.awsBucketName,
        },
      });
    },
    async deleteImageFromS3(imagePath) {
      try {
        this.awsS3Config();

        // 삭제할 객체의 키를 생성
        const objectKey = imagePath;

        // 객체 삭제
        const deleteParams = {
          Bucket: this.awsBucketName,
          Key: objectKey,
        };

        await this.s3.deleteObject(deleteParams).promise();

        console.log("이미지가 S3에서 삭제되었습니다.");
      } catch (error) {
        console.error("S3에서 이미지를 삭제하는 데 실패했습니다.", error);
      }
    },
    async toggleFavorite() {
      if (this.isAuthenticated) {
        this.isFavorite = !this.isFavorite;
        const payload = {
          cafeId: this.cafe.cafeId,
          memberId: JSON.parse(localStorage.getItem("userInfo")).id,
          isFavorite: this.isFavorite,
        };
        await this.sendFavoriteStatusToSpring(payload);
        this.$emit("updateCafe");
      } else {
        this.favoritedialog = true;
      }
    },

    getImagePath(imageName) {
      if (imageName) {
        // aws s3 사용을위한 주석
        // return require(`../../../public/assets/cafe/uploadImgs/${imageName}`);
        return `https://vue-s3-test-fourman.s3.ap-northeast-2.amazonaws.com/${imageName}`;
      }
      return null;
    },

    //AWS s3 적용을 위한 주석처리

    // async deleteCafe() {
    //   try {
    //     await this.requestDeleteCafeToSpring(this.cafe.cafeId);
    //     this.$router.push({ name: "CafeIntroBoardListPage" });
    //   } catch (error) {
    //     console.error("Failed to delete cafe:", error);
    //   }
    // },

    async deleteCafe() {
      try {
        // S3에서 이미지 삭제
        for (const imageName of this.allImages) {
          await this.deleteImageFromS3(imageName);
        }

        await this.requestDeleteCafeToSpring(this.cafe.cafeId);
        this.$router.push({ name: "CafeIntroBoardListPage" });
      } catch (error) {
        console.error("Failed to delete cafe:", error);
      }
    },
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
        // query: {
        //   cafe: JSON.stringify(this.cafe),
        // },
        params: {
          cafe: this.cafe,
        },
      });
    },
  },

  computed: {
    ...mapState(memberModule, ["isAuthenticated", "member"]),
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
          //aws s3 사용을 위한 주석
          // require(`../../../public/assets/cafe/uploadImgs/${image}`);
          `https://vue-s3-test-fourman.s3.ap-northeast-2.amazonaws.com/${image}`;
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
    // rating() {
    //   return Number(this.$route.query.rating);
    // },
    // totalRating() {
    //   return this.$route.query.totalRating;
    // },
  },
  watch: {
    cafe: {
      immediate: true,
      async handler(newVal, oldVal) {
        const userInfo = localStorage.getItem("userInfo");
        const token = userInfo ? JSON.parse(userInfo).token : null;
        if (token != null) {
          await this.requestMemberToSpring(token);
        }
        if (newVal && newVal.cafeId) {
          console.log("this.cafe.cafeId", newVal.cafeId);
          console.log("this.cafe", this.cafe);
          console.log("this.cafe.cafeId", this.cafe.cafeId);
          console.log(
            " Number(this.$route.params.cafeId);",
            Number(this.$route.params.cafeId)
          );
          console.log("this.isAuthenticated ", this.isAuthenticated);

          const cafeIdParam = Number(this.$route.params.cafeId);
          const cafeId = isNaN(cafeIdParam) ? this.cafe.cafeId : cafeIdParam;
          console.log("cafeId:", cafeId);
          // 하... 새로고침하는순간 isAuthenticated값이 false가 되는게 문제임
          if (this.member) {
            console.log("멤버가 존재합니다");
            const payload = {
              cafeId: cafeId,
              memberId: JSON.parse(localStorage.getItem("userInfo")).id,
            };
            const res = await this.checkFavoriteStatus(payload);
            console.log("찜했냐res.data", res.data);
            this.isFavorite = res.data;
          }
        }
      },
    },
  },
  async created() {
    this.shareUrl = window.location.href;
  },
};
</script>

<style scoped>
</style>