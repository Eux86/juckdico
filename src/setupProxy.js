const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(
        '/user',
        createProxyMiddleware({
            target: 'https://f69d-62-28-9-54.ngrok-free.app/',
            changeOrigin: true,
        })
    );
};