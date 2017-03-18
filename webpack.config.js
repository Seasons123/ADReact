var webpack = require('webpack');
var path = require('path');

var isProduction = function () {
  return process.env.NODE_ENV === 'production';
};

var entry = './index.js';   /*进入路径*/
var outputPath = './build'; /*输出路径*/

var plugins = [];
if( isProduction() ) {
  plugins.push(              /*加载插件*/
    new webpack.optimize.UglifyJsPlugin({
      test: /(\.jsx|\.js)$/,
      compress: {
        warnings: false
      },
    })
  );
}

var config = {
  target: 'web',
  cache: true,
  entry: entry,
  output: {
    path: path.join(__dirname, outputPath),
    filename: 'js/index.bundle.js',
    publicPath: isProduction()? 'http://localhost:3000/':'http://localhost:3000/',
  },
  module: {
    loaders: [   /*这里面用来放置用来匹配的文件名*/
      {
        test: /(\.jsx|\.js)$/,    /*在js中写正则表达式需要用两个横线包裹起来
                                   上句正则表达式的意思是以 .js结尾的文件。。
                                   前面有个反斜线是因为需要转义这个点，不转义的话这个点再正则表达式中是有特殊含义的。
                                   这样就可以匹配所有的以 .js结尾的所有的文件*/
        loader: 'babel?presets[]=es2015&presets[]=react',/*匹配完了之后就加一个loader
                                                           一旦webpack找到了js文件，他就会是有loader来进行处理*/
        exclude: /node_modules/
      },
        { test: /\.css$/, loader: "style!css" },
      {
        test: /\.json$/,
        loader: 'json',
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/,
        loader: 'url?limit=8024&name=images/[name].[ext]'
      },
      {
        test: /\.(woff2?|otf|eot|svg|ttf)$/i,
        loader: 'url?name=fonts/[name].[ext]'
      },
      {
        test: /\.html$/,
        loader: 'url?name=[name].[ext]'
      },
    ],
  },
  plugins: plugins,      /*加载插件*/
  resolve: {
    root: __dirname,
    extensions: ['', '.js', '.jsx']
  },
  devtool: isProduction()?null:'source-map',
};

module.exports = config;
