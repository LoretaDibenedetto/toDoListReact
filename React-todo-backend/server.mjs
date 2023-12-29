import express from 'express';
import mongoose from 'mongoose';
import todoMessages from "./model/dbTodo.mjs";
import cors from 'cors';

// DATABASE CONNECTION
const connectionDbUrl = "mongodb+srv://admin:RygpIVic9aK55FFs@cluster2.1vis1sg.mongodb.net/MyDb?retryWrites=true&w=majority&ssl=true";
mongoose.connect(connectionDbUrl, { 
  useNewUrlParser: true, 
  useUnifiedTopology: true,
});

const db = mongoose.connection;
const app = express();
const port = process.env.PORT || 3000;


const bodyParser = require('body-parser')    
//Bodyparser Middleware
app.use(bodyParser.json())

const corsOptions = {
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
};
app.use(cors(corsOptions));

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



app.listen(process.env.PORT || 3000, function(){
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});