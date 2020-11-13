function response(payload) {
  return {
    "code|0-0": 0,
    payload
  };
}

export const simpleTable = {
  filter: [
    {
      field: "name",
      type: "input",
      label: "姓名"
    },
    {
      field: "sex",
      type: "input",
      label: "姓名"
    }
  ],
  headers: [
    {
      field: "name",
      label: "姓名",
      info: "表头提示"
    },
    {
      field: "sex",
      type: "enum",
      label: "性别",
      options: [
        { value: 1, label: "男" },
        { value: 0, label: "女" }
      ],
      state: {
        1: "info",
        0: "warning"
      }
    },
    {
      field: "github",
      type: "link",
      label: "主页"
    },
    {
      field: "html",
      type: "html",
      label: "HTML"
    },
    {
      field: "image",
      type: "image",
      label: "头像"
    },
    {
      field: "json",
      type: "json",
      label: "信息"
    },
    {
      field: "richText",
      type: "rich-text",
      label: "信息"
    }
  ],
  batchButton: [
    {
      type: "jump",
      text: "跳转",
      target: "http://github.com/daodao97"
    },
    {
      type: "api",
      text: "请求接口",
      api: {
        method: "POST",
        url: "/test_api"
      }
    },
    {
      type: "form",
      text: "表单",
      form: {
        infoApi: "/form",
        saveApi: "/save"
      },
      btnProps: {
        type: "success"
      }
    },
    {
      type: "table",
      text: "表格",
      table: {
        infoApi: "/form",
        listApi: "/save"
      },
      btnProps: {
        type: "info"
      }
    }
  ]
};

export default [
  {
    url: "/form",
    type: "get",
    response: response([
      {
        type: "input",
        field: "number",
        label: "数字"
      },
      {
        type: "number-range",
        field: "range_number",
        label: "数字区间"
      }
    ])
  },
  {
    url: new RegExp(process.env.VUE_APP_BASE_API + "/form/.*"),
    type: "get",
    response: response([
      {
        type: "input",
        field: "name",
        label: "名字",
        value: "@cname"
      },
      {
        type: "number",
        field: "score",
        label: "分数",
        value: "@natural(60, 100)"
      }
    ])
  },
  {
    url: "/save",
    type: "post",
    response: response({
      success: true
    })
  },
  {
    url: "/student/list_info",
    type: "get",
    response: response(simpleTable)
  },
  {
    url: "/student/list",
    type: "get",
    response: req => {
      const ret = {
        "list|0-20": [
          {
            "id|0-1000": 1,
            name: "@cname",
            "sex|0-1": 1,
            "score|0-100": 60,
            link: "http://github.com/daodao97",
            image:
              "http://qupinapptest.oss-cn-beijing.aliyuncs.com/1/202002/d81d3c9dc7c3df7590d333f783a97995.jpeg",
            html: "<S>显示删除线1</S>",
            json: { slogan: "左手代码右手诗" },
            richText:
              "在一段文本中<突出|black|yellow>显示某些<文字|#ffffff|#000000>"
          }
        ],
        page: {
          "count|1-10": 2,
          "page|1-5": 2
        }
      };
      // if (req.query.sex !== undefined) {
      //   delete ret["list|1-20"][0]["sex|0-1"];
      //   ret["list|1-20"][0].sex = req.query.sex;
      // }
      return response(ret);
    }
  },
  {
    type: "post",
    url: "/test_api",
    response: {
      code: 0,
      payload: {}
    }
  },
  {
    type: "get",
    url: "/system/config",
    response: {
      code: 0,
      payload: {
        navBarNotice: "远程配置的导航顶部提示信息",
        logo:
          "https://cdn.jsdelivr.net/gh/daodao97/FigureBed/uPic/hyperf-admin.png"
      }
    }
  }
];
