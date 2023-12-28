import express from 'express';
import mongoose from 'mongoose';
import todoMessages from "./model/dbTodo.mjs";
import cors from 'cors';

//DATABASE CONNECTION
const connectionDbUrl = "mongodb+srv://admin:RygpIVic9aK55FFs@cluster2.1vis1sg.mongodb.net/MyDb?retryWrites=true&w=majority";
mongoose.connect(connectionDbUrl,
     { 
    useNewUrlParser: true, 
    useUnifiedTopology: true ,
   
    })
.then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log("N", err);
  });



const db = mongoose.connection;
const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());

app.use(cors());



//endpoint
app.get('/api', (req, res) => {
    res.status(200).send('benvenuto sul server');
});

app.get('/api/v1/messages/sync',async(req,res)=>{
 
    const data = await todoMessages.find();
        if (data.error) {
            res.status(500).send(data.error);
          } else {
            res.status(201).send(data);
           
          }
    
  
})

app.post("/api/v1/messages",async (req,res) =>{
    const dbTodo = req.body;
   
    const data = await todoMessages.create(dbTodo);

    if (data.error) {
      res.status(500).send(data.error);
    } else {
      res.status(201).send(data);
     
    }
})

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

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});