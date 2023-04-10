<template>
  <v-app>
  <!-- 헤더 -->
    <navigation-menu-form/>
    <v-main>
    <!-- 내용 -->
      <router-view/>
    </v-main>

    <!-- 푸터 -->
    <main-footer-form/>
  </v-app>
</template>

<script>

import NavigationMenuForm from '@/components/navigation/NavigationMenuForm.vue';
import MainFooterForm from '@/components/footer/MainFooterForm.vue';

export default {
  name: 'App',

  data: () => ({
    //
  }),

  components: {
    NavigationMenuForm,
    MainFooterForm
  },
};
</script>
