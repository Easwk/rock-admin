import mock from './mock'
import user from './api/user'
import apis from './api/apis'

const defaultMocksApi = [...user, ...apis]

export function mockXHR(mockApis = []) {
  (defaultMocksApi.concat(mockApis)).forEach(item => {
    mock(item.url, item.type, item.response)
  })
}
