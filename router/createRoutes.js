import Layout from "../views/layout";
import Form from "../views/scaffold/form";
import Container from "../views/scaffold/container";
import Table from "../views/scaffold/table";

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
    return Form;
  }
  if (pathType === "list") {
    return Table;
  }
  return Container;
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

const transRoute = item => {
  return {
    path: getPath(item),
    name: item.name,
    component: getComponent(item),
    meta: { title: item.name, icon: item.icon },
    hidden: item.is_show !== undefined ? !item.is_show : false,
  }
}

const createRoutes = routesConfig => {
  routesConfig = routesConfig.map(item => {
    const route = transRoute(item)
    if (item.children) {
      route.children = item.children.map(each => transRoute(each))
    } else {
      route.children = []
    }
    return route
  })
  base.children = [...base.children, ...routesConfig];
  return base;
};

export default createRoutes;
