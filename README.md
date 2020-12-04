## RockAdmin
`rock-admin` 是基于 `Vue3`, `element-plus`, `vue-admin-template` 的配置化后台构建工具, 将一个后台应用所需要的 `菜单`, `鉴权`, `路由注册`, `表单`, `表格`等通用场景进行高度封装, 形成组件, 达到基础工具的高度复用.

### 目标

打造一套完整的低代码后台构建工具集, 包含前端和后端的完整链路, 仅需要一些模板化的配置, 即可构造常见的后台功能.

### 快速启动

使用本项目提供的模板快速创建本地项目

```shell
vue create --preset daodao97/rock-admin my-admin
cd my-admin
yarn serve
```

此时即可得到一个完整功能的后台了

![PDEy8u](https://gitee.com/daodao97/asset/raw/master/imgs/PDEy8u.png)

### 入口配置

```javascript
import AppMain from "rock-admin";
AppMain({
  ElementPlus: {  // element 配置
      size: "small",
      zIndex: 3000,
      locale: locale
  },
  config: {sidebarLogo: true, title: "Local"}, // 脚手架基础配置
  routes: [], // 本地路由
  globalComps: [], // 需要注入到全局的组件
  mockApis: [] // 模拟数据接口
});
```

### 类似项目

- 百度 [amis](https://github.com/baidu/amis)
- 唯品会 [ams](https://github.com/vipshop/ams)
