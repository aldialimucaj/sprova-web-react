const path = require('path');
const {
  addWebpackResolve,
  override,
  fixBabelImports,
} = require('customize-cra');

module.exports = override(
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: 'css',
  }),
  addWebpackResolve({
    alias: {
      api: path.resolve(__dirname, 'src/api/'),
      components: path.resolve(__dirname, 'src/components/'),
      contexts: path.resolve(__dirname, 'src/contexts/'),
      hooks: path.resolve(__dirname, 'src/hooks/'),
      images: path.resolve(__dirname, 'src/images/'),
      layout: path.resolve(__dirname, 'src/layout/'),
      models: path.resolve(__dirname, 'src/models/'),
      pages: path.resolve(__dirname, 'src/pages/'),
      utils: path.resolve(__dirname, 'src/utils/'),
    },
  })
);
