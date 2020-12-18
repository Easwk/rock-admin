<template>
  <!--  筛选条件  -->
  <el-card v-if="tableFilter.length > 0 && tableBatchButton.length > 0" shadow="never" class="table-filter">
    <slot name="filter">
      <v-form
        v-if="tableFilter.length > 0"
        :key="formKey"
        ref="filter"
        v-model="filterForm"
        class="filter-form"
        :options="filterFormOptions"
        :form-items="tableFilter"
        @submit="searchAction"
        @reset="resetFilter"
      />
    </slot>
  </el-card>
  <el-card shadow="never">
    <!--   批量按钮/其他按钮   -->
    <slot name="action">
      <el-row :gutter="20">
        <el-col :span="tableBatchButton.length > 0 ? 12 : 18">
          <template v-if="tableBatchButton.length === 0">
            <slot name="filter">
              <v-form
                v-if="tableFilter.length > 0"
                :key="formKey"
                ref="filter"
                v-model="filterForm"
                class="filter-form"
                :options="filterFormOptions"
                :form-items="tableFilter"
                @submit="searchAction"
                @reset="resetFilter"
              />
            </slot>
          </template>
          <template v-else>
            <v-button :buttons="makeBatchButton(tableBatchButton)" />
            <div v-if="tableBatchButton.length > 0 && selectedInfoPosition === 'afterBatchButton'" class="selected-info">
              <span v-html="selectedInfo" />
            </div>
          </template>
        </el-col>
        <el-col :span="tableBatchButton.length > 0 ? 12 : 6" class="normal-button">
          <v-button :buttons="makeNormalButton(tableNormalButton)" />
        </el-col>
      </el-row>
    </slot>
    <el-divider
      v-if="tableBatchButton.length > 0 || tableNormalButton.length > 0"
    />
    <el-button v-if="listIncreaseConf.state && listIncreaseConf.location === 'beforeList'" class="list-incr-button" @click="listIncreaseRecord">添加</el-button>
    <!--  列表  -->
    <slot name="table">
      <el-table
        v-loading="loading"
        :data="tableList"
        :load="loadChildren"
        style="width: 100%"
        v-bind="tableTableProps"
        @selection-change="handleSelectionChange"
        @sort-change="sortTable"
      >
        <el-table-column v-if="tableBatchButton.length > 0" type="selection" />
        <el-table-column
          v-for="(item, index) in tableHeaders"
          :key="index + '-table-column'"
          :prop="item.field"
          :label="item.label"
          v-bind="getColumnProps(item.columnProps || {})"
        >
          <!--    表头    -->
          <template #header>
            <span>{{ item.label }}</span>
            <el-tooltip v-if="item.info" effect="dark" placement="top-start">
              <i class="el-icon-warning-outline" />
              <template #content><span v-html="item.info" /></template>
            </el-tooltip>
          </template>
          <!--    单元格    -->
          <template #default="scope">
            <cell-edit
              v-if="item.edit"
              :key="`${index}-${rowKey}`"
              v-model="scope.row[scope.column.property]"
              v-bind="{item: item}"
              @update:modelValue="value => cellChange(scope.index_, item.field, value)"
            />
            <component
              :is="cellType(item)"
              v-else
              v-bind="{
                data: scope.row[scope.column.property],
                column: item,
              }"
            />
          </template>
        </el-table-column>
        <!--     操作     -->
        <el-table-column v-if="tableRowButton.length > 0" label="操作" fixed="right" :width="actionColumnWidth()">
          <template #default="scope">
            <v-button :buttons="makeRowButton(tableRowButton, scope.row)" @action="btnAction" />
          </template>
        </el-table-column>
        <template #empty> 没有数据 </template>
      </el-table>
    </slot>
    <el-button v-if="listIncreaseConf.state && listIncreaseConf.location === 'afterList'" class="list-incr-button" @click="listIncreaseRecord">添加</el-button>
    <el-row>
      <el-col :span="12" style="min-height: 20px">
        <div v-if="tableBatchButton.length > 0 && selectedInfoPosition === 'beforePagination'" class="selected-info">
          <span v-html="selectedInfo" />
        </div>
      </el-col>
      <el-col :span="12">
        <slot name="page">
          <div v-if="tableShowPagination" class="table-pagination">
            <el-pagination
              :key="paginationKey"
              background
              :page-size="page.pageSize"
              :page-sizes="page.sizes"
              :current-page="page.currentPage"
              layout="total, sizes, prev, pager, next"
              :total="page.total"
              @size-change="pageSizesChange"
              @current-change="(page) => currentPageChange(page)"
            />
          </div>
        </slot>
      </el-col>
    </el-row>
  </el-card>
</template>

<script>
import Cells from './cell'
import VForm from '../form/index'
import VButton from '../button/VButton'
import { firstUpperCase, isArray, strVarReplace, isObject, isBool, setUrlParams, ruleCompute } from '../../utils'
import pipe from '../../utils/pipe'
import CellEdit from './cellEdit/index'

export default {
  name: 'VTable',
  components: Object.assign(
    {
      VForm,
      VButton,
      CellEdit
    },
    Cells
  ),
  props: {
    headers: {
      type: Array,
      default: () => []
    },
    list: {
      type: Array,
      default: () => []
    },
    listApi: {
      type: String,
      default: ''
    },
    infoApi: {
      type: String,
      default: ''
    },
    filter: {
      type: Array,
      default: () => []
    },
    batchButton: {
      type: Array,
      default: () => []
    },
    normalButton: {
      type: Array,
      default: () => []
    },
    rowButton: {
      type: Array,
      default: () => []
    },
    showPagination: {
      type: Boolean,
      default: true
    },
    selectedNotice: {
      type: [String, Object],
      default: ''
    },
    listIncrease: {
      type: [Boolean, Object],
      default: false
    },
    tableProps: {
      type: Object,
      default: _ => {}
    }
  },
  emits: ['cell-change'],
  data() {
    const tableDefaultProps = {
      border: true,
      stripe: true,
      size: 'mini',
      rowKey: 'id',
      lazy: true,
      defaultExpandAll: false
    }
    return {
      rowKey: 0,
      formKey: 0,
      tableDefaultProps: tableDefaultProps,
      filterFormOptions: {
        inline: true,
        labelPosition: 'right',
        labelWidth: 'auto',
        submitButton: true,
        cancelButton: {
          text: '重置'
        }
      },
      tableNormalButton: this.$props.normalButton,
      tableBatchButton: this.$props.batchButton,
      tableRowButton: this.$props.rowButton,
      tableHeaders: this.$props.headers,
      tableFilter: this.$props.filter,
      tableList: this.$props.list,
      tableSelectedNotice: this.$props.selectedNotice,
      tableShowPagination: this.$props.showPagination,
      tableTableProps: Object.assign({}, tableDefaultProps, this.$props.tableProps),
      selectionRows: [],
      page: {
        pageSize: 20,
        sizes: [20, 100, 200],
        currentPage: 1,
        total: 0
      },
      paginationKey: 0,
      filterForm: Object.assign({}, this.$route.query),
      loading: false,
      sort: null
    }
  },
  computed: {
    listIncreaseConf() {
      if (isBool(this.$props.listIncrease)) {
        if (this.$props.listIncrease === false) {
          return {
            state: false
          }
        } else {
          return {
            state: true,
            type: 'append',
            location: 'beforeList'
          }
        }
      }
      return this.$props.listIncrease
    },
    selectedInfoPosition() {
      return isObject(this.tableSelectedNotice) ? this.tableSelectedNotice.position : 'beforePagination'
    },
    selectedInfo() {
      const data = {
        selectedCount: this.selectionRows.length
      }
      const tpl = isObject(this.tableSelectedNotice) ? this.tableSelectedNotice.text : this.tableSelectedNotice
      const match = tpl.match(/{([\s\S]*?)}/g).map(item => item.replace('{', '').replace('}', ''))
      const fields = this.tableHeaders.map(item => item.field)
      for (const i in match) {
        const tokens = match[i].split('|')
        if (tokens.length === 1) {
          continue
        }
        if (fields.indexOf(tokens[0]) === -1) {
          continue
        }
        const column_data = this.selectionRows.map(item => item[tokens[0]])
        data[match[i]] = pipe.execute(column_data, tokens.slice(1))
      }
      return strVarReplace(tpl, data)
    }
  },
  beforeCreate() {
    if (this.$props.infoApi) {
      this.$http
        .request({ method: 'GET', url: this.$props.infoApi })
        .then(({ payload }) => {
          Object.keys(payload).forEach(key => {
            if (key === 'tableProps') {
              this['table' + firstUpperCase(key)] = Object.assign({}, this.tableDefaultProps, payload[key])
            } else {
              this['table' + firstUpperCase(key)] = payload[key]
            }
          }
          )
        })
    }
  },
  mounted() {
    setTimeout(() => this.load(), 200)
  },
  methods: {
    resetFilter() {
      this.filterForm = {}
      this.formKey++
      this.load()
    },
    cellType(column) {
      let type = column.type || 'span'
      type = type === 'input' ? 'span' : type
      return `cell-${type}`
    },
    getAvailableFilter() {
      const available = {}
      Object.keys(this.filterForm).map((key) => {
        if (this.filterForm[key] !== '' && this.filterForm[key] !== undefined) {
          available[key] = this.filterForm[key]
        }
      })

      return available
    },
    searchAction() {
      const available = this.getAvailableFilter()
      if (Object.keys(available).length === 0) {
        this.$message({ message: '请填写删选条件', type: 'warning' })
        return
      }
      this.load()
    },
    load(args = {}, extraPrams = {}) {
      if (!this.listApi) {
        return
      }
      this.loading = true
      if (args.resetPage !== false) {
        this.page.currentPage = 1
      }
      const filter = this.getAvailableFilter()
      const page = {
        _page: this.page.currentPage,
        _size: this.page.pageSize
      }
      const params = Object.assign({}, filter, page, this.sort, extraPrams)
      // if (this.activeTab) {
      //   params[this.activeTab.field] = this.activeTab.value
      // }
      this.$http
        .request({
          type: 'GET',
          url: this.listApi,
          params: params
        })
        .then(({ payload }) => {
          this.tableList = payload.list
          this.page = Object.assign(this.page, payload.page || {})
          this.loading = false
          setUrlParams(filter)
        })
    },
    handleSelectionChange(rows) {
      this.selectionRows = rows
    },
    batchButtonPreCheck() {
      if (this.selectionRows.length === 0) {
        this.$message({ message: '请勾选相应记录', type: 'warning' })
        return false
      }
      return true
    },
    pageSizesChange(pageSize) {
      this.page.pageSize = pageSize
      this.paginationKey += 1
      this.load()
    },
    currentPageChange(currentPage) {
      if (currentPage - this.page.currentPage > 100) {
        this.$message({
          message: '禁止大跨度翻页',
          type: 'error'
        })
        this.paginationKey += 1
        return
      }
      this.page.currentPage = currentPage
      this.load({ resetPage: false })
      // window.scrollTo({ top: 0, behavior: 'smooth' })
    },
    isArray(tmp) {
      return isArray(tmp)
    },
    makeBatchButton(arr) {
      return arr.map((item) => {
        if (isArray(item)) {
          item = this.makeBatchButton(item)
        } else {
          item['pre-check'] = this.batchButtonPreCheck
        }
        return item
      })
    },
    makeNormalButton(arr) {
      return arr.map((item) => {
        if (isArray(item)) {
          item = this.makeNormalButton(item)
        } else {
          // todo
        }
        return item
      })
    },
    makeRowButton(arr, row) {
      return this.$lodash.cloneDeep(arr).filter(item => {
        if (item.when) {
          let tmp = item.when
          if (!isArray(item.when[0])) {
            tmp = [item.when]
          }
          return ruleCompute(row, tmp)
        }
        return true
      }).map((item) => {
        if (isArray(item)) {
          item = this.makeRowButton(item)
        } else {
          item['inject-data'] = row
          item['meta-data'] = row
        }
        return item
      })
    },
    actionColumnWidth() {
      let ratio = 0
      this.tableRowButton.forEach((item) => {
        ratio += item.text ? item.text.length : 3
      })
      return ratio * 10 * 2
    },
    listIncreaseRecord() {
      const record = {}
      Object.keys(this.tableHeaders).forEach(item => {
        record[item.field] = undefined
      })
      if (this.listIncreaseConf.type === 'append') {
        this.tableList.push(record)
      } else if (this.listIncreaseConf.type === 'unshift') {
        this.tableList.unshift(record)
      } else {
        console.log('unknown listIncrease type')
      }
      this.rowKey++
    },
    cellChange(index, field, value) {
      this.$emit('cell-change', { index, field, value })
    },
    getColumnProps(props) {
      return {
        sortable: props.sortable ? 'custom' : false
      }
    },
    sortTable({ column, order, prop }) {
      if (order && prop) {
        this.sort = { _sort_by: prop, _sort_type: order }
      } else {
        this.sort = null
      }
      this.load()
    },
    loadChildren(row, treeNode, resolve) {
      this.$http
        .request({
          type: 'GET',
          url: this.listApi,
          params: { pid: row.id }
        })
        .then(({ payload }) => {
          resolve(payload.list || [])
        })
    },
    btnAction() {
      this.load()
    }
  }
}
</script>
<style lang="scss" scoped>
.filter-form {
  ::v-deep(.el-form-item__label) {
    /*text-align-last: justify;*/
  }
}
.selected-info {
  padding: 10px 0;
  height: 28px;
  line-height: 28px;
  color: #909399;
  font-size: 13px;
}
.table-pagination {
  text-align: right;
  padding: 10px 0;
  ::v-deep(.el-pagination) {
    padding-left: 0;
    padding-right: 0;
  }
}
.normal-button {
  text-align: right;
  float: right;
}
.table-filter {
  margin-bottom: 15px;
}
::v-deep(.el-divider--horizontal) {
  margin: 10px 0;
}
::v-deep(.table-header-cell) {
  background-color: #f5f5f5;
}
::v-deep(.el-button + .el-button) {
  margin-left: 0;
}
::v-deep {
  .el-button {
    margin-right: 10px;
    &:last-child {
      margin-right: 0;
    }
  }
  .el-dropdown {
    margin-right: 10px;
    &:last-child {
      margin-right: 0;
    }
  }
}
.list-incr-button {
  width: 100%;
  margin-bottom: 10px;
  margin-top: 10px;
}
::v-deep(.el-form-item) {
   margin-bottom: 0;
}
::v-deep(.el-form-item--small.el-form-item) {
   margin-bottom: 0;
}
::v-deep(.form-section) {
  margin-bottom: 0;
}
</style>
