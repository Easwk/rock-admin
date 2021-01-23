import './init'
import create from './admin'
import VForm from './components/form'
import VTable from './components/table'
import VButton from './components/button/VButton'
import VButtonGroup from './components/button/VButtonGroup'
import VJson from './components/form/VJson'
import VIcon from './components/VIcon'
import SocketList from './components/normal/SocketList'
import JsonView from './components/JsonView/index'
import request from './utils/request'
import Layout from './layout/index'
import CodeMirror from './components/CodeMirror/index'

export const createAdmin = create

export const components = {
  VForm,
  VTable,
  VJson,
  VButton,
  VButtonGroup,
  VIcon,
  SocketList,
  JsonView,
  Layout,
  CodeMirror
}

const install = (app, options) => {
  app.config.globalProperties.$http = request
  for (const key in components) {
    const component = components[key]
    app.component(component.name, component)
  }
}

export default {
  install
}

