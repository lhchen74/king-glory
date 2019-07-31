<template>
  <div>
    <h1>新建分类</h1>
    <el-form>
      <el-form-item label="名称" @submit.native.prevent="save">
        <el-input v-model="model.name"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>


<script>
export default {
  data() {
    return {
      model: {}
    };
  },
  methods: {
    save() {
      //   this.$http.post();
    }
  }
};
</script>
