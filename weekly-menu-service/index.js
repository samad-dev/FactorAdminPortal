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

// Get all weekly menus for the current month
app.get('/week', (req, res) => {
    db.query('SELECT * FROM weekly_menu WHERE MONTH(dateto) = MONTH(CURRENT_DATE()) ORDER BY datefrom ASC;', (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

// Get dishes by week ID
app.get('/week_month/:id', (req, res) => {
    const { id } = req.params;
    db.query('SELECT d.*, wd.id AS p_id FROM week_dishes wd JOIN dish d ON wd.dish_id = d.id WHERE wd.week_id = ?', [id], (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

// Get a weekly menu by ID
app.get('/week/:id', (req, res) => {
    const { id } = req.params;
    db.query('SELECT wm.*, d.id AS dish_id, d.dish_name FROM factor75.week_dishes wd JOIN dish d ON d.id = wd.dish_id JOIN weekly_menu wm ON wm.id = wd.week_id WHERE wm.id = ?', [id], (err, results) => {
        if (err) throw err;
        res.json(results[0]);
    });
});

// Create a new weekly menu
app.post('/week', (req, res) => {
    const { label, datefrom, dateto, dishes } = req.body;
    const dishArray = JSON.parse(dishes);

    db.query('INSERT INTO `factor75`.`weekly_menu`(`label`, `datefrom`, `dateto`) VALUES (?, ?, ?)', [label, datefrom, dateto], (err, result) => {
        if (err) {
            res.json({ message: err, status: 500 });
            return;
        }

        const weekId = result.insertId;
        const dishInsertPromises = dishArray.map(dishId => {
            return new Promise((resolve, reject) => {
                db.query('INSERT INTO `factor75`.`week_dishes` (`week_id`, `dish_id`) VALUES (?, ?)', [weekId, dishId], (err2) => {
                    if (err2) reject(err2);
                    else resolve();
                });
            });
        });

        Promise.all(dishInsertPromises)
            .then(() => res.json({ message: 'Week Meals successfully created', id: weekId, status: 200 }))
            .catch(err => res.json({ message: err, status: 500 }));
    });
});

// Update a weekly menu
app.put('/week/:id', (req, res) => {
    const { id } = req.params;
    const { label, datefrom, dateto, dishes } = req.body;
    const dishArray = JSON.parse(dishes);

    // Delete existing dishes for the week
    db.query('DELETE FROM week_dishes WHERE week_id = ?', [id], (err) => {
        if (err) {
            res.json({ message: err, status: 500 });
            return;
        }

        const dishInsertPromises = dishArray.map(dishId => {
            return new Promise((resolve, reject) => {
                db.query('INSERT INTO `factor75`.`week_dishes` (`week_id`, `dish_id`) VALUES (?, ?)', [id, dishId], (err2) => {
                    if (err2) reject(err2);
                    else resolve();
                });
            });
        });

        // Update weekly menu details
        Promise.all(dishInsertPromises)
            .then(() => {
                db.query('UPDATE `factor75`.`weekly_menu` SET `label` = ?, `datefrom` = ?, `dateto` = ? WHERE id = ?', [label, datefrom, dateto, id], (err) => {
                    if (err) {
                        res.json({ message: err, status: 500 });
                    } else {
                        res.json({ message: 'Week updated successfully', status: 200 });
                    }
                });
            })
            .catch(err => res.json({ message: err, status: 500 }));
    });
});

// Delete a weekly menu
app.delete('/week/:id', (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM weekly_menu WHERE id = ?', [id], (err) => {
        if (err) {
            res.json({ message: err, status: 500 });
            return;
        }
        res.json({ message: 'Week deleted successfully', status: 200 });
    });
});

app.listen(3011, () => {
    console.log('Weekly Menu service running on port 3011');
});
