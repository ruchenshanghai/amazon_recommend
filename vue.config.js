module.exports = {
  configureWebpack: {
    resolve: {
      extensions: ['.js', '.vue', '.json', '.ts']
    }
  },
  baseUrl: process.env.NODE_ENV === 'production' ? '/amazon' : '/'
}