require('dotenv').config();
const express = require('express');
const cors = require('cors');
const chatController = require('./controllers/chat.controller');

const app = express();

app.use(cors());
app.use(express.json());

// Health Check
app.get('/health', (req, res) => res.status(200).send('API is running'));

// Main Q&A Endpoint
app.post('/api/ask', chatController.handleQuery);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`EduQuery AI Server is live on port ${PORT}`);
});