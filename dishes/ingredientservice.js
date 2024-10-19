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

// Get all ingredients
app.get('/ingredients', (req, res) => {
    db.query('SELECT i.*, u.unit FROM ingredients i JOIN units u ON u.id = i.unit_id', (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

// Get ingredient by ID
app.get('/ingredients/:id', (req, res) => {
    const { id } = req.params;
    db.query('SELECT * FROM ingredients WHERE id = ?', [id], (err, results) => {
        if (err) throw err;
        res.json(results[0]);
    });
});

// Create a new ingredient
app.post('/ingredients', (req, res) => {
    const { name, unit } = req.body;
    db.query('INSERT INTO ingredients (ingredient, unit_id) VALUES (?, ?)', [name, unit], (err, result) => {
        if (err) {
            res.json({ message: err, status: 500 });
        } else {
            res.json({ message: 'Ingredient added successfully', id: result.insertId, status: 200 });
        }
    });
});

// Update an ingredient
app.put('/ingredients/:id', (req, res) => {
    const { id } = req.params;
    const { name, unit } = req.body;
    db.query('UPDATE ingredients SET unit_id = ?, ingredient = ? WHERE id = ?', [unit, name, id], (err) => {
        if (err) {
            res.json({ message: err, status: 500 });
        } else {
            res.json({ message: 'Ingredient updated successfully', status: 200 });
        }
    });
});

// Delete an ingredient
app.delete('/ingredients/:id', (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM ingredients WHERE id = ?', [id], (err) => {
        if (err) throw err;
        res.json({ message: 'Ingredient deleted successfully', status: 200 });
    });
});

// Start the service
app.listen(3006, () => {
    console.log('Ingredient service running on port 3001');
});
