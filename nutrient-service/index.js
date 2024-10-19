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

// Get all nutrients
app.get('/nutrient', (req, res) => {
    db.query('SELECT * FROM nutrients', (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

// Get nutrient by ID
app.get('/nutrient/:id', (req, res) => {
    const { id } = req.params;
    db.query('SELECT * FROM nutrients WHERE id = ?', [id], (err, results) => {
        if (err) throw err;
        res.json(results[0]);
    });
});

// Create a new nutrient
app.post('/nutrient', (req, res) => {
    const { nutrient, nutrient_unit } = req.body;
    db.query('INSERT INTO nutrients (nutrient, nutrient_unit) VALUES (?,?)', [nutrient, nutrient_unit], (err, result) => {
        if (err) {
            res.json({ message: err, status: 500 });
        } else {
            res.json({ message: 'Nutrient added successfully', id: result.insertId, status: 200 });
        }
    });
});

// Update a nutrient
app.put('/nutrient/:id', (req, res) => {
    const { id } = req.params;
    const { nutrient, nutrient_unit } = req.body;
    db.query('UPDATE nutrients SET nutrient = ?, nutrient_unit = ? WHERE id = ?', [nutrient, nutrient_unit, id], (err) => {
        if (err) throw err;
        res.json({ message: 'Nutrient updated successfully', status: 200 });
    });
});

// Delete a nutrient
app.delete('/nutrient/:id', (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM nutrients WHERE id = ?', [id], (err) => {
        if (err) throw err;
        res.json({ message: 'Nutrient deleted successfully', status: 200 });
    });
});

// Start the service
app.listen(3002, () => {
    console.log('Nutrient service running on port 3002');
});
