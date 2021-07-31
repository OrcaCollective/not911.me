const withTM = require('next-transpile-modules')(['unified', 'bail', 'is-plain-obj', 'trough', 'to-vfile']);

module.exports = withTM({
    reactStrictMode: true,
    target: 'serverless',
});
