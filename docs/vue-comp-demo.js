var index = 0
function uniqueid() {
  index++
  return index
}

window.GlobalCompsOptions = {}

function type(target) {
  const ret = typeof target
  const template = {
    '[object Array]': 'array',
    '[object Object]': 'object',
    '[object Number]': 'number - object',
    '[object Boolean]': 'boolean - object',
    '[object String]': 'string-object'
  }

  if (target === null) {
    return 'null'
  } else if (ret === 'object') {
    const str = Object.prototype.toString.call(target)
    return template[str]
  } else {
    return ret
  }
}

function addNewStyle(newStyle) {
  var styleElement = document.getElementById('styles_js')

  if (!styleElement) {
    styleElement = document.createElement('style')
    styleElement.type = 'text/css'
    styleElement.id = 'styles_js'
    document.getElementsByTagName('head')[0].appendChild(styleElement)
  }

  styleElement.appendChild(document.createTextNode(newStyle))
}

addNewStyle('.vue-comp-box {\n' +
  '    margin-bottom: 20px;' +
  '    border: 1px solid #ebebeb;\n' +
  '    border-radius: 3px;\n' +
  '    transition: .2s;\n' +
  '}\n' +
  '.vue-comp-view {\n' +
  '    padding: 20px;\n' +
  '    height: auto;\n' +
  '}\n' +
  '.vue-comp-desc {' +
  '    padding: 10px;\n' +
  '    background: #f8f8f8;' +
  '}' +
  '\n' +
  '.vue-com-ctrl {\n' +
  '    border-top: 1px solid #eaeefb;\n' +
  '    height: 35px;\n' +
  '    line-height: 30px;\n' +
  '    box-sizing: border-box;\n' +
  '    background-color: #fff;\n' +
  '    border-bottom-left-radius: 4px;\n' +
  '    border-bottom-right-radius: 4px;\n' +
  '    text-align: center;\n' +
  '    margin-top: -1px;\n' +
  '    color: #d3dce6;\n' +
  '    cursor: pointer;\n' +
  '    position: relative;\n' +
  '}\n' +
  '\n' +
  '.vue-com-ctrl:hover {\n' +
  '    color: cornflowerblue;\n' +
  '}\n')

function makeApp(options, comps, template, sourceCode, desc) {
  const _template = decodeURIComponent(template)
  const tpl = `<div class="vue-comp-box">
    <div class="vue-comp-view">
      ${_template}
    </div>
    <transition>
      <div class="vue-comp-code" v-if="showCode">
        <div class="vue-comp-desc" v-if="desc" v-html="decodeDesc"></div>
        <code-view :code="sourceCode"/>
      </div>
    </transition>
    <div class="vue-com-ctrl" @click="showCode = !showCode">{{ showCode ? "隐藏": "显示" }}源码</div>
  </div>`

  options.template = tpl.replace(/\n/g, '')
  options.mixins = [{
    data() { return { sourceCode: sourceCode, showCode: false, desc: desc } },
    computed: {
      decodeDesc() {
        return decodeURIComponent(this.desc)
      }
    }
  }]
  const { createApp } = window.Vue
  const app = createApp(options)
  comps.forEach(comp => {
    if (type(comp) === 'array') {
      app.use(comp[0], comp[1])
    } else {
      app.use(comp)
    }
  })
  app.component('CodeView', {
    name: 'CodeView',
    props: {
      code: {
        type: String,
        default: ''
      }
    },
    computed: {
      showCode() {
        const code = decodeURIComponent(this.$props.code)
        const lang = 'vue'
        return mdCodeToHtml(code, lang)
      }
    },
    template: '<div v-html="showCode"/>'
  })
  return app
}

function mdCodeToHtml(code, lang = 'html') {
  const langOrMarkup = window.Prism.languages[lang] || window.Prism.languages.markup
  const showCode = window.Prism.highlight(
    code.replace(/\n/, ''),
    langOrMarkup,
    lang
  )
  return '<pre v-pre data-lang="' + lang + '"><code class="lang-' + lang + '">' + showCode + '</code></pre>'
}

function makeVue(id, comp, sourceCode) {
  sourceCode = encodeURIComponent(sourceCode.replace(comp.desc, '').replace('<desc></desc>', '').trim())
  const desc = encodeURIComponent(window.marked(comp.desc))
  const html = `<div id="vue-demo-${id}"></div>`
  const template = encodeURIComponent(comp.template.trim())
  const script = `
setTimeout(() => {
    makeApp(${comp.script}, window.GlobalComps, '${template}', '${sourceCode}', '${desc}').mount('#vue-demo-${id}');
}, 200)
`
  console.log(script)
  const ele = document.createElement('script')
  ele.innerHTML = script
  document.body.appendChild(ele)
  return html
}

function parserCom(str) {
  const template = str.match(/<template>\n[\s\S]*\n<\/template>/gm) || []
  const desc = str.match(/<desc>\n[\s\S]*\n<\/desc>/gm) || []
  let script = str.match(/<script>\n[\s\S]*\n<\/script>/gm) || []
  if (template.length === 0 || script.length === 0) {
    return {
      template: '',
      script: {},
      desc: ''
    }
  }

  script = script[0].replace('<script>', '')
    .replace('</script>', '')
    .replace('export default', '')
    // .replace(/"/g, '\\"')
    // .replace(/'/g, '"')
    // .trim()

  // const t = Function('return ' + script)()

  return {
    template: template[0].replace('<template>', '').replace('</template>', ''),
    script: script,
    desc: (desc[0] || '').replace('<desc>', '').replace('</desc>', '')
  }
}

function parserMd(content) {
  const m = content.match(/```vue-demo.*?```/msuig) || []
  console.log(m)
  m.forEach(item => {
    const comp = parserCom(item)
    const compStr = makeVue(uniqueid(), comp, item.replace('```vue-demo', '').replace('```', ''))
    content = content.replace(item, compStr)
  })
  return content
}

window.vueCompDemo = function(comps) {
  window.GlobalComps = comps
  return function(hook, vm) {
    hook.beforeEach(function(content) {
      return parserMd(content, comps)
    })
  }
}
