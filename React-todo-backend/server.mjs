import express from 'express';
import mongoose from 'mongoose';
import todoMessages from "./model/dbTodo.mjs";

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



//endport
app.get('/api', (req, res) => {
    res.status(200).send('benvenuto sul server');
});


app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});