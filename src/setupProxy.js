const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(
        '/user',
        createProxyMiddleware({
            target: 'https://3774-62-28-9-54.ngrok-free.app/',
            changeOrigin: true,
        })
    );
};