const express = require('express');
const termData = require('./db/db.json');
const path = require('path')
const PORT = 3001;

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static('public'));

app.get('/', (req, res) => 
res.sendFile(path.join(__dirname, '/public/index.html')),
);

app.get('/notes', (req, res) => 
res.sendFile(path.join(__dirname, '/public/notes.html')),
);

app.get('/api/notes', (req, res) => {
    res.json(termData.slice(1));
});


app.listen(PORT, () => {
    console.log(`app listening at http://localhost:${PORT}`)
})