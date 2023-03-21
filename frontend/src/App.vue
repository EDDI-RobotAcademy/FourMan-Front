<template>
  <v-app>
    <navigation-menu-form/>
    <v-main>
      <router-view/>
    </v-main>
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
