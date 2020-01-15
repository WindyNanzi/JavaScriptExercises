const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")

module.exports = {
  mode: 'development',
  entry: path.resolve(__dirname, '../src/main.js'), //入口
  output: { //出口
    filename: '[name].[hash:8].js', //文件名
    path: path.resolve(__dirname, '../dist') 
  },
  plugins: [
    // 将打包好的js添加进入打包好的index.html中
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../public/index.html')
    }), 
    // 清除上次打包的文件
    new CleanWebpackPlugin(),
    // 拆分css
    new MiniCssExtractPlugin({
      filename: '[name].[hash].css',
      chunkFilename: '[id].css'
    }),
  ],
  modules: {
    rules:[
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        },
        exclude: /node_modules/
      },
      {
        test:/\.css$/,
        use:['style-loader', 'css-loader', 'postcss-loader'] //css文件解析，从右向左解析，postcss-loader是为了给css加浏览器前缀
      },
      {
        test:/\.less$/,
        use:['style-loader', 'css-loader', 'postcss-loader','less-loader'] //less文件解析
      },
      {
        test: /\.(jpe?g|png|gif)$/i, //图片文件
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10240,
              fallback: {
                loader: 'file-loader',
                options: {
                    name: 'img/[name].[hash:8].[ext]'
                }
              }
            }
          }
        ]
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/, //媒体文件
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10240,
              fallback: {
                loader: 'file-loader',
                options: {
                  name: 'media/[name].[hash:8].[ext]'
                }
              }
            }
          }
        ]
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/i, // 字体
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10240,
              fallback: {
                loader: 'file-loader',
                options: {
                  name: 'fonts/[name].[hash:8].[ext]'
                }
              }
            }
          }
        ]
      }
    ]
  }
}

