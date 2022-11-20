//requirements and port
const express = require('express');
const noteData = require('./db/db.json');
const path = require('path');
const fs = require('fs');
const PORT = 3001;

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static('public'));

//routes user to homepage
app.get('/', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/index.html')),
);
//routes uer to notes page
app.get('/notes', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/notes.html')),
);

//api routes
app.get('/api/notes', (req, res) => {
    res.json(noteData.slice(1));
});

app.post('/api/notes', (req, res) => {
    const newNote = makeNote(req.body, noteData);
    res.json(newNote);
})

//creates notes and ID's and stores them into database
const makeNote = (body, notesArray) => {
    const newNote = body;
    if (!Array.isArray(notesArray))
        notesArray = [];
    if (notesArray.length === 0)
        notesArray.push(0);

    body.id = notesArray.length;
    notesArray[0]++;
    notesArray.push(newNote);

    fs.writeFileSync(
        path.join(__dirname, './db/db.json'),
        JSON.stringify(notesArray, null, 2)
    );
    return newNote;
};
// Function for deleting saved notes
app.delete('/api/notes/:id', (req, res) => {
    deleteNote(req.params.id, noteData);
    res.json(true);
})

const deleteNote = (id, notesArray) => {
for (let i = 0; i < notesArray.length; i++) {
    let note = notesArray[i];
    if (note.id == id) {
        notesArray.splice(i, 1);
        fs.writeFileSync(
            path.join(__dirname, './db/db.json'),
            JSON.stringify(notesArray, null, 2)
        );
        
    }
}
};


app.listen(PORT, () => {
    console.log(`app listening at http://localhost:${PORT}`)
})