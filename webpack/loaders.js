const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const babelLoaderRule = {
  test: /.js$/,
  exclude: path.resolve(__dirname, '../node_modules'),
  use: {
    loader: 'babel-loader',
    options: {
      presets: [
        ['@babel/preset-env', { useBuiltIns: 'usage' }],
        ['@babel/preset-react'],
      ],
      plugins: ['angularjs-annotate'],
    },
  },
};

const imageLoaderRule = {
  test: /\.(png|svg|jpg|gif|ico)$/,
  loader: 'file-loader',
  options: {
    name: '[name].[ext]',
    outputPath: 'assets/images/',
  },
};

const fontLoaderRule = {
  test: /\.(woff|woff2|eot|ttf|otf)$/,
  loader: 'file-loader',
  options: {
    name: '[name].[ext]',
    outputPath: 'assets/fonts/',
  },
};

const scssLoaderRuleForMode = mode => {
  const dev = mode === `development`;

  return {
    test: /\.scss$/,
    exclude: /\.module\.scss$/,
    use: [
      { loader: dev ? 'style-loader' : MiniCssExtractPlugin.loader },
      { loader: 'css-loader', options: { sourceMap: dev } },
      { loader: 'sass-loader', options: { sourceMap: dev } },
    ],
  };
};

const cssLoaderRuleForMode = mode => {
  const dev = mode === `development`;

  return {
    test: /\.css$/,
    exclude: /\.module\.css$/,
    use: [
      { loader: dev ? 'style-loader' : MiniCssExtractPlugin.loader },
      { loader: 'css-loader', options: { sourceMap: dev } },
    ],
  };
};

// const cssModuleLoaderRuleForMode = mode => {
//   const dev = mode === 'development';

//   return {
//     test: /\.module\.scss$/,
//     use: [
//       { loader: dev ? 'style-loader' : MiniCssExtractPlugin.loader },
//       {
//         loader: 'css-loader',
//         options: {
//           importLoaders: 1,
//           modules: true,
//           localIdentName: '[local]__[hash:base64:5]',
//           sourceMap: dev,
//         },
//       },
//     ],
//   };
// };

const cssModuleLoaderRuleForMode = mode => {
  const dev = mode === `development`;

  return {
    test: /\.module\.scss$/,
    use: [
      { loader: dev ? 'style-loader' : MiniCssExtractPlugin.loader },
      {
        loader: 'css-loader',
        options: {
          importLoaders: 1,
          modules: true,
          localIdentName: '[local]___[hash:base64:5]',
          sourceMap: dev,
        },
      },
      { loader: 'sass-loader', options: { sourceMap: dev } },
    ],
  };
};

// const scssModuleLoaderRuleForMode = mode => {
//   const dev = mode === 'development';

//   return {
//     test: /\.module\.scss$/,
//     use: [
//       { loader: dev ? 'style-loader' : MiniCssExtractPlugin.loader },
//       {
//         loader: 'css-loader',
//         options: {
//           importLoaders: 1,
//           modules: true,
//           localIdentName: '[local]__[hash:base64:5]',
//           sourceMap: dev,
//         },
//       },
//       { loader: 'postcss-loader', options: { sourceMap: dev } },
//       { loader: 'sass-loader', options: { sourceMap: dev } },
//     ],
//   };
// };

const templateLoaderRule = {
  test: /\.html$/,
  exclude: [path.resolve(__dirname, '../src/index.html')],
  use: [
    {
      loader: 'ngtemplate-loader',
      options: {
        module: 'templates',
        relativeTo: '/assets/templates/',
        requireAngular: true,
      },
    },
    {
      loader: 'html-loader',
      options: {
        attrs: ['img:data-src'],
        minimize: true,
      },
    },
  ],
};

module.exports = {
  babelLoaderRule,
  imageLoaderRule,
  fontLoaderRule,
  scssLoaderRuleForMode,
  cssLoaderRuleForMode,
  cssModuleLoaderRuleForMode,
  templateLoaderRule,
};
