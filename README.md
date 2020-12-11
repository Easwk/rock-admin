## RockAdmin
`rock-admin` 是基于 `Vue3`, `element-plus`, `vue-admin-template` 的配置化后台构建工具, 核心概念是配置化渲染, 页面根据后端下发的 `PageSchema` 自动渲染, 辅助可视化`PgaeSchema`构造工具, 使常见的后台页面可以无代码实现. 

### 目标

打造一套完整的低代码后台构建工具集, 包含前端和后端的完整链路, 通过可视化搭建, 即可实现常见的后台功能.

[体验站点](http://daodao97.gitee.io/rock-admin-demo) | ~~详细文档(doing)~~

### 快速上手

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

### 类似项目

- 百度 [amis](https://github.com/baidu/amis)
- 唯品会 [ams](https://github.com/vipshop/ams)
