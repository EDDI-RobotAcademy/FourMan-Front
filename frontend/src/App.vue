<template>
  <v-app>
    <navigation-menu-form/>
    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>

import NavigationMenuForm from "@/components/navigation/NavigationMenuForm.vue";

export default {
  name: 'App',

  data: () => ({
    //
  }),

  components: {
    NavigationMenuForm,
  }
};
</script>
