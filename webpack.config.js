const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.tsx',  
  output: {
    path: __dirname + '/dist',
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,  
        exclude: /node_modules/,
        use: 'ts-loader'  
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json']  
  },
  devServer: {
    contentBase: './dist',
    hot: true
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html'  
    })
  ]
};
