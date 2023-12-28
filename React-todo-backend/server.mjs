import express from 'express';

const app = express();

const port = process.env.PORT || 3000;

app.get('/api', (req, res) => {
    res.status(200).send('benvenuto sul server');
});


app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});