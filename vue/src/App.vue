<template>
  <v-app>
    <v-main>
      <v-app-bar elevation="0">
        <v-btn link to="/" color="primary" text>홈</v-btn>
        <v-btn link to="/wishlist" color="primary" text>위시리스트</v-btn>
      </v-app-bar>
      <router-view />
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "App",

  data: () => ({
    //
  }),
});
</script>
