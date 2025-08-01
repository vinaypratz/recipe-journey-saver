require('dotenv').config({ path: 'database.env' });
const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
app.use(cors());
app.use(express.json());

// Set up PostgreSQL connection pool using environment variables
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT || 5432,
  ssl: {rejectUnauthorized: false
}});

// Test function to check DB connection on server start
async function testDbConnection() {
    try {
      const result = await pool.query('SELECT * FROM person LIMIT 1;');
      console.log('Database connection successful. Sample data:', result.rows);
    } catch (err) {
      console.error('Database connection error:', err);
    }
  }
  
  // Call test function
  testDbConnection();
  

// Simple route to test backend
app.get('/', (req, res) => {
  res.send('Backend server is running');
});

// Start the server
const PORT = process.env.PORT || 4000;
app.listen(PORT, '0.0.0.0',  () => {
  console.log(`Server listening on port ${PORT}`);
});


const bcrypt = require('bcryptjs');

app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: 'Please provide username and password' });
  }

  try {
    // Query person by username
    const result = await pool.query('SELECT * FROM person WHERE username = $1', [username]);

    if (result.rows.length === 0) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    const user = result.rows[0];

    // Compare password with hashed password in DB
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    // Success - login is valid
    return res.json({ message: 'Login successful', userId: user.person_id, username: user.username });

  } catch (error) {
    console.error('Error during login:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});
