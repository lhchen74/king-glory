<template>
  <div>
    <h1>英雄列表</h1>
    <el-table :data="heros">
      <el-table-column prop="_id" label="ID" width="250"></el-table-column>
      <el-table-column prop="name" label="英雄名称"></el-table-column>
      <el-table-column prop="title" label="称号"></el-table-column>
      <el-table-column prop="avatar" label="头像">
        <template slot-scope="scope">
          <img :src="scope.row.avatar" style="height: 3rem;" />
        </template>
      </el-table-column>

      <el-table-column fixed="right" label="操作" width="180">
        <template slot-scope="scope">
          <el-button
            type="primary"
            size="small"
            @click="$router.push(`/heros/edit/${scope.row._id}`)"
          >编辑</el-button>
          <el-button type="primary" size="small" @click="remove(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>


<script>
export default {
  data() {
    return {
      heros: []
    };
  },
  methods: {
    async fetch() {
      const res = await this.$http.get("rest/heros");
      this.heros = res.data;
    },
    async remove(row) {
      this.$confirm(`是否确定删除英雄 "${row.name}" ?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(async () => {
        await this.$http.delete(`rest/heros/${row._id}`);
        this.fetch();
        this.$message({
          type: "success",
          message: "删除成功!"
        });
      });
    }
  },
  created() {
    this.fetch();
  }
};
</script>
