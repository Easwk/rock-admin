# RockAdmin
`rock-admin` 是基于 `Vue3`, `element-plus`, `vue-admin-template` 的配置化后台构建工具, 核心概念是配置化渲染, 页面根据后端下发的 `PageSchema` 自动渲染, 辅助可视化`PageSchema`构造工具, 使常见的后台页面可以无代码实现.

## 目标

打造一套完整的低代码后台构建工具集, 包含前端和后端的完整链路, 通过可视化搭建, 即可实现常见的后台功能.

[体验站点](http://daodao97.gitee.io/rock-admin-demo) | ~~详细文档(doing)~~

也可本地启动示例项目

```shell
git clone https://github.com/daodao97/rock-admin.git
cd rock-admin/exmaple
yarn
yarn serve
```

## 快速上手

使用本项目提供的模板快速创建本地项目

```shell
vue create --preset daodao97/rock-admin my-admin
cd my-admin
yarn serve
```

此时即可得到一个完整功能的后台了

![xm4lCR](https://gitee.com/daodao97/asset/raw/master/imgs/xm4lCR.png)

运行机制

![Y66eHA](https://gitee.com/daodao97/asset/raw/master/imgs/Y66eHA.png)

## 启动配置项

默认配置可见 [src/options](https://github.com/daodao97/rock-admin/blob/master/src/options.js)

```javascript
{
  ElementPlus: {
    size: 'small',
    zIndex: 3000,
    locale: locale
  },
  nav: [],
  routes: [],
  globalComps: [],
  mock: { enable: false, apis: [], baseURI: '', defaultMockApi: true },
  use: [],
  config: {
    title: 'RockAdmin',
    fixedHeader: false,
    sidebarLogo: true,
    logo: 'https://wpimg.wallstcn.com/69a1c46c-eb1c-4b46-8bd4-e9e686ef5251.png',
    closeNavNotice: false,
    navBarNotice: '顶部消息提示',
    hasNewMessage: true,
    showPageJsonSchema: true,
    loginTips: '登录信息提示',
    sso: [],
    axios: {
      baseURL: '/api'
    }
  }
}
```

- `ElementPlus` 为 `element-plus` 默认配置, [文档](https://element-plus.gitee.io/#/quan-ju-pei-zhi)
- `nav` 为 页面顶部导航按钮,
- `routes` 为 本地 `vue-router` 路由
- `globalComps` 为 注册到全局的组件
- `mock` 为 `api` 模拟数据配置
    - `enable` 是否启用 `mock`
    - `apis` 需要注入的本地模拟接口
    - `defaultMockApi` 是否启动底层的模拟接口
- `use` 底层为 `app.use`
- `config` 为站点配置
    - `title` 站点名称
    - `fixedHeader` 顶部导航栏装态
    - `sidebarLogo` 是否显示logo
    - `logo` 项目 logo图片地址
    - `navBarNotice` 项目打开的消息提示
    - `showPageJsonSchema` 是否显示页面的配置
    - `loginTips` 登录页面提交表单的提示文字
    - `sso` 企业微信和钉钉的登录配置
    - `axios`

## 组件

## VForm 表单组件
### props

| 参数        | 说明                                       | 类型   | 默认值   | 可选值        |
| ----------- | ------------------------------------------ | ------ | -------- | ------------- |
| modelValue  | 表单各字段默认值                           | Object | {}       |               |
| formItems   | 表单字段配置, 具体见下方                   | Array  | []       |               |
| infoApi     | 表单schema拉取接口, 不为空是将覆盖本地属性 | String | 空字符串 |               |
| saveApi     | 表单保存接口                               | String | 空       |               |
| options     | 表单配置                                   | Object | 见下方   |               |
| afterSubmit | 表单提交后动作                             | String | 空       | goback/reload |
| afterReset  | 变动取消按钮点击后动作                     | String | 空       | goback/reload |

#### options默认值, 其他配置参见 [element-plus/form](https://element-plus.gitee.io/#/form-attributes)

```javascript
{
  inline: false, // 行模式
  labelPosition: 'right', 
  labelWidth: '100px',
  submitButton: { // false时则隐藏提交按钮
    show: true,
    type: 'primary',
    text: '提交'
  },
  cancelButton: { // false时则隐藏取消按钮
    show: true,
    type: 'info',
    text: '取消'
  }
}
```

#### formItems 表单控件配置

可查看 [example](https://github.com/daodao97/rock-admin/blob/master/example/mock/data/example.js) 完整样例,

表单控件各项配置说明

```javascript
[
  {
    type: "input", // 字段类型
    field: "field_name", // 字段名
    label: "展示名",
    value: "", // 字段值, 默认undefind
    info: "表单控件提示信息", // 支持html
    rules: [], // 字段校验规则
    props: {}, // element-plush 组件原生的属性, 如 https://element-plus.gitee.io/#/input-attributes
    options: [], // select/radio/checkbox 等组件的备选项
    col: { span: 12 }, // 控件布局
    section: "" // 表单分片
  }
]
```

##### 完整控件列表

-   input
-   number
-   number-range
-   select
-   radio
-   checkbox
-   image
-   upload
-   witch
-   icon-select
-   date
-   datetime
-   sub-form
-   cascader
-   cascader-panel
-   codemirror
-   slider
-   transfer
-   color
-   rate

### form event

| 事件名            | 说明         | 回调参数               |
| ----------------- | ------------ | ---------------------- |
| submit            | 表单提交事件 | formData               |
| reset             | 表单取消事件 |                        |
| fieldchange       | 字段变动事件 | function(field, value) |
| update:modelValue | 更新事件     | formData               |
| mounted           | 组件挂载     |                        |

#### 表单布局

#### 数据版本

### VTable 表格组件

### props

| 参数           | 说明                                                         | 类型          | 默认值                                                       | 可选值 |
| -------------- | ------------------------------------------------------------ | ------------- | ------------------------------------------------------------ | ------ |
| filter         | 表单过滤项, 同formItems                                      | Array         | []                                                           |        |
| headers        | 表头                                                         | Array         | []                                                           |        |
| list           | 默认列表数据                                                 | Array         | []                                                           |        |
| listApi        | 列表数据拉取接口                                             | String        | 空                                                           |        |
| infoApi        | 组件属性拉取接口                                             | String        | 空                                                           |        |
| batchButton    | 批量操作按钮                                                 | Array         | []                                                           |        |
| normalButton   | 表单操作按钮                                                 | Array         | []                                                           |        |
| rowButton      | 行操作按钮                                                   | Array         | []                                                           |        |
| showPagination | 是否显示分页组件                                             | Boolen        | true                                                         |        |
| selectedNotice | 批量选中时的提示文案                                         | String/Object | 空                                                           |        |
| listIncrease   | 编辑模式, 新增行按钮                                         | Boolen/Object | false                                                        |        |
| tableProps     | ElementPlus 表格原始属性 [文档](https://element-plus.gitee.io/#/table-attributes) | Object        | {<br/>  **"border"**:**true**,<br/>  **"stripe"**:**true**,<br/>  **"size"**:**"mini"**,<br/>  **"rowKey"**:**"id"**,<br/>  **"lazy"**:**true**,<br/>  **"defaultExpandAll"**:**false**<br/>} |        |

### table event

| 事件名      | 说明       | 回调参数              |
| ----------- | ---------- | --------------------- |
| cell-change | 行变动事件 | {index, field, value} |

### VButton 按钮

### props

| 参数   | 说明                                               | 类型   | 默认值 | 可选值             |
| ------ | -------------------------------------------------- | ------ | ------ | ------------------ |
| text   | 按钮文案                                           | String | 空     |                    |
| tips   | 提示文案, 按钮形式是可用                           | String | 空     |                    |
| type   | 按钮类型, 可为 页面跳转/接口请求/表单/列表         | String | 空     | jump/api/form/list |
| target | 目标, 可为 vue-router/path , url, api              | String | 空     |                    |
| api    | type为api时, 如 {method: 'POST', url: '/test_api’} | Object | {}     |                    |
| form   | type为form时可用, 表单属性                         | Object | {}     |                    |
| table  | type为list时可用, 列表属性                         | Object | {}     |                    |

### event

| 事件名 | 说明            | 回调参数          |
| ------ | --------------- | ----------------- |
| click  | 点击事件        | function(bnt)     |
| action | api请求成功事件 | function(payload) |

#### VButtonGroup 按钮组

### props

| 参数    | 说明     | 类型   | 默认值 | 可选值      |
| ------- | -------- | ------ | ------ | ----------- |
| type    | 展示类型 | String | button | button/link |
| buttons | 按钮配置 | Array  | []     |             |

### event

| 事件名 | 说明            | 回调参数          |
| ------ | --------------- | ----------------- |
| click  | 点击事件        | function(bnt)     |
| action | api请求成功事件 | function(payload) |

### 权限控制

`/user/info` 接口返回当前用户的`resource`,

`/user/routes` 接口返回系统可用资源

系统将在 `src/store/modules/user.js line 174` 行对可用资源做过滤, 仅保留当前用户有权限的资源列表.

### 接口协议

接口请求中会统一添加 header 头 `Authorization`, 值为当前用户 `token`

响应结构

```javascript
// 正常情况
{
	code: 0
	payload: {}
}

// 错误情况
{
	code: 400, // 非零
	message: "错误信息"
}
```

### 响应码

### 类似项目

- 百度 [amis](https://github.com/baidu/amis)
- 唯品会 [ams](https://github.com/vipshop/ams)

