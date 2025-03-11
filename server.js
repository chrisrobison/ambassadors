const express = require('express');
const axios = require('axios');
const cors = require('cors');
const path = require('path');
const dotenv = require('dotenv');
const rateLimit = require('express-rate-limit');

// Load environment variables
dotenv.config();

// Airtable configuration
const AIRTABLE_API_URL = 'https://api.airtable.com/v0';
const AIRTABLE_PERSONAL_ACCESS_TOKEN = process.env.AIRTABLE_PERSONAL_ACCESS_TOKEN;
const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID;

// Server configuration
const PORT = process.env.PORT || 2415;
const app = express();

// Rate limiting to prevent abuse
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again after 15 minutes'
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/api', apiLimiter);

// Logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

// Proxy routes for Airtable API

// GET records from a table
app.get('/api/:table', async (req, res) => {
  try {
    const tableName = req.params.table;
    const queryParams = new URLSearchParams(req.query).toString();
    const url = `${AIRTABLE_API_URL}/${AIRTABLE_BASE_ID}/${tableName}${queryParams ? '?' + queryParams : ''}`;
    
    const response = await axios.get(url, {
      headers: {
        'Authorization': `Bearer ${AIRTABLE_PERSONAL_ACCESS_TOKEN}`,
        'Content-Type': 'application/json'
      }
    });
    
    res.json(response.data);
  } catch (error) {
    handleError(error, res);
  }
});

// GET a specific record
app.get('/api/:table/:id', async (req, res) => {
  try {
    const { table, id } = req.params;
    const url = `${AIRTABLE_API_URL}/${AIRTABLE_BASE_ID}/${table}/${id}`;
    
    const response = await axios.get(url, {
      headers: {
        'Authorization': `Bearer ${AIRTABLE_PERSONAL_ACCESS_TOKEN}`,
        'Content-Type': 'application/json'
      }
    });
    
    res.json(response.data);
  } catch (error) {
    handleError(error, res);
  }
});

// CREATE records
app.post('/api/:table', async (req, res) => {
  try {
    const tableName = req.params.table;
    const url = `${AIRTABLE_API_URL}/${AIRTABLE_BASE_ID}/${tableName}`;
    
    const response = await axios.post(url, req.body, {
      headers: {
        'Authorization': `Bearer ${AIRTABLE_PERSONAL_ACCESS_TOKEN}`,
        'Content-Type': 'application/json'
      }
    });
    
    res.status(201).json(response.data);
  } catch (error) {
    handleError(error, res);
  }
});

// UPDATE records
app.patch('/api/:table', async (req, res) => {
  try {
    const tableName = req.params.table;
    const url = `${AIRTABLE_API_URL}/${AIRTABLE_BASE_ID}/${tableName}`;
    
    const response = await axios.patch(url, req.body, {
      headers: {
        'Authorization': `Bearer ${AIRTABLE_PERSONAL_ACCESS_TOKEN}`,
        'Content-Type': 'application/json'
      }
    });
    
    res.json(response.data);
  } catch (error) {
    handleError(error, res);
  }
});

// DELETE a record
app.delete('/api/:table/:id', async (req, res) => {
  try {
    const { table, id } = req.params;
    const url = `${AIRTABLE_API_URL}/${AIRTABLE_BASE_ID}/${table}/${id}`;
    
    const response = await axios.delete(url, {
      headers: {
        'Authorization': `Bearer ${AIRTABLE_PERSONAL_ACCESS_TOKEN}`,
        'Content-Type': 'application/json'
      }
    });
    
    res.json(response.data);
  } catch (error) {
    handleError(error, res);
  }
});

// Error handling
function handleError(error, res) {
  console.error('API Error:', error.message);
  
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    console.error('Status:', error.response.status);
    console.error('Data:', error.response.data);
    
    res.status(error.response.status).json({
      error: true,
      message: error.response.data?.error?.message || 'An error occurred with the Airtable API',
      details: error.response.data
    });
  } else if (error.request) {
    // The request was made but no response was received
    console.error('No response received from Airtable');
    res.status(500).json({
      error: true,
      message: 'No response received from Airtable API'
    });
  } else {
    // Something happened in setting up the request that triggered an Error
    res.status(500).json({
      error: true,
      message: 'Failed to make request to Airtable API'
    });
  }
}

// Serve the static files for the admin portal
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/portal', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'portal.html'));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Access the admin portal at: http://localhost:${PORT}/portal`);
  console.log(`Access the public page at: http://localhost:${PORT}/`);
});
