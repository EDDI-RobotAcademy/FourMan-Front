<template>
  <nav>
    <v-app-bar color="dark" class="flex-grow-0" app dark>
      <v-app-bar-nav-icon @click="navigation_drawer = !navigation_drawer"/>
          <router-link to="/">
            <v-img class="mx-2" src="@/assets/logo/images.png"
                  max-height="40" max-width="40" contain/>
          </router-link>
      <v-toolbar-title class="text--darken-4">
        <span>카페 예약 페이지</span>
      </v-toolbar-title>

      <v-row>
        <v-col>
          <router-link to="">
          <v-btn>button 1</v-btn>
          </router-link>
        </v-col>
        <v-col>
          <router-link to="">
          <v-btn>button 2</v-btn>
          </router-link>
        </v-col>
        <v-col>
          <router-link to="">
          <v-btn>button 3</v-btn>
          </router-link>
        </v-col>
        <v-col>
          <router-link to="">
          <v-btn>button 4</v-btn>
          </router-link>
        </v-col>

      </v-row>

      <!-- 회원탈퇴 버튼 필요시 작성 -->
      <!-- <v-btn text color="grey">
        <span>회원 탈퇴</span>
        <v-icon right>mdi-login</v-icon>
      </v-btn> -->
      <v-btn v-if="isTrue == true" text @click="clickToggle">
        <span>Sign In</span>
        <v-icon right>mdi-login</v-icon>
      </v-btn>
      <v-btn v-else text @click="clickToggle">
        <span>Sign Out</span>
        <v-icon right>mdi-logout</v-icon>
      </v-btn>
      </v-app-bar>

    <v-navigation-drawer app v-model="navigation_drawer">
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="text-h6">닉네임</v-list-item-title>
          <router-link to="MemberMypage">
          <v-list-item-subtitle>Mypage</v-list-item-subtitle>
          </router-link>
        </v-list-item-content>
      </v-list-item>
      <v-divider></v-divider>
      <v-list nav dense>
        <v-list-item v-for="link in links" :key="link.name" router :to="link.route">
          <v-list-item-action>
            <v-icon left>
              {{ link.icon }}
            </v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>
              {{ link.text }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </nav>
</template>

<script>


export default {
  name: 'NavigationMenuForm',
  data () {
    return {
      isTrue: false,
      navigation_drawer: false,
      links: [
      { icon: 'mdi-bulletin-board', text: '게시판', name: 'Board', route: '/board' },
          { icon: 'mdi-coffee', text: '카페 목록',
              name: 'CafeListPage', route: '/cafe-list-page' },
      ]
  }
},
methods: {
  clickToggle () {
      this.isTrue = !this.isTrue
}
},
}
</script>

<style>

</style>