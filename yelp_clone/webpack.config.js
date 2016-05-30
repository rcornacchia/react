const NODE_ENV  = process.env.NODE_ENV;
const isDev     = NODE_ENV === 'development';

const webpack   = require('webpack');
const getConfig = require('hjs-webpack');
const fs        = require('fs');
const path      = require('path'),
      join      = path.join,
      resolve   = path.resolve;

const root      = resolve(__dirname);
const src       = join(root, 'src');
const modules   = join(root, 'node_modules');
const dest      = join(root, 'dist');
const cssModulesNames = `${isDev ? '[path][name]__[local]__' : ''}[hash:base64:5]`;

var config = getConfig({
    isDev: isDev,
    in: join(src, 'app.js'),
    out: dest,
    clearBeforeBuild: true
});

const matchCssLoaders = /(^|!)(css-loader)($|!)/;

const findLoader = (loaders, match) => {
    const found = loaders.filter(l => l &&
        l.loader && l.loader.match(match));
    return found ? found[0] : null;
}
// existing css loader
const cssloader =
    findLoader(config.module.loaders, matchCssLoaders);

config.postcss = [].concat({
    require('precss')({}),
    require('autoprefixer')({}),
    require('cssnano')({})
});

module.exports = config;
