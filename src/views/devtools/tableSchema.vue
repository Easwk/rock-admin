<template>
  <el-row>
    <div class="my-card">
      <el-button>从表结构解析</el-button>
      <el-button>查看当前实体配置</el-button>
      <el-button>保存页面</el-button>
    </div>
    <el-card shadow="never" class="my-card">
      <template #header>
        <div>
          <span>列表</span>
          <el-button style="float: right; padding: 3px 0" type="text">筛选项</el-button>
          <el-button style="float: right; padding: 3px 0" type="text" @click="syncForm">同步表单</el-button>
          <el-button style="float: right; padding: 3px 0" type="text" @click="showTable = !showTable">管理列表</el-button>
        </div>
      </template>
      <v-table :key="tableKey" v-bind="table" />
    </el-card>
  </el-row>
</template>
<script>
import VTable from '../../components/table/index'
export default {
  name: 'TableSchema',
  components: { VTable },
  data() {
    return {
      formKey: 1,
      tableKey: 1,
      showTable: false,
      table: {
        headers: []
      }
    }
  },
  methods: {
    syncForm() {
      this.tableKey++
    }
  }
}
</script>
<style>
  .my-card {
    margin-bottom: 20px;
  }
  .card-action {
    display: flex;
    justify-content: flex-end
  }
</style>
