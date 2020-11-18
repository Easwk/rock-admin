<template>
  <!--  筛选条件  -->
  <el-card shadow="never" class="table-filter">
    <slot name="filter">
      <v-form
        v-if="tableFilter.length > 0"
        v-model="filterForm"
        class="filter-form"
        :options="filterFormOptions"
        :form-items="tableFilter"
        @submit="searchAction"
      />
    </slot>
  </el-card>
  <el-card shadow="never">
    <!--   批量按钮/其他按钮   -->
    <slot name="action">
      <el-row :gutter="20">
        <el-col :span="12">
          <v-button :buttons="makeBatchButton(tableBatchButton)" />
        </el-col>
        <el-col :span="12" class="normal-button">
          <v-button :buttons="makeNormalButton(tableNormalButton)" />
        </el-col>
      </el-row>
    </slot>
    <el-divider
      v-if="tableBatchButton.length > 0 || tableNormalButton.length > 0"
    />
    <!--  列表  -->
    <!--   v-loading 启用是 表格边框的bug   -->
    <slot name="table">
      <el-table
        v-loading="loading"
        :data="tableList"
        :border="true"
        :stripe="true"
        size="mini"
        header-cell-class-name="table-header-cell"
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column v-if="tableBatchButton.length > 0" type="selection" />
        <el-table-column
          v-for="(item, index) in tableHeaders"
          :key="index + '-table-column'"
          :prop="item.field"
          :label="item.label"
        >
          <!--    表头    -->
          <template #header>
            <span>{{ item.label }}</span>
            <el-tooltip v-if="item.info" effect="dark">
              <i class="el-icon-warning-outline" />
              <template #content> <span v-html="item.info" /> </template>
            </el-tooltip>
          </template>
          <!--    单元格    -->
          <template #default="scope">
            <component
              :is="cellType(item)"
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
            <v-button :buttons="makeRowButton(tableRowButton, scope.row)" />
          </template>
        </el-table-column>
        <template #empty> 没有数据 </template>
      </el-table>
    </slot>
    <slot name="page">
      <div class="table-pageination">
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
  </el-card>
</template>

<script>
import Cells from './cell/index'
import VForm from '../form'
import VButton from '../button/VButton'
import { firstUpperCase, isArray } from '../../utils'

export default {
  name: 'VTable',
  components: Object.assign(
    {
      VForm,
      VButton
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
    }
  },
  data() {
    return {
      filterFormOptions: {
        inline: true,
        labelPosition: 'right',
        labelWidth: 'auto',
        submitButton: true,
        cancelButton: {
          text: '重置1'
        }
      },
      tableNormalButton: this.$props.normalButton,
      tableBatchButton: this.$props.batchButton,
      tableRowButton: this.$props.rowButton,
      tableHeaders: this.$props.headers,
      tableFilter: this.$props.filter,
      tableList: this.$props.list,
      selectionRows: [],
      page: {
        pageSize: 20,
        sizes: [20, 100, 200],
        currentPage: 1,
        total: 200
      },
      paginationKey: 0,
      filterForm: {},
      loading: false
    }
  },
  beforeCreate() {
    if (this.$props.infoApi) {
      this.$http
        .request({ method: 'GET', url: this.$props.infoApi })
        .then(({ payload }) => {
          Object.keys(payload).forEach(
            (key) => (this['table' + firstUpperCase(key)] = payload[key])
          )
        })
    }
  },
  mounted() {
    setTimeout(() => this.load(), 200)
  },
  methods: {
    cellType(column) {
      return 'cell-' + (column.type || 'span')
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
    load(args = {}) {
      this.loading = true
      if (args.resetPage !== false) {
        this.page.currentPage = 1
      }
      const params = Object.assign({}, this.getAvailableFilter(), {
        _page: this.page.currentPage,
        _size: this.page.pageSize
      })
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
      return arr.map((item) => {
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
.table-pageination {
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
::v-deep(.el-card__body) {
  padding-bottom: 0;
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
</style>
