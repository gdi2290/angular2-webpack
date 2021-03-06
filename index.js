var webpack = require('webpack');
var resolveNgRoute = require('@angularclass/resolve-angular-routes');

exports.loaders = function loaders() {
  return {
    test: /(systemjs_component_resolver|system_js_ng_module_factory_loader)\.js$/,
    loader: 'string-replace-loader',
    query: {
      search: '(lang_1(.*[\\n\\r]\\s*\\.|\\.))?(global(.*[\\n\\r]\\s*\\.|\\.))?(System|SystemJS)(.*[\\n\\r]\\s*\\.|\\.)import',
      replace: 'System.import',
      flags: 'g'
    }
  }
}

exports.plugins = function plugins(rootDir) {
  var plugin = new webpack.ContextReplacementPlugin(
    /angular\/core\/(esm\/src|src)\/linker/,
    rootDir,
    resolveNgRoute(rootDir)
  );
  return plugin;
}
