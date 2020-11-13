const { run } = require('runjs')
const chalk = require('chalk')
const config = require('../vue.config.js')
const rawArgv = process.argv.slice(2)
const args = rawArgv.join(' ')

run(`vue-cli-service build ${args}`)

const port = 9526
const publicPath = config.publicPath

const connect = require('connect')
const serveStatic = require('serve-static')
const app = connect()
const open = require('open')

app.use(
  publicPath,
  serveStatic('./dist', {
    index: ['index.html']
  })
)

app.listen(port, function () {
  console.log(chalk.green(`> Preview at  http://localhost:${port}${publicPath}`))
  const reportUrl = `http://localhost:${port}${publicPath}report.html`
  console.log(chalk.green(`> Report at ${reportUrl}`))
  open(reportUrl)
})
