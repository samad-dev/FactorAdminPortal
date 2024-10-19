const express = require('express');
const mysql = require('mysql');
const app = express();

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'factor75',
});

app.use(express.json());

// Get all promo codes
app.get('/promo', (req, res) => {
    db.query('SELECT * FROM promo_codes', (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

// Get a promo code by ID
app.get('/promo/:id', (req, res) => {
    const { id } = req.params;
    db.query('SELECT * FROM promo_codes WHERE id = ?', [id], (err, results) => {
        if (err) throw err;
        res.json(results[0]);
    });
});

// Create a new promo code
app.post('/promo', (req, res) => {
    const { promo_name, discount_per, valid_till } = req.body;
    db.query('INSERT INTO `factor75`.`promo_codes` (`promo_name`, `discount_per`, `valid_till`) VALUES (?, ?, ?)', 
    [promo_name, discount_per, valid_till], 
    (err, result) => {
        if (err) {
            res.json({ message: err, status: 500 });
        } else {
            res.json({ message: 'Promo code created successfully', id: result.insertId, status: 200 });
        }
    });
});

// Update a promo code by ID
app.put('/promo/:id', (req, res) => {
    const { id } = req.params;
    const { promo_name, discount_per, valid_till } = req.body;

    db.query('UPDATE `factor75`.`promo_codes` SET `promo_name` = ?, `discount_per` = ?, `valid_till` = ? WHERE `id` = ?', 
    [promo_name, discount_per, valid_till, id], 
    (err) => {
        if (err) {
            res.json({ message: err, status: 500 });
        } else {
            res.json({ message: 'Promo code updated successfully', status: 200 });
        }
    });
});

// Delete a promo code by ID
app.delete('/promo/:id', (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM promo_codes WHERE id = ?', [id], (err) => {
        if (err) throw err;
        res.json({ message: 'Promo code deleted successfully', status: 200 });
    });
});

app.listen(3013, () => {
    console.log('Promo service running on port 3013');
});
