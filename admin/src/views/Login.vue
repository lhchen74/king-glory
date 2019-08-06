<template>
  <div>
    <el-card header="请登录" class="login-card">
      <!--native: 表示监听表单的原生事件， prevent 表示阻止表单默认的跳转 url-->
      <el-form @submit.native.prevent="login">
        <el-form-item label="用户名">
          <el-input v-model="model.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" style="margin-top: -1rem">
          <el-input type="password" v-model="model.password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" native-type="submit">登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
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
    async login() {
      const res = await this.$http.post("login", this.model);
      // sessionStorage.token = res.data.token;
      localStorage.token = res.data.token;
      this.$router.push("/");
      this.$message({
        type: "success",
        message: "登陆成功"
      });
    }
  }
};
</script>

<style>
.login-card {
  width: 25rem;
  margin: 5rem auto;
  background-color: #bbb;
}
</style>
