const express = require('express');
const mysql = require('mysql2');
const app = express();
app.use(express.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'factor75',
});
// Get all customers
app.get('/customer', (req, res) => {
    db.query('SELECT * FROM customers', (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

// Get customer by ID
app.get('/customer/:id', (req, res) => {
    const { id } = req.params;
    db.query('SELECT * FROM customers WHERE id = ?', [id], (err, results) => {
        if (err) throw err;
        res.json(results[0]);
    });
});

// Create a new customer
app.post('/customer', (req, res) => {
    const { user_id, first_name, last_name, address, address2, city, state, zipcode, phone_number, payment_method, card_verified, prefs } = req.body;
    const pref = JSON.parse(prefs);

    db.query('INSERT INTO `customers`(`user_id`,`first_name`,`last_name`,`address`,`address2`,`city`,`state`,`zipcode`,`phone_number`,`payment_method`,`card_verified`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', 
    [user_id, first_name, last_name, address, address2, city, state, zipcode, phone_number, payment_method, card_verified], (err, result) => {
        if (err) {
            return res.json({ message: err, status: 500 });
        }
        
        // Insert preferences into customer_prefs table
        for (let i = 0; i < pref.length; i++) {
            db.query('INSERT INTO `factor75`.`customer_prefs` (`customer_id`,`prefs`) VALUES (?, ?)', [result.insertId, pref[i]], (err2) => {
                if (err2) {
                    return res.json({ message: err2, status: 500 });
                }
            });
        }
        res.json({ message: 'Customer added successfully', id: result.insertId, status: 200 });
    });
});

// Update a customer
app.put('/customer/:id', (req, res) => {
    const { id } = req.params;
    const { first_name, last_name, address, address2, city, state, zipcode, phone_number, payment_method, card_verified } = req.body;

    db.query('UPDATE `factor75`.`customers` SET first_name = ?, last_name = ?, address = ?, address2 = ?, city = ?, state = ?, zipcode = ?, phone_number = ?, payment_method = ?, card_verified = ? WHERE id = ?', 
    [first_name, last_name, address, address2, city, state, zipcode, phone_number, payment_method, card_verified, id], (err) => {
        if (err) {
            return res.json({ message: err, status: 500 });
        }
        res.json({ message: 'Customer updated successfully', status: 200 });
    });
});

// Delete a customer
app.delete('/customer/:id', (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM customers WHERE id = ?', [id], (err) => {
        if (err) throw err;
        res.json({ message: 'Customer deleted successfully', status: 200 });
    });
});

// Start the service
app.listen(3009, () => {
    console.log('Customer service running on port 3005');
});
