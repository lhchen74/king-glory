<template>
  <div class="bg-light">
    <!-- start of swiper -->
    <swiper :options="swiperOption">
      <!-- slides -->
      <swiper-slide>
        <img class="w-100" src="../assets/images/a1.jpeg" />
      </swiper-slide>
      <swiper-slide>
        <img class="w-100" src="../assets/images/a2.jpeg" />
      </swiper-slide>
      <swiper-slide>
        <img class="w-100" src="../assets/images/a3.jpeg" />
      </swiper-slide>
      <div class="swiper-pagination pagination-home text-right px-2 pb-1" slot="pagination"></div>
    </swiper>
    <!-- start of swiper -->

    <!--start of icons-->
    <div class="nav-icons bg-white mt-3 text-center text-gray">
      <div class="d-flex flex-wrap">
        <div class="nav-item mb-3 mt-3" v-for="n in 10" :key="n">
          <i class="sprite sprite-news"></i>
          <div class="py-2">爆料站</div>
        </div>
      </div>
      <div class="bg-light0 py-2 fs-sm">
        <i class="sprite sprite-arrow"></i>
        收起
      </div>
    </div>
    <!--end of icons-->

    <m-list-card icon="news" title="新闻资讯" :categories="newsData">
      <!--#items="{category}" 取到子组件绑定的变量 category-->
      <template #items="{category}">
        <router-link
          tag="div"
          :to="`/articles/${news._id}`"
          class="py-2 d-flex"
          v-for="(news, i) in category.newsList"
          :key="i"
        >
          <span>[{{news.categoryName}}]</span>
          <span class="px-2">|</span>
          <span class="flex-1 text-ellipsis pr-2">{{news.title}}</span>
          <span class="text-gray fs-sm">{{news.createdAt | date}}</span>
        </router-link>
      </template>
    </m-list-card>

    <m-list-card icon="card-hero" title="英雄列表" :categories="heroData">
      <!--#items="{category}" 取到子组件绑定的变量 category-->
      <template #items="{category}">
        <div class="d-flex flex-wrap" style="margin: 0 -0.5rem">
          <router-link
            tag="div"
            :to="`/heroes/${hero._id}`"
            class="p-2 text-center"
            style="width: 20%"
            v-for="(hero, i) in category.heroList"
            :key="i"
          >
            <img :src="hero.avatar" class="w-100" />
            <div>{{hero.name}}</div>
          </router-link>
        </div>
      </template>
    </m-list-card>

    <p>1111111111111111</p>
    <p>1111111111111111</p>
    <p>1111111111111111</p>
    <p>1111111111111111</p>
    <p>1111111111111111</p>
    <p>1111111111111111</p>
    <p>1111111111111111</p>
    <p>1111111111111111</p>
  </div>
</template>

<script>
/* eslint-disable */

import dayjs from "dayjs";

export default {
  filters: {
    date(val) {
      return dayjs(val).format("MM/DD");
    }
  },
  data() {
    return {
      swiperOption: {
        pagination: {
          el: ".pagination-home"
        }
      },
      newsData: [],
      heroData: []
    };
  },
  methods: {
    async fetchNewsData() {
      const res = await this.$http.get("news/list");
      this.newsData = res.data;
    },

    async fetchHeroData() {
      const res = await this.$http.get("heroes/list");
      this.heroData = res.data;
    }
  },
  created() {
    this.fetchNewsData();
    this.fetchHeroData();
  }
};
</script>

<style lang="scss">
@import "../assets/scss/variables";
.pagination-home {
  .swiper-pagination-bullet {
    background: map-get($map: $colors, $key: "white");
    opacity: 1;
    border-radius: 0.1538rem;
    &.swiper-pagination-bullet-active {
      background: map-get($colors, "blue-light");
    }
  }
}

.nav-icons {
  border-top: 1px solid $border-color;
  border-bottom: 1px solid $border-color;
  .nav-item {
    width: 25%;
    border-right: 1px solid $border-color;
    &:nth-child(4n) {
      border-right: none;
    }
  }
}
</style>

