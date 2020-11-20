import CodeMirror from 'codemirror'
// https://codemirror.net/2/demo/formatting.html
(function() {
  // Applies automatic formatting to the specified range
  CodeMirror.defineExtension('autoFormatRange', function(from, to) {
    var cm = this

    var text = cm.getRange(from, to)
    const tool = require('js-beautify')

    var opts = {
      indent_size: '4', // 缩进1的时候表示tab，其它数字表示多少个空格
      indent_char: ' ', // 缩进字符
      preserve_newlines: false, // 是否替换新行
      insert_newlines: false, // css中是否插入新行
      brace_style: 'collapse',
      indent_scripts: 'normal',
      jslint_happy: true,
      keep_array_indentation: false, // 保留数组格式
      space_after_anon_function: true,
      space_before_conditional: true
    }

    const out = tool.html(text, opts)
    console.log(out)
    // cm.replaceRange(out, form, to)
  })
})()
