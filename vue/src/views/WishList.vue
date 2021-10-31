<template>
  <v-container class="wishlist">
    <v-row>
      <v-col
        cols="6"
        v-for="(item, idx) in resultList"
        :key="idx"
        @click.stop="selectLocal(item)"
      >
        <v-img :src="item.thumbnail"></v-img>
        <h2 class="text-center">{{ item.title }}</h2>
      </v-col>
    </v-row>
    <v-dialog v-model="dialog">
      <v-card>
        <v-card-title class="text-h5"> 상세보기 </v-card-title>

        <v-card-text>
          <v-row>
            <v-col>
              <v-img
                v-show="selectedItem.thumbnail"
                :src="selectedItem.thumbnail"
              ></v-img>
            </v-col>
            <v-col>
              <v-list-item>
                <v-list-item-title>{{ selectedItem.title }}</v-list-item-title>
              </v-list-item>
              <v-list-item>
                <v-list-item-title>{{
                  selectedItem.category
                }}</v-list-item-title>
              </v-list-item>
              <v-list-item>
                <v-list-item-title>{{
                  selectedItem.address
                }}</v-list-item-title>
              </v-list-item>
              <v-list-item>
                <v-list-item-title>{{
                  selectedItem.roadAddress
                }}</v-list-item-title>
              </v-list-item>
              <v-list-item>
                <v-list-item-title>{{ selectedItem.link }}</v-list-item-title>
              </v-list-item>
            </v-col>
          </v-row>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="warning" text @click="dialog = false">닫기</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  data() {
    return {
      dialog: false,
      resultList: [],
      selectedItem: {},
    };
  },

  mounted() {
    const wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
    this.resultList = wishlist;
  },

  methods: {
    selectLocal(item: any) {
      this.selectedItem = item;
      this.dialog = true;
    },
  },
});
</script>
