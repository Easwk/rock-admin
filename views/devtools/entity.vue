<template>
  <el-row>
    <div class="my-card">
      <el-button>从表结构解析</el-button>
      <el-button>查看当前实体配置</el-button>
      <el-button>保存为菜单</el-button>
    </div>
    <el-card shadow="never" class="my-card">
      <template #header>
        <div>
          <span>新建/编辑</span>
          <el-button style="float: right; padding: 3px 0" type="text" @click="showFromItems = !showFromItems">管理表单项</el-button>
        </div>
      </template>
      <v-form :key="formKey" v-bind="form" />
      <el-dialog
        v-model="showFromItems"
        title="表单项"
        width="70%"
        :before-close="beforeFormItemClose"
      >
        <v-table ref="form-items" v-bind="formItemTable" />
      </el-dialog>
    </el-card>
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
import VTable from '../../components/table'
import VForm from '../../components/form'
export default {
  name: 'Entity',
  components: { VTable, VForm },
  data() {
    return {
      formKey: 1,
      tableKey: 1,
      entity: {
        name: '',
        fields: []
      },
      showFromItems: false,
      formItemTable: {
        showPagination: false,
        listIncrease: {
          state: true,
          location: 'afterList',
          type: 'append'
        },
        headers: [
          {
            type: 'input',
            field: 'field',
            label: '字段名',
            edit: true
          },
          {
            type: 'select',
            field: 'type',
            label: '类型',
            edit: true,
            options: [
              { value: 'input', label: 'input' },
              { value: 'radio', label: 'radio' },
              { value: 'select', label: 'select' }
            ]
          },
          {
            type: 'input',
            field: 'label',
            label: '显示名',
            edit: true
          },
          {
            type: 'input',
            field: 'info',
            label: '提示',
            edit: true
          },
          {
            type: 'json',
            field: 'props',
            label: '原始属性',
            edit: true,
            columnProps: {
              width: '300px'
            }
          },
          {
            type: 'json',
            field: 'options',
            label: '备选项',
            edit: true,
            columnProps: {
              width: '300px'
            }
          }
        ],
        list: []
      },
      form: {
        formItems: []
      },
      showTable: false,
      table: {
        headers: []
      }
    }
  },
  methods: {
    beforeFormItemClose(done) {
      this.$refs['form-items'].tableList.forEach((item, index) => {
        if (!item.field) {
          this.$message({ type: 'error', message: '表单第' + (index + 1) + '项, 字段名是必须的' })
          return false
        }
        if (!item.type) {
          this.$message({ type: 'error', message: '表单第' + (index + 1) + '项, 类型是必须的' })
          return false
        }
        if (!item.label) {
          this.$message({ type: 'error', message: '表单第' + (index + 1) + '项, 显示名是必须的' })
          return false
        }
      })
      this.form.formItems = this.$refs['form-items'].tableList
      done()
      this.formKey++
    },
    syncForm() {
      this.table.headers = this.form.formItems
      this.tableKey++
    }
  }
}
</script>
<style>
  .my-card {
    margin-bottom: 20px;
  }
</style>
