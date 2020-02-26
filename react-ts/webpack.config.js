const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const buildPath = 'dist'

module.exports = {
  entry: path.resolve(__dirname, 'src/index.tsx'),
  output: {
    path: path.resolve(__dirname, buildPath),
    filename: '[name].[chunkhash].js'
  },
  module: {
    rules: [
      {
        test: /\.(js|ts)x?$/, //jsx 或者 tsx 文件
        exclude: /(node_modules)/, //排除node_modules
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.(c|sc|sa)ss$/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'sass-loader',
            options: {
              implementation: require('dart-sass')
            }
          }
        ]
      },
      {
        test: /\.(png|jpg|gif|woff|svg|ttf)$/,
        use: [
          'file-loader'
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'public/index.html'),
      title: 'ts-react',
      filename: 'index.html'
    })
  ],
  devServer: {
    contentBase: path.resolve(__dirname, buildPath),
    compress: true,
    port: 9000
  }
}