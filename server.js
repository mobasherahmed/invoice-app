const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
const port = 3000;
const { v4: uuidv4 } = require('uuid');

app.use(bodyParser.json(),cors());


// Define the path to your JSON file
const dataFilePath = './src/assets/data/invoices.json';
const usersFilePath = './src/assets/data/users.json';

// Initialize the data file if it doesn't exist
if (!fs.existsSync(dataFilePath)) {
 fs.writeFileSync(dataFilePath, JSON.stringify([]));
}

// Read the data file
const readDataFile = () => {
 return JSON.parse(fs.readFileSync(dataFilePath, 'utf8'));
};

// Read the data file
const readUserDataFile = () => {
 return JSON.parse(fs.readFileSync(usersFilePath, 'utf8'));
};

// Write the data file
const writeDataFile = (data) => {
 fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));
};

// POST login api
app.post('/api/login', (req, res) => {
    const { username, password } = req.body;
    const users = readUserDataFile();
    const user = users.find(u => u.username === username);
    if (!user) {
        return res.status(401).json({ message: 'Invalid username or password' });
    }
    if (user.password!== password) {
        return res.status(401).json({ message: 'Invalid username or password' });
    }

    const token = jwt.sign({ id: user.id }, 'your-hardcoded-secret-key', { expiresIn: 86400 }); // Expires in 24 hours.

    // Return user details if login successful
    res.status(200).json({ user: { username: user.username, name: user.name, id: user.id , email: user.email, role: user.role , token: token } });
});

// GET all items
app.get('/api/invoices', (req, res) => {
    const status = req.query.status;
    const items = readDataFile();
    if (status) {
        const filteredItems = items.filter(item => item.status.toLocaleLowerCase() === status.toLocaleLowerCase());
        if (filteredItems.length > 0) {
            res.json(filteredItems);
        } else {
            res.status(404).send('No items found with the provided status.');
        }
    } else {
        // If no status is provided, send all items as JSON
        res.json(items);
    }
});

// GET an item by ID
app.get('/api/invoices/:id', (req, res) => {
    const items = readDataFile();
    const itemId = req.params.id;
    const item = items.find(item => item._id === itemId);
    if (item) {
       res.json(item);
    } else {
       res.status(404).send('Item not found');
    }
});

// POST a new item
app.post('/api/invoices', (req, res) => {
 const items = readDataFile();
 const newItem = req.body;
 newItem._id = uuidv4();
 items.push(newItem);
 writeDataFile(items);
 res.status(201).json(newItem);
});

// PUT (update) an item
app.put('/api/invoices/:id', (req, res) => {
 const items = readDataFile();
 const updatedItem = req.body;
 const index = items.findIndex(item => item._id === req.params.id);
 if (index !== -1) {
    updatedItem._id = req.params.id;
    items[index] = updatedItem;
    writeDataFile(items);
    res.json(updatedItem);
 } else {
    res.status(404).send('Item not found');
 }
});

// DELETE an item
app.delete('/api/invoices/:id', (req, res) => {
 const items = readDataFile();
 const index = items.findIndex(item => item._id === req.params.id);
 if (index !== -1) {
    items.splice(index, 1);
    writeDataFile(items);
    res.status(204).send();
 } else {
    res.status(404).send('Item not found');
 }
});

app.listen(port, () => {
 console.log(`Server running at http://localhost:${port}`);
});
