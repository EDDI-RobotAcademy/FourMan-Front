<template>
  <v-container>
    <div id="home">
      <nav>
        <router-link to="/">Home</router-link> |

        <router-link to="/free-board-list-page">자유게시판 리스트 페이지</router-link>|
        <router-link to="/cafe-board-list-page">카페소개 게시판 리스트 페이지</router-link>
      </nav>
      <router-view />
    </div>
  </v-container>
</template>

<script>
export default {
  name: "HomeView",

  components: {},
};
</script>
