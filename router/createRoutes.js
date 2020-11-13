import Layout from "../views/layout/index";
// import Form from "../views/scaffold/form";
// import Container from "@/core/views/scaffold/container";
// import Table from "@/core/views/scaffold/table";
import { listToTree } from "../utils";

const base = {
  path: "/",
  component: Layout,
  children: []
};

const getComponent = item => {
  if (item.path === "#") {
    return Container;
  }
  const tokens = item.path.split("/");
  const pathType = tokens[tokens.length - 1];
  if (pathType === ":id" || pathType === "form") {
    // return Form;
    return Layout;
  }
  if (pathType === "list") {
    // return Table;
    return Layout;
  }
  return item.type === 0 ? Layout : Layout;
};

function getPath(item) {
  let path = item.path;
  // :id 默认转换为数字型匹配模式
  if (path.indexOf(":id") > -1 && path.indexOf(":id") + 3 === path.length) {
    path = path.replace(":id", ":id(\\d+)");
  }
  return path === "#"
    ? "/DIR_" + item.title + "_" + item.id + "_key"
    : path[0] !== "/"
    ? "/" + path
    : path;
}

const createRoutes = routesConfig => {
  routesConfig = routesConfig.map(function(item) {
    return {
      id: item.id,
      pid: item.pid,
      path: getPath(item),
      name: item.title,
      component: getComponent(item),
      meta: { title: item.title, icon: item.icon },
      hidden: !item.is_show
    };
  });
  let tree = listToTree(routesConfig);
  tree = fixDeep(tree);
  base.children = [...base.children, ...tree];
  return base;
};

function fixDeep(tree) {
  return tree.map(function(item) {
    if (!item.children) {
      item.children = [];
    }
    if (item.children.length > 0 && item.path.indexOf("/DIR_") !== 0) {
      const tmp = Object.assign({}, item, { hidden: true });
      delete tmp.children;
      item.children.push(tmp);
      item.redirect = item.path;
      // item.component = Container;
      item.component = Layout;
      item.path = "/" + item.path.split("/")[1] + "_page";
      return item;
    }
    item.children = fixDeep(item.children);
    return item;
  });
}

export default createRoutes;
