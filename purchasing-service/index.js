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

// Get all purchases
app.get('/purchase', (req, res) => {
    db.query('SELECT * FROM purchasing', (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

// Get a purchase by ID
app.get('/purchase/:id', (req, res) => {
    const { id } = req.params;
    db.query('SELECT * FROM purchasing WHERE id = ?', [id], (err, results) => {
        if (err) throw err;
        res.json(results[0]);
    });
});

// Create a new purchase
app.post('/purchase', (req, res) => {
    const { ingredient_id, purchased_on, rate, qty, total } = req.body;
    db.query('INSERT INTO `factor75`.`purchasing` (`ing_id`, `pur_on`, `rate`, `qty`, `total`) VALUES (?, ?, ?, ?, ?)', 
    [ingredient_id, purchased_on, rate, qty, total], 
    (err, result) => {
        if (err) {
            res.json({ message: err, status: 500 });
        } else {
            res.json({ message: 'Purchase added successfully', id: result.insertId, status: 200 });
        }
    });
});

// Update a purchase by ID
app.put('/purchase/:id', (req, res) => {
    const { id } = req.params;
    const { ingredient_id, purchased_on, rate, qty, total } = req.body;

    db.query('UPDATE `factor75`.`purchasing` SET `ing_id` = ?, `pur_on` = ?, `rate` = ?, `qty` = ?, `total` = ? WHERE `id` = ?', 
    [ingredient_id, purchased_on, rate, qty, total, id], 
    (err) => {
        if (err) {
            res.json({ message: err, status: 500 });
        } else {
            res.json({ message: 'Purchase updated successfully', status: 200 });
        }
    });
});

// Delete a purchase by ID
app.delete('/purchase/:id', (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM purchasing WHERE id = ?', [id], (err) => {
        if (err) throw err;
        res.json({ message: 'Purchase deleted successfully', status: 200 });
    });
});

app.listen(3012, () => {
    console.log('Purchasing service running on port 3012');
});
