import mock from './mock'

let defaultMocksApi = []

const requireAll = context => context.keys().map(context)

const allApi = require.context('./api', false, /\.js$/)

requireAll(allApi).forEach((item) => {
  defaultMocksApi = defaultMocksApi.concat(item.default)
})

export function mockXHR(mockApis = []) {
  (defaultMocksApi.concat(mockApis)).forEach(item => {
    mock(item.url, item.type, item.response)
  })
}
