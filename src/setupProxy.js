const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(
        '/user',
        createProxyMiddleware({
            target: '   https://6941-2003-8-1e-1a-00-3bd.ngrok-free.app/',
            changeOrigin: true,
        })
    );
};
