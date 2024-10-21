const express = require('express');
const mysql = require('mysql2');
const route = express.Router();

route.get('/', (req, res, next) => {
    res.render('index', { title: 'Dashboard' });
})
route.get('/units', (req, res, next) => {
    res.render('admin/unit', { title: 'Dashboard' });
})
route.get('/ingredients', (req, res, next) => {
    res.render('admin/ingredients', { title: 'Dashboard' });
})
route.get('/nutrients', (req, res, next) => {
    res.render('admin/nutrients', { title: 'Dashboard' });
})
route.get('/preference', (req, res, next) => {
    res.render('admin/preference', { title: 'Dashboard' });
})
route.get('/sub_plan', (req, res, next) => {
    res.render('admin/plan', { title: 'Dashboard' });
})
route.get('/dishes', (req, res, next) => {
    res.render('admin/dish', { title: 'Dashboard' });
})
route.get('/order', (req, res, next) => {
    res.render('admin/orders', { title: 'Dashboard' });
})
route.get('/weekly_menu', (req, res, next) => {
    res.render('admin/weekly_menu', { title: 'Weekly' });
})
route.get('/purchasing', (req, res, next) => {
    res.render('admin/purchasing', { title: 'Purchasing' });
})
route.get('/all_customer', (req, res, next) => {
    res.render('admin/customer', { title: 'Customer' });
})
route.get('/users', (req, res, next) => {
    res.render('admin/users', { title: 'Dashboard' });
})
route.get('/promo_code', (req, res, next) => {
    res.render('admin/promo_codes', { title: 'Promo Code' });
});
route.get('/auth-login', (req, res, next) => {
    res.render('auth/auth-login', { title: 'Login In', layout: false })
});
module.exports = route;