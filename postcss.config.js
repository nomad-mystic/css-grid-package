module.exports = ({ options }) => {
  const plugins = [];

  plugins.push(require('autoprefixer'));

  return {
    parser: 'postcss-scss',
    plugins: plugins
  };
};