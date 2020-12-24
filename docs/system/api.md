## 系统依赖API

#### 用户相关
1.  登录接口

    URI: `/user/login`

    Method: `POST`

    Params: `{
        "password":"111111",
        "username":"admin"
    }`

    Response: `{
      "code":0,
      "payload":{
        "token":"admin-token"
      }
    }`

2.  用户信息接口

    URI: `/user/info`

    Method: `GET`

    Params: `token={token}`

    Response: `{
      "code":0,
      "payload":{
        "roles":[
          "admin"
        ],
        "introduction":"I am a super administrator",
        "avatar":"https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif",
        "name":"Super Admin"
      }
    }`

3.  路由接口

    URI: `/user/routes`

    Method: `GET`

    Params: `null`

    Response: `{
      "code":0,
      "payload":[
        {
          "name":"用户管理",
          "path":"#",
          "children":[
            {
              "path":"/user/list",
              "name":"用户列表",
              "icon":"el-icon-help",
              "is_show":false
            },
            {
              "path":"/user/form",
              "name":"用户新建",
              "icon":"el-icon-help",
              "is_show":false
            }
          ]
        },
        {
          "path":"/example/chart",
          "name":"图表",
          "view":"Chart"
        },
        {
          "name":"列表",
          "path":"#",
          "icon":"el-icon-help",
          "children":[
            {
              "path":"/list/example",
              "name":"基础样例",
              "view":"Test",
              "icon":"el-icon-help"
            },
            {
              "path":"/list/list",
              "name":"页签样例",
              "icon":"el-icon-help"
            },
            {
              "name":"学生管理",
              "path":"#",
              "children":[
                {
                  "path":"/student/list",
                  "name":"学生列表",
                  "icon":"el-icon-help",
                  "is_show":false
                },
                {
                  "path":"/student/form",
                  "name":"学生新建",
                  "icon":"el-icon-help",
                  "is_show":false
                }
              ]
            }
          ]
        }
      ]
    }`

4.  站点配置接口

    URI: `/system/config`

    Method: `get`

    Params: `null`

    Renponse: `{
      "code":0,
      "payload":{
        "navBarNotice":"远程配置的导航顶部提示信息",
        "logo":"https://cdn.jsdelivr.net/gh/daodao97/FigureBed/uPic/hyperf-admin.png"
      }
    }`

    完整的站点配置可见  章节.

### 业务通用接口

​	我们将业务对象的`CRUD`进行高度抽象, 独立为 `表单` 和 `列表` 两种场景, 针对场景提供通用接口. 下面我们已用户对象为例讲解通用接口的定义. 以下接口中的实体 `{entity}` 表示 `user`

1.  表单页配置接口

    URL: `/{entity}/form_schema`

    Method: `GET`,

    Params: `null`

    Response: `{}`
    
2.  表单保存接口

    URL: `/{entity}`

    Method: `POST`

    Params: `{JSON}` 表单信息

    Renponse: `{
      "code":0,
      "payload":{}
    }`

3.  列表页配置接口

    URL: `/{entity}/list_schema`

    Method: `GET`

    Params: `null`

    Response: `{
      "code":0,
      "payload":{
        "filter":[
          {
            "field":"name",
            "type":"input",
            "label":"姓名"
          },
          {
            "field":"sex",
            "type":"input",
            "label":"姓名"
          }
        ],
        "headers":[
          {
            "field":"name",
            "label":"姓名",
            "info":"表头提示"
          },
          {
            "field":"sex",
            "type":"enum",
            "label":"性别",
            "options":[
              {
                "value":1,
                "label":"男"
              },
              {
                "value":0,
                "label":"女"
              }
            ],
            "state":{
              "0":"warning",
              "1":"info"
            }
          },
          {
            "field":"github",
            "type":"link",
            "label":"主页"
          },
          {
            "field":"html",
            "type":"html",
            "label":"HTML"
          },
          {
            "field":"image",
            "type":"image",
            "label":"头像"
          },
          {
            "field":"json",
            "type":"json",
            "label":"信息"
          },
          {
            "field":"richText",
            "type":"rich-text",
            "label":"信息"
          }
        ],
        "batchButton":[
          {
            "type":"jump",
            "text":"跳转",
            "target":"http://github.com/daodao97"
          },
          {
            "type":"api",
            "text":"请求接口",
            "api":{
              "method":"POST",
              "url":"/test_api"
            }
          },
          {
            "type":"table",
            "text":"表格",
            "table":{
              "infoApi":"/student/list_info",
              "listApi":"/student/list"
            },
            "props":{
              "type":"info"
            }
          },
          [
            {
              "type":"jump",
              "text":"跳转",
              "target":"http://github.com/daodao97"
            },
            {
              "type":"api",
              "text":"请求接口",
              "api":{
                "method":"POST",
                "url":"/test_api"
              }
            }
          ],
          {
            "type":"form",
            "text":"表单",
            "form":{
              "infoApi":"/form",
              "saveApi":"/save"
            },
            "props":{
              "type":"success"
            }
          }
        ],
        "rowButton":[
          {
            "type":"form",
            "form":{
              "infoApi":"/form/{id}",
              "saveApi":"/save"
            },
            "props":{
              "icon":"el-icon-edit",
              "type":"success"
            }
          },
          {
            "type":"api",
            "api":{
              "method":"POST",
              "url":"/student/{id}"
            },
            "props":{
              "icon":"el-icon-delete",
              "type":"danger"
            }
          }
        ],
        "normalButton":[
          {
            "type":"jump",
            "text":"跳转",
            "target":"http://github.com/daodao97"
          },
          {
            "type":"api",
            "text":"请求接口",
            "api":{
              "method":"POST",
              "url":"/test_api"
            }
          },
          {
            "type":"table",
            "text":"表格",
            "table":{
              "infoApi":"/student/list_info",
              "listApi":"/student/list"
            },
            "props":{
              "type":"info"
            }
          },
          [
            {
              "type":"jump",
              "text":"跳转",
              "target":"http://github.com/daodao97"
            },
            {
              "type":"api",
              "text":"请求接口",
              "api":{
                "method":"POST",
                "url":"/test_api"
              }
            }
          ],
          {
            "type":"form",
            "text":"表单",
            "form":{
              "infoApi":"/form",
              "saveApi":"/save"
            },
            "props":{
              "type":"success"
            }
          },
          {
            "type":"jump",
            "target":"/user/form",
            "props":{
              "icon":"el-icon-plus",
              "type":"primary"
            }
          }
        ]
      }
    }`

    4.  列表表格数据接口

        URI: `/{entity}/list?_page=1&_size=20`

        Method: `GET`

        Params: 列表页过滤条件和页码等

        Response: `{
          "code":0,
          "payload":{
            "list":[
              {
                "id":112,
                "name":"朱艳",
                "sex":1,
                "score":32,
                "link":"http://github.com/daodao97",
                "image":"http://qupinapptest.oss-cn-beijing.aliyuncs.com/1/202002/d81d3c9dc7c3df7590d333f783a97995.jpeg",
                "html":"<S>显示删除线1</S>",
                "json":{
                  "slogan":"左手代码右手诗"
                },
                "richText":"在一段文本中<突出|black|yellow>显示某些<文字|#ffffff|#000000>"
              }
            ],
            "page":{
              "count":4,
              "page":2
            }
          }
        }`

    5.  行编辑接口

        URI: `/{entity}/rowchange/{id}`

        Method: `POST`

        Params: 变动信息

        Renponse: `{
          "code":0,
          "payload":{}
        }`

    将对象实体的各种行为合理抽象后, 后端实现遵循以上接口协议即可实现前后端联动, 无所谓后端实现的`语言`或`框架`.

