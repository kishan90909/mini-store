const db = require('../config/db');
const jwt = require('jsonwebtoken');

// 1. LOGIN FUNCTION
exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        // Check if user exists
        const [users] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
        if (users.length === 0) return res.status(400).json({ error: 'User not found' });

        const user = users[0];

        // Check password (plain text for this demo)
        if (password !== user.password) { 
             return res.status(400).json({ error: 'Invalid credentials' });
        }

        // Create Token
        const token = jwt.sign({ id: user.id }, 'SECRET_KEY', { expiresIn: '1h' });

        // Send Response (Now includes Email!)
        res.json({ 
            token, 
            user: { 
                id: user.id, 
                username: user.username, 
                email: user.email 
            } 
        });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// 2. REGISTER FUNCTION (This was likely missing)
exports.register = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        // Create new user
        await db.query('INSERT INTO users (username, email, password) VALUES (?, ?, ?)', 
        [username, email, password]);
        
        res.status(201).json({ message: 'User created successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};