const tokens = {
  admin: {
    token: "admin-token"
  },
  editor: {
    token: "editor-token"
  }
};

const users = {
  "admin-token": {
    roles: ["admin"],
    introduction: "I am a super administrator",
    avatar:
      "https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif",
    name: "Super Admin"
  },
  "editor-token": {
    roles: ["editor"],
    introduction: "I am an editor",
    avatar:
      "https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif",
    name: "Normal Editor"
  }
};

export default [
  // user login
  {
    url: "/user/login",
    type: "post",
    response: config => {
      const { username, ticket } = config.body;
      if (ticket) {
        return {
          code: 0,
          payload: tokens["admin"]
        };
      }
      const token = tokens[username];

      // mock error
      if (!token) {
        return {
          code: 60204,
          message: "Account and password are incorrect."
        };
      }

      return {
        code: 0,
        payload: token
      };
    }
  },

  // get user info
  {
    url: "/user/info.*",
    type: "get",
    response: config => {
      const { token } = config.query;
      const info = users[token];

      // mock error
      if (!info) {
        return {
          code: 50008,
          message: "Login failed, unable to get user details."
        };
      }

      return {
        code: 0,
        payload: info
      };
    }
  },

  // user logout
  {
    url: "/user/logout",
    type: "post",
    response: () => {
      return {
        code: 0,
        payload: "success"
      };
    }
  },

  {
    url: "/user/routes",
    type: "get",
    response: () => {
      return {
        code: 0,
        payload: [
          {
            name: "表单",
            path: "/form",
            type: 0
          },
          {
            name: "列表",
            path: "/list",
            type: 0,
            children: [
              {
                path: "example",
                name: "基础样例",
                type: 0
              },
              {
                path: "tab",
                name: "页签样例",
                type: 0
              }
            ]
          }
        ]
      };
    }
  }
];
