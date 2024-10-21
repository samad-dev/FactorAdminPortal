const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();
const PORT = 3000;

// Define the service endpoints
const services = {
    auth: 'http://localhost:3014',   // Auth service
    customer: 'http://localhost:3009',   // Customer service
    week: 'http://localhost:3011',    // Week menu service
    purchase: 'http://localhost:3012', // Purchase service
    promo: 'http://localhost:3013',    // Promo code service
    dish: 'http://localhost:3007',    // Dish service
    dishingredient: 'http://localhost:3006',    // Dish Ingredient service
    ingredient: 'http://localhost:3005',    // Ingredient service
    nutrient: 'http://localhost:3002',    // Nutrient service
    order: 'http://localhost:3010',    // Order service
    plan: 'http://localhost:3001',    // Plan service
    prefs: 'http://localhost:3003',    // Preferences service
    unit: 'http://localhost:3004',    // Unit service
    user: 'http://localhost:3008',    // User service
};

// Proxy setup for each service
app.use('/login', createProxyMiddleware({ target: services.auth, changeOrigin: true }));
app.use('/customer', createProxyMiddleware({ target: services.customer, changeOrigin: true }));
app.use('/week', createProxyMiddleware({ target: services.week, changeOrigin: true }));
app.use('/purchase', createProxyMiddleware({ target: services.purchase, changeOrigin: true }));
app.use('/promo', createProxyMiddleware({ target: services.promo, changeOrigin: true }));
app.use('/dish', createProxyMiddleware({ target: services.dish, changeOrigin: true }));
app.use('/dishingredient', createProxyMiddleware({ target: services.dishingredient, changeOrigin: true }));
app.use('/ingredient', createProxyMiddleware({ target: services.ingredient, changeOrigin: true }));
app.use('/nutrient', createProxyMiddleware({ target: services.nutrient, changeOrigin: true }));
app.use('/order', createProxyMiddleware({ target: services.order, changeOrigin: true }));
app.use('/plan', createProxyMiddleware({ target: services.plan, changeOrigin: true }));
app.use('/prefs', createProxyMiddleware({ target: services.prefs, changeOrigin: true }));
app.use('/unit', createProxyMiddleware({ target: services.unit, changeOrigin: true }));
app.use('/user', createProxyMiddleware({ target: services.user, changeOrigin: true }));

// Start the main service
app.listen(PORT, () => {
    console.log(`Main service running on port ${PORT}`);
});
