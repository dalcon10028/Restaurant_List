<template>
  <v-container>
    <v-row>
      <v-col cols="8">
        <v-text-field
          v-model="keyword"
          outlined
          label="맛집을 검색해주세요 ex.(판교 갈비집)"
        ></v-text-field>
      </v-col>
      <v-col>
        <v-btn color="primary" block x-large @click="searchList">검색</v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="1">최근기록</v-col>
      <v-col>
        <v-chip-group active-class="primary--text" column>
          <v-chip v-for="tag in tags" :key="tag" @click="onClickHistory(tag)">
            {{ tag }}
          </v-chip>
        </v-chip-group>
      </v-col>
    </v-row>
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
          <v-btn color="green darken-1" text @click="pushWish">
            위시리스트 추가
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import { fetchLocalList, fetchImageList } from "@/api/index";

export default Vue.extend({
  name: "Home",

  data() {
    return {
      dialog: false,
      keyword: "갈비탕",
      resultList: [],
      selectedItem: {
        thumbnail: null,
        title: "",
      },
      tags: [],
    };
  },

  created() {
    this.fetchSearchHistory();
  },

  methods: {
    async searchList() {
      const {
        data: { items },
      } = await fetchLocalList(this.keyword);
      const { data } = await fetchImageList(this.keyword);
      this.resultList = items.map((item: any, idx: number) => ({
        ...item,
        thumbnail: data.items[idx].thumbnail,
      }));
      this.pushSearchHistory(this.keyword);
    },

    selectLocal(item: any) {
      this.selectedItem = item;
      this.dialog = true;
    },

    pushWish() {
      const item = this.selectedItem;
      const wishList = JSON.parse(localStorage.getItem("wishlist") || "[]");
      wishList.push(item);
      localStorage.setItem("wishlist", JSON.stringify(wishList));
      this.dialog = false;
      alert(`${this.selectedItem.title}이 위시리스트에 추가되었습니다!`);
    },

    pushSearchHistory(keyword: string) {
      const history = JSON.parse(
        localStorage.getItem("search-history") || "[]"
      );

      // 키워드가 검색 이력에 없는 경우
      if (!history.find((word: string) => word === keyword)) {
        if (history.length >= 5) history.shift();
        this.tags = history;
        history.push(keyword);
        localStorage.setItem("search-history", JSON.stringify(history));
      }
    },

    fetchSearchHistory() {
      const history = JSON.parse(
        localStorage.getItem("search-history") || "[]"
      );
      console.log(history);
      this.tags = history;
    },

    onClickHistory(keyword: string) {
      this.keyword = keyword;
      this.searchList();
    },
  },
});
</script>
