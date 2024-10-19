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


// Get all users
app.get('/user', (req, res) => {
    db.query('SELECT * FROM users', (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

// Get user by ID
app.get('/user/:id', (req, res) => {
    const { id } = req.params;
    db.query('SELECT * FROM users WHERE id = ?', [id], (err, results) => {
        if (err) throw err;
        res.json(results[0]);
    });
});

// Create a new user
app.post('/user', (req, res) => {
    const { username, email, password, usertype } = req.body;
    db.query('INSERT INTO `users`(`username`, `email`, `password`, `user_type`) VALUES (?, ?, ?, ?)', 
    [username, email, password, usertype], (err, result) => {
        if (err) {
            res.json({ message: err, status: 500 });
        } else {
            res.json({ message: 'User added successfully', id: result.insertId, status: 200 });
        }
    });
});

// Update a user
app.put('/user/:id', (req, res) => {
    const { id } = req.params;
    const { username, email, password, usertype } = req.body;
    db.query('UPDATE users SET username = ?, email = ?, password = ?, user_type = ? WHERE id = ?', 
    [username, email, password, usertype, id], (err) => {
        if (err) {
            res.json({ message: err, status: 500 });
        } else {
            res.json({ message: 'User updated successfully', status: 200 });
        }
    });
});

// Delete a user
app.delete('/user/:id', (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM users WHERE id = ?', [id], (err) => {
        if (err) throw err;
        res.json({ message: 'User deleted successfully', status: 200 });
    });
});

// Start the service
app.listen(3008, () => {
    console.log('User service running on port 3003');
});
