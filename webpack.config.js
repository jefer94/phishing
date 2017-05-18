var poststylus = require('poststylus')

module.exports = {
  // JavaScript entry point
  entry: './app.js',

  // JavaScrip bundle file
  output: {
    path: __dirname + '/..',
    filename: 'bundle.js'
  },
  context: __dirname,
  resolve: {
    extensions: ['.js', '.jsx', '.json', '*']
  },
  // Setup server
  devServer: {
    inline: true,
    port: 3000
  },
  module: {
    // JS, JSX and SASS loaders
    loaders: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'react']
        }
      },
      {
        test: /\.html$/,
        loader: 'html',
        exclude: /node_modules/
      },
     {
       test: /\.css$/,
       loader: 'style!css!postcss',
       exclude: /node_modules/ },
     {
       test: /\.styl$/,
       loader: 'style!css!stylus',
       exclude: /node_modules/
     }
    ]
  }
};
