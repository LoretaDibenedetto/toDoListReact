import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import bodyParser from 'body-parser';
import { configViewEngine } from './config';  // Assumi che configViewEngine sia una funzione nel tuo modulo di configurazione

// DATABASE CONNECTION
const connectionDbUrl = "mongodb+srv://admin:RygpIVic9aK55FFs@cluster2.1vis1sg.mongodb.net/MyDb?retryWrites=true&w=majority&ssl=true";
mongoose.connect(connectionDbUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

const app = express();

//const port = process.env.PORT || 3000;

// Bodyparser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// CORS Middleware
app.use(cors());

configViewEngine(app);

// ENDPOINTS
app.get('/', (req, res) => {
  res.status(200).send('Benvenuto sul server');
});

app.get('/api/v1/messages/sync', async (req, res) => {
  try {
    const data = await todoMessages.find();
    res.status(200).send(data);
  } catch (error) {
    res.status(500).send({ error: 'Internal Server Error' });
  }
});

app.post("/api/v1/messages", async (req, res) => {
  const dbTodo = req.body;
  try {
    const data = await todoMessages.create(dbTodo);
    res.status(201).send(data);
  } catch (error) {
    res.status(500).send({ error: 'Internal Server Error' });
  }
});

// Update endpoint
app.put('/api/v1/messages/:id', async (req, res) => {
  const messageId = req.params.id;
  const updatedMessage = req.body;

  try {
    const result = await todoMessages.findByIdAndUpdate(messageId, updatedMessage, { new: true });

    if (!result) {
      res.status(404).send({ error: 'Message not found' });
    } else {
      res.status(200).send(result);
    }
  } catch (error) {
    res.status(500).send({ error: 'Internal Server Error' });
  }
});

// Delete endpoint
app.delete('/api/v1/messages/:id', async (req, res) => {
  const messageId = req.params.id;
  try {
    const deletedMessage = await todoMessages.findByIdAndDelete(messageId);
    if (!deletedMessage) {
      res.status(404).send({ error: 'Message not found' });
    } else {
      res.status(200).send({ message: 'Message deleted successfully' });
    }
  } catch (error) {
    res.status(500).send({ error: 'Internal Server Error' });
  }
});

const { PORT=3000, LOCAL_ADDRESS='0.0.0.0' } = process.env
server.listen(PORT, LOCAL_ADDRESS, () => {
  const address = server.address();
  console.log('server listening at', address);
});
