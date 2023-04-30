<template>
  <div>
    <v-navigation-drawer
        permanent
        hide-overlay
        height="100%"
        color=""
        width="250"
        style="position: relative;"
        class="mb-15"
    >
      <div class="d-flex align-center justify-center">
        <v-text-field
          v-model="search"
          label="메뉴 검색"
          single-line
          hide-details
          class="ml-5 mt-5 mr-5 mb-5"
          append-icon="mdi-magnify"
        ></v-text-field>
      </div>

      <v-list-item style="height: 250px">
        <v-list-item-content>
          <v-list-item-title>
            <div align="center">
              <router-link to="/member-my-page">
                <div @click="dialog = !dialog">
                  <v-avatar
                      :size="120"
                      color="grey lighten-4">
                    <v-img v-if="this.myInfoSideBar.profileImage && this.myInfoSideBar.profileImage !== 'defaultProfileImage.png'" :src="require(`@/assets/myPage/${ this.myInfoSideBar.profileImage }`)"/>
                    <v-img v-else :src="require(`@/assets/myPage/defaultProfileImage.png`)"/>
                  </v-avatar>
                </div>
              </router-link>
            </div>

            <v-dialog v-model="dialog" max-width="500px">
              <v-card>
                <v-card-title>
                  프로필 이미지 변경
                </v-card-title>
                <v-card-text>
                  <div align="center" class="mt-10">
                    <!-- 기존 이미지 -->
                    <v-img v-if="imageFile == null && this.myInfoSideBar.profileImage && this.myInfoSideBar.profileImage !== 'defaultProfileImage.png'" class="imagePreview" :src="require(`@/assets/myPage/${ this.myInfoSideBar.profileImage }`)" max-width="120px" max-height="120px" />
                    <v-img v-else-if="this.myInfoSideBar.profileImage == 'defaultProfileImage.png' && imageFile == null" :src="require(`@/assets/myPage/defaultProfileImage.png`)" class="imagePreview" max-width="120px" max-height="120px"/>

                    <!-- 이미지 변경 있을 시 -->
                    <v-img else-if="preview !== null" class="imagePreview" :src="preview" max-width="120px" max-height="120px" />

                    <v-file-input
                      v-model="imageFile"
                      label="이미지 변경"
                      accept="image/*"
                      @change="previewFile(imageFile)"
                    ></v-file-input>
                  </div>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="primary" text @click="dialog = false" outlined>
                    취소
                  </v-btn>
                  <v-btn color="primary" text @click="changeProfileImage" outlined>
                    변경하기
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>

          </v-list-item-title>
          <v-list-item-subtitle class="black--text justify-center">
            <div class="mt-4" align="center" style="font-size: 17px; font-weight: bold;">
               {{ nickName }} 님
            </div>
            <div align="center" class="mt-3" style="font-size: 16px">
               {{ memberType }}
            </div>
            <div v-if="memberType == '일반회원'" class="mt-2 d-flex align-center justify-center">
               <span style="font-size: 16px">보유 포인트 : {{ point | comma }}</span> 
               <v-icon style="font-size: 28px; margin-left: -7px; font-weight: bold;">mdi-alpha-p</v-icon> 
            </div>
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <!-- <v-divider style="border-color: gray;"></v-divider> -->

      <!-- 선택 메뉴 -->

      <v-list dense nav>
        <v-list-item
            v-for="menu in filterMenus()"
            :key="menu.title"
            :to="menu.route"
            link
            class="ma-5">
          <v-list-item-icon>
            <v-icon color="black">{{ menu.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content style="height: 100%">
            <v-list-item-title class="black--text">
              {{ menu.title }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

const myPageModule = 'myPageModule'

export default {
   name: "MyPageSideBarForm",
   data(){
    return {
      nickName: String,
      memberType: String,
      point: Number,
      dialog: false,
      menus: [],
      search: "",
      preview: '',
      imageFile: null,
      menusForMember: [
         {
            title: "내 정보",
            icon: "mdi-account",
            route: "/member-my-page"
         },
         {
            title: "결제 내역",
            icon: "mdi-currency-usd",
            route: "/member-order-history-page"
         },
         {
            title: "포인트 내역",
            icon: "mdi-alpha-p-circle",
            route: "/member-point-details-page"
         },
         {
            title: "나의 게시글",
            icon: "mdi-clipboard-text",
            route: "/my-free-board-page"
         },
         {
            title: "내가 찜한 카페",
            icon: "mdi-coffee",
            route: "/my-favorite-cafe-page",
         },
         {
            title: "나의 문의",
            icon: "mdi-comment-question",
            route: "/my-question-board-page"
         },
         {
            title: "나의 후기",
            icon: "mdi-star",
            route: "/my-review-board-page"
         },
      ],
      menusForCafe : [
         {
            title: "내 정보",
            icon: "mdi-account",
            route: "/member-my-page"
         },
         {
            title: "주문 내역",
            icon: "mdi-table-chair",
            route: "/my-cafe-order-list-page"
         },
         {
            title: "이벤트 관리",
            icon: "mdi-clipboard-text",
            route: "/my-cafe-event-page"
         },
         {
            title: "카페 관리",
            icon: "mdi-coffee",
            route: "/my-cafe-management-page"
         },
         {
            title: "메뉴 관리",
            icon: "mdi-cup",
            route: "/product-manage-page"
         },
      ],
      menusForManager : [
         {
            title: "내 정보",
            icon: "mdi-account",
            route: "/member-my-page"
         },
         {
            title: "회원 관리",
            icon: "mdi-account-supervisor",
            route: "/member-management-page"
         },
         {
            title: "카페 리스트",
            icon: "mdi-coffee",
            route: "/cafe-management-page"
         },
         {
            title: "포인트 내역",
            icon: "mdi-alpha-p-circle",
            route: "/point-details-page"
         },
      ]
    }
  },
  methods: {
    ...mapActions(
      myPageModule, ['requestMyInfoForSideBarToSpring', 'requestModifyProfileImageToSpring']
    ),
    filterMenus() {
      return this.menus.filter(menu => menu.title.toLowerCase().includes(this.search.toLowerCase()));
    },
    async changeProfileImage() {
      let memberId = JSON.parse(localStorage.getItem('userInfo')).id

      const formData = new FormData();
      formData.append('imageFile', this.imageFile);

      console.log(this.imageFile)
      await this.requestModifyProfileImageToSpring({memberId, formData})

      this.$router.go()
    },
    previewFile(file) {
      if (!file) {
        this.preview = ""
        return
      }

      const fileData = (data) => {
        this.preview = data
      };
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.addEventListener("load", function() {
        fileData(reader.result)
      }, false)
    },
  },
  computed: {
    ...mapState(
      myPageModule, ['myInfoSideBar']
  )
  },
  async created() {
    await this.requestMyInfoForSideBarToSpring(JSON.parse(localStorage.getItem('userInfo')).id)

    console.log("myinfoSideBar: " + JSON.stringify(this.myInfoSideBar))
    this.nickName = this.myInfoSideBar.nickName
    this.memberType = this.myInfoSideBar.memberType
    this.point = this.myInfoSideBar.point

    if(this.point == null) {
      this.point = 0;
    }

    if(this.memberType === "일반회원") {
        this.menus = this.menusForMember
    } else if (this.memberType === "카페회원") {
        this.menus = this.menusForCafe
    } else {
        this.menus = this.menusForManager
    }
  },
  filters: {
    comma(val) {
      return String(val).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    },
}
</script>

<style scoped>

.imagePreview {
  display: inline-block;
  vertical-align: middle;
}

</style>