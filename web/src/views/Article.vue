<template>
  <div class="page-arilce" v-if="model">
    <div class="d-flex py-3 px-2 border-bottom">
      <div class="iconfont icon-Back text-blue"></div>
      <div class="flex-1 text-blue pl-2">{{model.title}}</div>
      <div class="text-gray fs-xs">2019-08-27</div>
    </div>
    <div v-html="model.body" class="px-3 body"></div>
    <div class="px-3 py-2 border-top">
      <div class="d-flex ai-center">
        <i class="iconfont icon-news"></i>
        <div class="text-blue ml-2">相关资讯</div>
      </div>
    </div>
    <div class="pt-2">
      <router-link
        class="py-1 px-3"
        tag="div"
        v-for="item in model.related"
        :to="`/articles/${item._id}`"
        :key="item._id"
      >{{ item.title }}</router-link>
    </div>
  </div>
</template>


<script>
export default {
  props: {
    id: {
      required: true
    }
  },
  data() {
    return {
      model: null
    };
  },
  watch: {
    // id 变化后执行 fetch
    // id: "fetch"
    id() {
      this.fetch();
    }
  },
  methods: {
    async fetch() {
      const res = await this.$http.get(`articles/${this.id}`);
      this.model = res.data;
    }
  },
  created() {
    this.fetch();
  }
};
</script>


<style lang="scss" scoped>
.page-arilce {
  .icon-Back {
    font-size: 1.6923rem;
  }
  .body {
    img {
      max-width: 100%;
      height: auto;
    }
    iframe {
      width: 100%;
      height: auto;
    }
  }
}
</style>
