let Apis = []

const requireAll = context => context.keys().map(context)

const allApi = require.context('./api', false, /\.js$/)

requireAll(allApi).forEach((item) => {
  Apis = Apis.concat(item.default)
})

export default Apis
