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
        <div class="py-2" v-for="(news, i) in category.newsList" :key="i">
          <span>[{{news.categoryName}}]</span>
          <span>|</span>
          <span>{{news.title}}</span>
          <span>{{news.date}}</span>
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

export default {
  data() {
    return {
      swiperOption: {
        pagination: {
          el: ".pagination-home"
        }
      },
      newsData: [
        {
          name: "热门",
          newsList: new Array(5).fill({}).map(_ => ({
            categoryName: "公告",
            title: "6月2日全服不停机更新公告",
            date: "06/01"
          }))
        },
        {
          name: "新闻",
          newsList: new Array(5).fill({}).map(_ => ({
            categoryName: "新闻",
            title: "6月2日全服不停机更新公告",
            date: "06/01"
          }))
        },
        {
          name: "新闻",
          newsList: new Array(5).fill({}).map(_ => ({
            categoryName: "新闻",
            title: "6月2日全服不停机更新公告",
            date: "06/01"
          }))
        },
        {
          name: "新闻",
          newsList: new Array(5).fill({}).map(_ => ({
            categoryName: "新闻",
            title: "6月2日全服不停机更新公告",
            date: "06/01"
          }))
        },
        {
          name: "新闻",
          newsList: new Array(5).fill({}).map(_ => ({
            categoryName: "新闻",
            title: "6月2日全服不停机更新公告",
            date: "06/01"
          }))
        }
      ]
    };
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

