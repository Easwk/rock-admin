import Layout from '../layout'
import Form from '../scaffold/form'
import Container from '../scaffold/container'
import Table from '../scaffold/table'

const base = {
  path: '/',
  component: Layout,
  children: []
}

const getComponent = item => {
  if (item.view) {
    return () => {
      return new Promise((resolve) => {
        resolve(require('@/views/' + item.view))
      })
    }
  }
  if (item.path === '#') {
    return Container
  }
  switch (item?.page_type) {
    case 'list':
      return Table
    case 'form':
      return Form
  }
  return Container
}

function getPath(item) {
  let path = item.path
  // :id 默认转换为数字型匹配模式
  if (path.indexOf(':id') > -1 && path.indexOf(':id') + 3 === path.length) {
    path = path.replace(':id', ':id(\\d+)')
  }
  return path === '#'
    ? '/DIR_' + item.name
    : path[0] !== '/'
      ? '/' + path
      : path
}

const transRoute = item => {
  const route = {
    path: getPath(item),
    name: item.path + item.name,
    component: getComponent(item),
    meta: {
      title: item.name,
      icon: item.icon,
      hidden: item.is_show !== undefined ? !item.is_show : false,
      pageSchema: item.page_schema || {}
    },
    hidden: item.is_show !== undefined ? !item.is_show : false,
    children: item.children !== undefined ? item.children.map(each => transRoute(each)) : []
  }
  if (route.children.length > 0) {
    let allChildHidden = true
    route.children.forEach(each => {
      if (!each.hidden) {
        allChildHidden = false
      }
    })
    if (allChildHidden) {
      route.redirect = route.children[0].path
    }
  }

  return route
}

const createRoutes = routesConfig => {
  routesConfig = routesConfig.map(item => {
    return transRoute(item)
  })
  base.children = [...base.children, ...routesConfig]
  return base
}

export default createRoutes
